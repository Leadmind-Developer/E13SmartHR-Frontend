<script>
import api from "@/services/api";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      ticket: null,
      loading: false,
      showReply: false,
      newComment: "",
      visibility: "PUBLIC",
      socket: null,
      updating: false,

      users: [],

      priorityOptions: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      statusOptions: ["OPEN", "PENDING", "CLOSED"],
      visibilityOptions: ["PUBLIC", "PRIVATE"],
    };
  },

  async created() {
    await this.fetchTicket();
    this.initSocket();
    this.fetchUsers();
  },

  beforeUnmount() {
    if (this.socket) this.socket.disconnect();
  },

  methods: {
    /*
    |--------------------------------------------------------------------------
    | FETCH
    |--------------------------------------------------------------------------
    */
    async fetchTicket() {
      this.loading = true;
      try {
        const { data } = await api.get(`/tickets/${this.$route.params.id}`);
        this.ticket = data.data;
      } finally {
        this.loading = false;
      }
    },

    async fetchUsers() {
      const { data } = await api.get("/users"); // assume exists
      this.users = data.data.map((u) => ({
        label: u.name,
        value: u.id,
      }));
    },

    /*
    |--------------------------------------------------------------------------
    | SOCKET (REAL-TIME)
    |--------------------------------------------------------------------------
    */
    initSocket() {
      this.socket = io("https://api.e13solution.com", {
        auth: {
          token: localStorage.getItem("accessToken"),
        },
      });

      const ticketId = this.$route.params.id;

      this.socket.emit("join-ticket", ticketId);

      this.socket.on("new-comment", (comment) => {
        if (comment.ticketId === this.ticket.id) {
          this.ticket.TicketComments.push(comment);
        }
      });

      this.socket.on("ticket-updated", (update) => {
        if (update.id === this.ticket.id) {
          this.ticket = { ...this.ticket, ...update };
        }
      });
    },

    /*
    |--------------------------------------------------------------------------
    | COMMENT (Optimistic + Real-time)
    |--------------------------------------------------------------------------
    */
    async submitComment() {
      if (!this.newComment) return;

      const tempComment = {
        id: Date.now(),
        message: this.newComment,
        User: { name: "You" },
        createdAt: new Date(),
      };

      // optimistic UI
      this.ticket.TicketComments.push(tempComment);

      const message = this.newComment;
      this.newComment = "";
      this.showReply = false;

      try {
        const { data } = await api.post(
          `/tickets/${this.ticket.id}/comments`,
          { message }
        );

        // replace temp with real
        const index = this.ticket.TicketComments.findIndex(
          (c) => c.id === tempComment.id
        );

        if (index !== -1) {
          this.ticket.TicketComments[index] = data.data;
        }

        // emit socket
        this.socket.emit("new-comment", data.data);

      } catch (err) {
        console.error(err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | UPDATE (Debounced + Optimistic)
    |--------------------------------------------------------------------------
    */
    async updateTicket(payload) {
      if (this.updating) return;

      this.updating = true;

      const prev = { ...this.ticket };

      // optimistic update
      this.ticket = { ...this.ticket, ...payload };

      try {
        await api.patch(`/tickets/${this.ticket.id}`, payload);

        this.socket.emit("ticket-update", {
          id: this.ticket.id,
          ...payload,
        });

      } catch (err) {
        console.error(err);
        this.ticket = prev; // rollback
      } finally {
        setTimeout(() => (this.updating = false), 500);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>
