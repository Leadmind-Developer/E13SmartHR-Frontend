<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Referrals",
      text: "Recruitment",
      text1: "Referrals",

      loading: false,
      error: null,

      referrals: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },

      searchQuery: "",
      statusFilter: "",

      columns: [
        {
          title: "Referral ID",
          dataIndex: "referralCode",
          key: "referralCode",
        },
        {
          title: "Referrer",
          dataIndex: "referrer",
          key: "referrer",
        },
        {
          title: "Referee",
          dataIndex: "refereeName",
          key: "refereeName",
        },
        {
          title: "Job",
          dataIndex: "jobTitle",
          key: "jobTitle",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Bonus",
          dataIndex: "bonusAmount",
          key: "bonusAmount",
        },
        {
          title: "Action",
          key: "action",
          sorter: false,
        },
      ],

      rowSelection: {
        onChange: () => {},
      },
    };
  },

  mounted() {
    this.fetchReferrals();
  },

  watch: {
    "pagination.page"() {
      this.fetchReferrals();
    },
    statusFilter() {
      this.pagination.page = 1;
      this.fetchReferrals();
    },
    searchQuery() {
      this.debounceSearch();
    },
  },

  methods: {
    // =========================
    // API CALL
    // =========================
    async fetchReferrals() {
      this.loading = true;
      this.error = null;

      try {
        const { page, limit } = this.pagination;

        const res = await api.get("/referrals", {
          params: {
            page,
            limit,
            status: this.statusFilter || undefined,
            search: this.searchQuery || undefined,
          },
        });

        const payload = res.data?.data;

        this.referrals = payload?.data || [];
        this.pagination.total = payload?.total || 0;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to load referrals";
      } finally {
        this.loading = false;
      }
    },

    // =========================
    // STATUS UPDATE
    // =========================
    async updateStatus(id, status) {
      try {
        await api.patch(`/referrals/${id}/status`, { status });
        await this.fetchReferrals();
      } catch (err) {
        alert(err?.response?.data?.message || "Update failed");
      }
    },

    // =========================
    // DELETE
    // =========================
    async deleteReferral(id) {
      if (!confirm("Delete this referral?")) return;

      try {
        await api.delete(`/referrals/${id}`);
        await this.fetchReferrals();
      } catch (err) {
        alert("Delete failed");
      }
    },

    // =========================
    // UI HELPERS
    // =========================
    toggleHeader() {
      document
        .getElementById("collapse-header")
        .classList.toggle("active");

      document.body.classList.toggle("header-collapse");
    },

    formatCurrency(value) {
      return `$${Number(value || 0).toFixed(2)}`;
    },

    changePage(page) {
      this.pagination.page = page;
    },

    // simple debounce
    debounceSearch: (() => {
      let t;
      return function () {
        clearTimeout(t);
        t = setTimeout(() => {
          this.fetchReferrals();
        }, 400);
      };
    })(),
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

          <!-- Status Filter -->
          <div class="dropdown me-3">
            <a class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Status
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-2">
              <li><a class="dropdown-item" @click="statusFilter = ''">All</a></li>
              <li><a class="dropdown-item" @click="statusFilter = 'PENDING'">Pending</a></li>
              <li><a class="dropdown-item" @click="statusFilter = 'HIRED'">Hired</a></li>
              <li><a class="dropdown-item" @click="statusFilter = 'REJECTED'">Rejected</a></li>
            </ul>
          </div>

          <div class="head-icons ms-2">
            <a id="collapse-header" @click="toggleHeader">
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- CARD -->
      <div class="card">

        <div class="card-header d-flex justify-content-between">
          <h5>Referrals List</h5>

          <input
            v-model="searchQuery"
            type="search"
            class="form-control form-control-sm w-25"
            placeholder="Search referrals..."
          />
        </div>

        <!-- LOADING -->
        <div v-if="loading" class="p-4 text-center">
          Loading referrals...
        </div>

        <!-- ERROR -->
        <div v-if="error" class="p-4 text-danger text-center">
          {{ error }}
        </div>

        <!-- TABLE -->
        <div v-if="!loading && !error" class="card-body p-0">
          <div class="table-responsive">

            <a-table
              :columns="columns"
              :data-source="referrals"
              :pagination="false"
              :row-selection="rowSelection"
            >

              <template #bodyCell="{ column, record }">

                <!-- REFERRER -->
                <template v-if="column.key === 'referrer'">
                  {{ record.referrer?.email || 'N/A' }}
                </template>

                <!-- STATUS -->
                <template v-if="column.key === 'status'">
                  <span class="badge bg-light text-dark">
                    {{ record.status }}
                  </span>
                </template>

                <!-- BONUS -->
                <template v-if="column.key === 'bonusAmount'">
                  {{ formatCurrency(record.bonusAmount) }}
                </template>

                <!-- ACTION -->
                <template v-if="column.key === 'action'">
                  <div class="d-flex gap-2">

                    <select
                      class="form-select form-select-sm"
                      @change="updateStatus(record.id, $event.target.value)"
                    >
                      <option disabled selected>Update</option>
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="HIRED">Hired</option>
                      <option value="REJECTED">Rejected</option>
                    </select>

                    <button
                      class="btn btn-sm btn-danger"
                      @click="deleteReferral(record.id)"
                    >
                      <i class="ti ti-trash"></i>
                    </button>

                  </div>
                </template>

              </template>

            </a-table>

          </div>

          <!-- PAGINATION -->
          <div class="d-flex justify-content-between p-3">

            <div>
              Total: {{ pagination.total }}
            </div>

            <div class="d-flex gap-2">
              <button
                class="btn btn-light btn-sm"
                :disabled="pagination.page === 1"
                @click="changePage(pagination.page - 1)"
              >
                Prev
              </button>

              <button
                class="btn btn-light btn-sm"
                @click="changePage(pagination.page + 1)"
                :disabled="referrals.length < pagination.limit"
              >
                Next
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>

    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} © SmartHR.</p>
      <p>Designed & Developed By <a class="text-primary">Dreams</a></p>
    </div>

  </div>
</template>
