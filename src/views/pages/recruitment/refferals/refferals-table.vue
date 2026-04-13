<script>
import api from "@/services/api";

export default {
  name: "ReferralsTable",

  data() {
    return {
      referrals: [],
      loading: false,
      error: null,

      searchQuery: "",
      statusFilter: "",

      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],
    };
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.fetchReferrals();
    },
    statusFilter() {
      this.currentPage = 1;
      this.fetchReferrals();
    },
    currentPage() {
      this.fetchReferrals();
    },
    pageSize() {
      this.currentPage = 1;
      this.fetchReferrals();
    },
  },

  mounted() {
    this.fetchReferrals();
  },

  methods: {
    async fetchReferrals() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/referrals", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            status: this.statusFilter || undefined,
            search: this.searchQuery || undefined,
          },
        });

        const payload = res.data?.data;

        this.referrals = payload?.data || [];
        this.total = payload?.total || 0;
        this.currentPage = payload?.page || 1;
        this.pageSize = payload?.limit || 10;
      } catch (err) {
        this.error = err?.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    onPageChange(page) {
      this.currentPage = page;
    },

    onPageSizeChange(e) {
      this.pageSize = Number(e.target.value);
    },

    getUserImage(img) {
      return img
        ? new URL(`/src/assets/img/users/${img}`, import.meta.url).href
        : "/default-user.png";
    },

    getJobIcon(img) {
      return img
        ? new URL(`/src/assets/img/icons/${img}`, import.meta.url).href
        : "/default-job.svg";
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Filters -->
    <div class="row mb-2">
      <div class="col-md-6">
        <select class="form-select form-select-sm" v-model="pageSize">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search referrals..."
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4">
      Loading referrals...
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Table -->
    <div class="table-responsive" v-if="!loading">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Referrer</th>
            <th>Job</th>
            <th>Referee</th>
            <th>Bonus</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in referrals" :key="item.id">
            <td>{{ item.referralCode }}</td>

            <!-- Referrer -->
            <td>
              <div class="d-flex align-items-center">
                <img
                  :src="getUserImage(item.referrer?.avatar)"
                  class="rounded-circle me-2"
                  width="35"
                />
                <div>
                  <div>{{ item.referrer?.email }}</div>
                  <small class="text-muted">Referrer</small>
                </div>
              </div>
            </td>

            <!-- Job -->
            <td>
              {{ item.jobTitle }}
            </td>

            <!-- Referee -->
            <td>
              <div>
                <div>{{ item.refereeName }}</div>
                <small class="text-muted">{{ item.refereeEmail }}</small>
              </div>
            </td>

            <!-- Bonus -->
            <td>
              ${{ item.bonusAmount }}
            </td>

            <!-- Status -->
            <td>
              <span class="badge bg-warning" v-if="item.status === 'PENDING'">
                Pending
              </span>
              <span class="badge bg-success" v-else-if="item.status === 'APPROVED'">
                Approved
              </span>
              <span class="badge bg-danger" v-else>
                {{ item.status }}
              </span>
            </td>
          </tr>

          <tr v-if="referrals.length === 0">
            <td colspan="6" class="text-center">
              No referrals found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Showing {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, total) }} of {{ total }}
      </div>

      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="onPageChange(currentPage - 1)">
            Prev
          </a>
        </li>

        <li
          v-for="p in Math.ceil(total / pageSize)"
          :key="p"
          class="page-item"
          :class="{ active: p === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="onPageChange(p)">
            {{ p }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage >= total / pageSize }">
          <a class="page-link" href="#" @click.prevent="onPageChange(currentPage + 1)">
            Next
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
