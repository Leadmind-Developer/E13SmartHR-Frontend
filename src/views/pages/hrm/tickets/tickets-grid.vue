<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <router-link to="/tickets/ticket" class="btn btn-sm btn-white me-2">
            <i class="ti ti-list-tree"></i>
          </router-link>

          <router-link to="/tickets/tickets-grid" class="btn btn-sm btn-primary">
            <i class="ti ti-layout-grid"></i>
          </router-link>

          <button class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#add_ticket">
            <i class="ti ti-plus"></i> New Ticket
          </button>
        </div>
      </div>

      <!-- SUMMARY CARDS -->
      <div class="row mb-4">
        <div class="col-md-3" v-for="card in summaryCards" :key="card.label">
          <div class="card">
            <div class="card-body text-center">
              <h6 class="text-muted">{{ card.label }}</h6>
              <h3>{{ card.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="filters.search"
            @input="debouncedFetch"
            type="text"
            class="form-control w-auto"
            placeholder="Search tickets..."
          />

          <select v-model="filters.status" @change="fetchTickets" class="form-select w-auto">
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="PENDING">Pending</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select v-model="filters.priority" @change="fetchTickets" class="form-select w-auto">
            <option value="">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>

        </div>
      </div>

      <!-- GRID -->
      <div class="row">

        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="col-xl-3 col-lg-4 col-md-6"
        >
          <div class="card">
            <div class="card-body">

              <!-- HEADER -->
              <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-light">{{ ticket.ticketCode }}</span>

                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </button>

                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <router-link
                        :to="`/tickets/tickets-details/${ticket.id}`"
                        class="dropdown-item"
                      >
                        View
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- TITLE -->
              <h6 class="mb-2">
                <router-link :to="`/tickets/tickets-details/${ticket.id}`">
                  {{ ticket.title || 'No Title' }}
                </router-link>
              </h6>

              <!-- DETAILS -->
              <div class="mb-2">
                <small class="text-muted">{{ ticket.category || 'General' }}</small>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-info">{{ ticket.status }}</span>
                <span class="badge bg-danger">{{ ticket.priority }}</span>
              </div>

              <!-- FOOTER -->
              <div class="border-top pt-2 mt-2 d-flex justify-content-between">
                <small class="text-muted">
                  {{ formatDate(ticket.createdAt) }}
                </small>

                <router-link
                  :to="`/tickets/tickets-details/${ticket.id}`"
                  class="text-primary"
                >
                  Open
                </router-link>
              </div>

            </div>
          </div>
        </div>

        <!-- LOADING -->
        <div v-if="loading" class="text-center my-4">
          <span class="spinner-border"></span>
        </div>

        <!-- EMPTY -->
        <div v-if="!loading && tickets.length === 0" class="text-center my-4">
          <p>No tickets found</p>
        </div>

        <!-- LOAD MORE -->
        <div v-if="pagination.page < pagination.pages" class="text-center my-4">
          <button @click="loadMore" class="btn btn-primary">
            Load More
          </button>
        </div>

      </div>

    </div>

    <div class="footer text-center p-3">
      © {{ new Date().getFullYear() }} SmartHR
    </div>
  </div>

  <tickets-modal />
</template>

<script>
import api from "@/services/api";
import debounce from "lodash/debounce";

export default {
  name: "TicketsGrid",

  data() {
    return {
      title: "Tickets",
      text: "Tickets",
      text1: "Grid",

      tickets: [],
      loading: false,

      filters: {
        search: "",
        status: "",
        priority: "",
      },

      pagination: {
        page: 1,
        pages: 1,
      },

      summary: {},
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
    this.debouncedFetch = debounce(this.fetchTickets, 500);
    this.init();
  },

  methods: {
    async init() {
      await Promise.all([this.fetchSummary(), this.fetchTickets()]);
    },

    async fetchSummary() {
      try {
        const { data } = await api.get("/tickets/reports/summary");
        this.summary = data.data;
      } catch (e) {
        console.error("Summary error", e);
      }
    },

    async fetchTickets(reset = true) {
      if (reset) this.pagination.page = 1;

      this.loading = true;

      try {
        const { data } = await api.get("/tickets/reports/tickets", {
          params: {
            page: this.pagination.page,
            search: this.filters.search,
            status: this.filters.status,
            priority: this.filters.priority,
          },
        });

        const newData = data.data || [];

        this.tickets = reset ? newData : [...this.tickets, ...newData];
        this.pagination = data.pagination;
      } catch (e) {
        console.error("Tickets error", e);
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      if (this.pagination.page < this.pagination.pages) {
        this.pagination.page++;
        this.fetchTickets(false);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
