<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex justify-content-between mb-3">
        <h6 class="fw-medium">
          <router-link to="/tickets/ticket">
            <i class="ti ti-arrow-left me-2"></i>Ticket Details
          </router-link>
        </h6>

        <button class="btn btn-primary" @click="showReply = true">
          <i class="ti ti-arrow-forward-up me-1"></i>Post Reply
        </button>
      </div>

      <div v-if="loading" class="text-center py-5">
        <span class="spinner-border"></span>
      </div>

      <div v-else-if="ticket" class="row">

        <!-- LEFT -->
        <div class="col-xl-9 col-md-8">
          <div class="card">

            <!-- HEADER -->
            <div class="card-header d-flex justify-content-between">
              <div>
                <h5 class="text-info">{{ ticket.category }}</h5>
                <span class="badge bg-danger">{{ ticket.priority }}</span>
              </div>

              <vue3-select
                :options="visibilityOptions"
                v-model="visibility"
                @update:modelValue="updateTicket({ isPrivate: visibility === 'PRIVATE' })"
              />
            </div>

            <!-- BODY -->
            <div class="card-body">

              <!-- MAIN -->
              <div class="border-bottom mb-3 pb-3">
                <span class="badge bg-info">{{ ticket.ticketCode }}</span>

                <h5 class="mt-2">{{ ticket.title }}</h5>

                <span class="badge bg-outline-primary">
                  {{ ticket.status }}
                </span>

                <p class="mt-3">{{ ticket.description }}</p>
              </div>

              <!-- COMMENTS -->
              <div v-for="c in ticket.TicketComments" :key="c.id" class="mb-4 border-bottom pb-3">

                <div class="d-flex align-items-center mb-2">
                  <div class="fw-semibold me-2">
                    {{ c.User?.name || "User" }}
                  </div>
                  <small class="text-muted">
                    {{ formatDate(c.createdAt) }}
                  </small>
                </div>

                <p>{{ c.message }}</p>

              </div>

            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-xl-3 col-md-4">
          <div class="card">

            <div class="card-header">
              <h4>Ticket Details</h4>
            </div>

            <div class="card-body">

              <!-- PRIORITY -->
              <div class="mb-3">
                <label>Priority</label>
                <vue3-select
                  :options="priorityOptions"
                  v-model="ticket.priority"
                  @update:modelValue="updateTicket({ priority: ticket.priority })"
                />
              </div>

              <!-- STATUS -->
              <div class="mb-3">
                <label>Status</label>
                <vue3-select
                  :options="statusOptions"
                  v-model="ticket.status"
                  @update:modelValue="updateTicket({ status: ticket.status })"
                />
              </div>

              <!-- ASSIGNEE -->
              <div class="mb-3">
                <label>Assign To</label>
                <vue3-select
                  :options="users"
                  v-model="ticket.assignedTo"
                  @update:modelValue="updateTicket({ assignedTo: ticket.assignedTo })"
                />
              </div>

              <hr />

              <p><strong>User:</strong> {{ ticket.requesterName }}</p>
              <p><strong>Email:</strong> {{ ticket.email }}</p>
              <p><strong>Updated:</strong> {{ formatDate(ticket.updatedAt) }}</p>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- REPLY MODAL -->
  <div v-if="showReply" class="modal fade show d-block">
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <h5>Add Comment</h5>

        <textarea v-model="newComment" class="form-control mb-3" />

        <button class="btn btn-primary" @click="submitComment">
          Submit
        </button>

        <button class="btn btn-light ms-2" @click="showReply = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      ticket: null,
      loading: false,
      showReply: false,
      newComment: "",
      visibility: "PUBLIC",

      users: [],

      priorityOptions: [
        { label: "LOW", value: "LOW" },
        { label: "MEDIUM", value: "MEDIUM" },
        { label: "HIGH", value: "HIGH" },
        { label: "CRITICAL", value: "CRITICAL" },
      ],

      statusOptions: [
        { label: "OPEN", value: "OPEN" },
        { label: "PENDING", value: "PENDING" },
        { label: "CLOSED", value: "CLOSED" },
      ],

      visibilityOptions: [
        { label: "Public", value: "PUBLIC" },
        { label: "Private", value: "PRIVATE" },
      ],
    };
  },

  async created() {
    await this.fetchTicket();
  },

  methods: {
    async fetchTicket() {
      this.loading = true;
      try {
        const id = this.$route.params.id;

        const { data } = await api.get(`/tickets/${id}`);
        this.ticket = data.data;

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async submitComment() {
      if (!this.newComment) return;

      try {
        await api.post(`/tickets/${this.ticket.id}/comments`, {
          message: this.newComment,
        });

        this.newComment = "";
        this.showReply = false;

        await this.fetchTicket();

      } catch (err) {
        console.error(err);
      }
    },

    async updateTicket(payload) {
      try {
        await api.patch(`/tickets/${this.ticket.id}`, payload);
      } catch (err) {
        console.error(err);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>
