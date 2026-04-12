<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-md-flex justify-content-between align-items-center mb-3">
        <h4>Ticket Reports</h4>
      </div>

      <!-- SUMMARY CARDS -->
      <div class="row">
        <div class="col-md-2" v-for="card in summaryCards" :key="card.label">
          <div class="card p-3">
            <small>{{ card.label }}</small>
            <h4>{{ card.value }}</h4>
          </div>
        </div>
      </div>

      <!-- HEATMAP -->
      <div class="card mt-3">
        <div class="card-header">
          <h5>Priority Distribution</h5>
        </div>
        <div class="card-body">
          <apexchart
            type="bar"
            height="250"
            :options="heatmapOptions"
            :series="heatmapSeries"
          />
        </div>
      </div>

      <!-- TABLE -->
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between">
          <input
            v-model="search"
            @input="debouncedFetch"
            class="form-control w-25"
            placeholder="Search tickets..."
          />

          <select v-model="limit" @change="fetchTickets" class="form-select w-auto">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div class="card-body p-0">
          <a-table
            :columns="columns"
            :data-source="tickets"
            :pagination="false"
            rowKey="id"
          />

          <!-- PAGINATION -->
          <div class="p-3 d-flex justify-content-between">
            <span>
              Page {{ pagination.page }} of {{ pagination.pages }}
            </span>

            <div>
              <button
                class="btn btn-sm btn-light me-2"
                :disabled="pagination.page === 1"
                @click="changePage(pagination.page - 1)"
              >
                Prev
              </button>

              <button
                class="btn btn-sm btn-light"
                :disabled="pagination.page === pagination.pages"
                @click="changePage(pagination.page + 1)"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { debounce } from "lodash";

export default {
  data() {
    return {
      loading: false,

      // DATA
      summary: {},
      heatmap: [],
      tickets: [],

      // QUERY
      search: "",
      page: 1,
      limit: 10,

      pagination: {
        total: 0,
        pages: 1,
        page: 1,
      },

      columns: [
        { title: "Code", dataIndex: "ticketCode" },
        { title: "Description", dataIndex: "description" },
        { title: "Priority", dataIndex: "priority" },
        { title: "Status", dataIndex: "status" },
        { title: "Created", dataIndex: "createdAt" },
      ],
    };
  },

  computed: {
    summaryCards() {
      return [
        { label: "Total", value: this.summary.total || 0 },
        { label: "Open", value: this.summary.open || 0 },
        { label: "Pending", value: this.summary.pending || 0 },
        { label: "Resolved", value: this.summary.resolved || 0 },
        { label: "SLA Breached", value: this.summary.slaBreached || 0 },
        { label: "Escalated", value: this.summary.escalated || 0 },
      ];
    },

    heatmapSeries() {
      return [
        {
          name: "Tickets",
          data: this.heatmap.map((i) => i.count),
        },
      ];
    },

    heatmapOptions() {
      return {
        xaxis: {
          categories: this.heatmap.map((i) => i.priority),
        },
      };
    },
  },

  created() {
    this.fetchAll();
  },

  methods: {
    async fetchAll() {
      await Promise.all([
        this.fetchSummary(),
        this.fetchHeatmap(),
        this.fetchTickets(),
      ]);
    },

    async fetchSummary() {
      const { data } = await api.get("/tickets/reports/summary");
      this.summary = data.data;
    },

    async fetchHeatmap() {
      const { data } = await api.get("/tickets/reports/heatmap");
      this.heatmap = data.data;
    },

    async fetchTickets() {
      this.loading = true;

      const { data } = await api.get("/tickets/reports/tickets", {
        params: {
          search: this.search,
          page: this.page,
          limit: this.limit,
        },
      });

      this.tickets = data.data;
      this.pagination = data.pagination;

      this.loading = false;
    },

    changePage(page) {
      this.page = page;
      this.fetchTickets();
    },

    debouncedFetch: debounce(function () {
      this.page = 1;
      this.fetchTickets();
    }, 500),
  },
};
</script>
