<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center gap-2">

          <select v-model="filters.status" class="form-select form-select-sm">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="published">Published</option>
          </select>

          <select v-model="filters.type" class="form-select form-select-sm">
            <option value="">All Types</option>
            <option value="company">Company</option>
            <option value="public">Public</option>
          </select>

          <button class="btn btn-primary btn-sm" @click="openCreateModal">
            <i class="ti ti-circle-plus me-1"></i>
            Add Holiday
          </button>

          <button class="btn btn-light btn-sm" @click="fetchHolidays">
            Refresh
          </button>

        </div>
      </div>

      <!-- Table Card -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Holidays</h5>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="p-4 text-center">
          Loading holidays...
        </div>

        <!-- Error -->
        <div v-if="error" class="alert alert-danger m-3">
          {{ error }}
        </div>

        <!-- Table -->
        <div v-if="!loading">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th width="220">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="h in holidays" :key="h.id">
                  <td>{{ h.title }}</td>
                  <td>{{ formatDate(h.date) }}</td>
                  <td>{{ h.type }}</td>

                  <td>
                    <span class="badge"
                      :class="statusClass(h.status)">
                      {{ h.status }}
                    </span>
                  </td>

                  <td class="d-flex gap-1">

                    <button
                      v-if="h.status === 'draft'"
                      class="btn btn-sm btn-outline-success"
                      @click="approveHoliday(h.id)"
                    >
                      Approve
                    </button>

                    <button
                      v-if="h.status === 'approved'"
                      class="btn btn-sm btn-outline-primary"
                      @click="publishHoliday(h.id)"
                    >
                      Publish
                    </button>

                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteHoliday(h.id)"
                    >
                      Delete
                    </button>

                  </td>
                </tr>

                <tr v-if="holidays.length === 0">
                  <td colspan="5" class="text-center py-4">
                    No holidays found
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center p-3">
            <small>
              Page {{ meta.page }} of {{ meta.pages }}
            </small>

            <div class="btn-group">
              <button class="btn btn-sm btn-light"
                      :disabled="meta.page === 1"
                      @click="changePage(meta.page - 1)">
                Prev
              </button>

              <button class="btn btn-sm btn-light"
                      :disabled="meta.page === meta.pages"
                      @click="changePage(meta.page + 1)">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="footer d-sm-flex justify-content-between border-top bg-white p-3">
      <p class="mb-0">
        {{ new Date().getFullYear() }} © SmartHR
      </p>
    </div>
  </div>

  <holidays-modal @saved="fetchHolidays" />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import api from "@/services/api";
import moment from "moment";

export default {
  setup() {

    const title = "Holidays";
    const text = "HRM";
    const text1 = "Holidays";

    const holidays = ref([]);
    const loading = ref(false);
    const error = ref("");

    const meta = reactive({
      page: 1,
      pages: 1,
      total: 0
    });

    const filters = reactive({
      status: "",
      type: ""
    });

    const fetchHolidays = async (page = 1) => {
      loading.value = true;
      error.value = "";

      try {
        const { data } = await api.get("/holiday", {
          params: {
            page,
            limit: 10,
            status: filters.status || undefined,
            type: filters.type || undefined
          }
        });

        holidays.value = data.data;
        meta.page = data.meta.page;
        meta.pages = data.meta.pages;
        meta.total = data.meta.total;

      } catch (err) {
        error.value =
          err?.response?.data?.message || "Failed to load holidays";
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page) => {
      fetchHolidays(page);
    };

    const approveHoliday = async (id) => {
      await api.patch(`/holiday/${id}/approve`);
      await fetchHolidays(meta.page);
    };

    const publishHoliday = async (id) => {
      await api.patch(`/holiday/${id}/publish`);
      await fetchHolidays(meta.page);
    };

    const deleteHoliday = async (id) => {
      if (!confirm("Delete this holiday?")) return;

      await api.delete(`/holiday/${id}`);
      await fetchHolidays(meta.page);
    };

    const formatDate = (date) => moment(date).format("DD MMM YYYY");

    const statusClass = (status) => {
      return {
        "bg-secondary": status === "draft",
        "bg-success": status === "approved",
        "bg-primary": status === "published",
      };
    };

    const openCreateModal = () => {
      const modal = document.getElementById("add_holiday");
      if (modal) modal.classList.add("show");
    };

    onMounted(() => {
      fetchHolidays();
    });

    return {
      title,
      text,
      text1,
      holidays,
      loading,
      error,
      meta,
      filters,
      fetchHolidays,
      changePage,
      approveHoliday,
      publishHoliday,
      deleteHoliday,
      formatDate,
      statusClass,
      openCreateModal
    };
  }
};
</script>
