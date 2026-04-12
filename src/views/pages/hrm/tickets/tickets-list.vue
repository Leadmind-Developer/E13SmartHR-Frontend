<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb title="Tickets" text="HRM" text1="Tickets" />

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <input
            v-model="filters.search"
            @input="debouncedFetch"
            type="text"
            class="form-control form-control-sm"
            placeholder="Search tickets..."
          />

          <select v-model="filters.status" @change="fetchTickets" class="form-select form-select-sm">
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="PENDING">Pending</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select v-model="filters.priority" @change="fetchTickets" class="form-select form-select-sm">
            <option value="">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>

          <button class="btn btn-primary btn-sm" @click="fetchTickets">
            Refresh
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="row mb-3">
        <div class="col-md-3" v-for="card in summaryCards" :key="card.label">
          <div class="card text-center">
            <div class="card-body">
              <h6>{{ card.label }}</h6>
              <h3>{{ card.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Tickets -->
      <div class="card">
        <div class="card-body">

          <div v-if="loading" class="text-center py-4">
            Loading tickets...
          </div>

          <div v-else>
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class="border-bottom py-3"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="mb-1">
                    <router-link :to="`/tickets/${ticket.id}`">
                      {{ ticket.title || ticket.description }}
                    </router-link>
                  </h5>

                  <div class="small text-muted">
                    {{ ticket.ticketCode }} • {{ formatDate(ticket.createdAt) }}
                  </div>

                  <div class="mt-2">
                    <span class="badge bg-info me-2">
                      {{ ticket.status }}
                    </span>

                    <span class="badge bg-danger me-2">
                      {{ ticket.priority }}
                    </span>

                    <span class="text-muted">
                      Assigned: {{ ticket.assignedTo || "Unassigned" }}
                    </span>
                  </div>
                </div>

                <div class="text-end">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="goToDetails(ticket.id)"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="tickets.length === 0" class="text-center py-4">
              No tickets found
            </div>
          </div>

        </div>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
          Page {{ pagination.page }} of {{ pagination.pages }}
        </div>

        <div class="d-flex gap-2">
          <button
            class="btn btn-sm btn-outline-secondary"
            :disabled="pagination.page === 1"
            @click="changePage(pagination.page - 1)"
          >
            Prev
          </button>

          <button
            class="btn btn-sm btn-outline-secondary"
            :disabled="pagination.page === pagination.pages"
            @click="changePage(pagination.page + 1)"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      loading: false,

      tickets: [],
      pagination: {
        page: 1,
        pages: 1,
      },

      summary: {},

      filters: {
        search: "",
        status: "",
        priority: "",
        page: 1,
        limit: 10,
      },
    };
  },

  computed: {
    summaryCards() {
      return [
        { label: "Total", value: this.summary.total || 0 },
        { label: "Open", value: this.summary.open || 0 },
        { label: "Pending", value: this.summary.pending || 0 },
        { label: "Resolved", value: this.summary.resolved || 0 },
      ];
    },
  },

  created() {
    this.fetchAll();
    this.debouncedFetch = debounce(this.fetchTickets, 500);
  },

  methods: {
    async fetchAll() {
      await Promise.all([
        this.fetchTickets(),
        this.fetchSummary(),
      ]);
    },

    async fetchTickets() {
      this.loading = true;

      try {
        const { data } = await api.get("/tickets/reports/tickets", {
          params: this.filters,
        });

        this.tickets = data.data || [];
        this.pagination = data.pagination || {};
      } catch (e) {
        console.error("Error fetching tickets", e);
      } finally {
        this.loading = false;
      }
    },

    async fetchSummary() {
      try {
        const { data } = await api.get("/tickets/reports/summary");

        this.summary = data.data || {};
      } catch (e) {
        console.error("Error fetching summary", e);
      }
    },

    changePage(page) {
      this.filters.page = page;
      this.fetchTickets();
    },

    goToDetails(id) {
      this.$router.push(`/tickets/${id}`);
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>
