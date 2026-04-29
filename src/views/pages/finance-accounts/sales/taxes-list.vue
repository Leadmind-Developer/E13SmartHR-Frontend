<script>
import { ref, onMounted } from "vue";
import moment from "moment";
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Taxes",
      text: "Sales",
      text1: "Taxes",

      taxes: [],
      loading: false,

      search: "",
      selectedTaxType: "",
      sortBy: "latest",

      dateRange: {
        start: null,
        end: null,
      },
    };
  },

  computed: {
    filteredTaxes() {
      let data = [...this.taxes];

      // search filter
      if (this.search) {
        const q = this.search.toLowerCase();
        data = data.filter(
          (t) =>
            t.name?.toLowerCase().includes(q) ||
            String(t.rate).includes(q) ||
            t.status?.toLowerCase().includes(q)
        );
      }

      // tax type filter
      if (this.selectedTaxType) {
        data = data.filter((t) => t.name === this.selectedTaxType);
      }

      // date filter (createdAt assumed)
      if (this.dateRange.start && this.dateRange.end) {
        data = data.filter((t) => {
          const created = moment(t.createdAt);
          return (
            created.isSameOrAfter(this.dateRange.start) &&
            created.isSameOrBefore(this.dateRange.end)
          );
        });
      }

      // sorting
      if (this.sortBy === "ascending") {
        data.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (this.sortBy === "descending") {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (this.sortBy === "latest") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return data;
    },
  },

  methods: {
    toggleHeader() {
      const el = document.getElementById("collapse-header");
      if (el) el.classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    async fetchTaxes() {
      this.loading = true;

      try {
        const { data } = await api.get("/taxes");

        this.taxes = data.data || [];
      } catch (err) {
        console.error("Failed to load taxes:", err);
      } finally {
        this.loading = false;
      }
    },

    setSort(value) {
      this.sortBy = value;
    },

    setTaxType(type) {
      this.selectedTaxType = type;
    },

    setDateRange(start, end) {
      this.dateRange.start = start;
      this.dateRange.end = end;
    },
  },

  mounted() {
    this.fetchTaxes();
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">

          <div class="me-2 mb-2">
            <div class="dropdown">
              <a class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-file-export me-1"></i> Export
              </a>

              <ul class="dropdown-menu dropdown-menu-end p-2">
                <li><a class="dropdown-item">Export PDF</a></li>
                <li><a class="dropdown-item">Export Excel</a></li>
              </ul>
            </div>
          </div>

          <div class="mb-2">
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_tax">
              <i class="ti ti-circle-plus me-2"></i> Add Tax
            </a>
          </div>

        </div>
      </div>

      <!-- Card -->
      <div class="card">

        <!-- Filters -->
        <div class="card-header d-flex justify-content-between flex-wrap gap-2">

          <h5 class="mb-0">Tax List</h5>

          <div class="d-flex flex-wrap gap-2">

            <!-- search -->
            <input
              v-model="search"
              class="form-control form-control-sm"
              placeholder="Search taxes..."
            />

            <!-- tax filter -->
            <select
              class="form-select form-select-sm"
              v-model="selectedTaxType"
            >
              <option value="">All Taxes</option>
              <option v-for="t in taxes" :key="t.id" :value="t.name">
                {{ t.name }}
              </option>
            </select>

            <!-- sort -->
            <select
              class="form-select form-select-sm"
              v-model="sortBy"
            >
              <option value="latest">Latest</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>

          </div>
        </div>

        <!-- Table -->
        <taxes-table
          :data="filteredTaxes"
          :loading="loading"
        />

      </div>

    </div>

    <!-- footer -->
    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} © SmartHR.
      </p>
      <p>
        Designed & Developed By
        <a class="text-primary">Dreams</a>
      </p>
    </div>

  </div>

  <taxes-modal />
</template>
