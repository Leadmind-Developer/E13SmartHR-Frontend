<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";

export default {
  props: {
    filters: Object, // passed from parent (date range, status, etc.)
  },

  setup(props) {
    const rows = ref([]);
    const loading = ref(false);
    const pagination = ref({
      page: 1,
      limit: 10,
      total: 0,
      pages: 1,
    });

    const searchQuery = ref("");

    // -------------------------
    // Fetch Data (Server-side)
    // -------------------------
    const fetchData = async (page = 1) => {
      loading.value = true;

      try {
        const { data } = await api.get("/overtime", {
          params: {
            page,
            limit: pagination.value.limit,
            status: props.filters?.status,
            startDate: props.filters?.startDate,
            endDate: props.filters?.endDate,
            employeeId: props.filters?.employeeId,
            search: searchQuery.value,
          },
        });

        if (data?.success) {
          rows.value = data.data;

          pagination.value = data.pagination;
          pagination.value.page = data.pagination.page;
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    // -------------------------
    // Actions
    // -------------------------
    const approve = async (id) => {
      try {
        await api.patch(`/overtime/${id}/approve`);
        fetchData(pagination.value.page);
      } catch (err) {
        console.error(err);
      }
    };

    const reject = async (id) => {
      try {
        await api.patch(`/overtime/${id}/reject`, {
          reason: "Rejected via UI",
        });
        fetchData(pagination.value.page);
      } catch (err) {
        console.error(err);
      }
    };

    // -------------------------
    // Pagination
    // -------------------------
    const changePage = (page) => {
      if (page < 1 || page > pagination.value.pages) return;
      fetchData(page);
    };

    // -------------------------
    // Helpers
    // -------------------------
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const getStatusClass = (status) => {
      if (status === "Approved") return "badge-success";
      if (status === "Rejected") return "badge-danger";
      return "badge-warning";
    };

    // -------------------------
    // Lifecycle
    // -------------------------
    onMounted(() => {
      fetchData();
    });

    return {
      rows,
      loading,
      pagination,
      searchQuery,
      fetchData,
      changePage,
      approve,
      reject,
      formatDate,
      getStatusClass,
    };
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Top Controls -->
    <div class="row p-3">
      <div class="col-md-6">
        <select v-model="pagination.limit" class="form-select form-select-sm">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          @input="fetchData(1)"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Project</th>
            <th>Status</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">Loading...</td>
          </tr>

          <tr v-for="item in rows" :key="item.id">
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar avatar-sm me-2">
                  <img
                    src="/src/assets/img/users/user-placeholder.jpg"
                    class="rounded-circle"
                  />
                </div>
                <div>
                  <div class="fw-medium">
                    {{ item.employee?.name || "N/A" }}
                  </div>
                  <small class="text-muted">
                    {{ item.employee?.email }}
                  </small>
                </div>
              </div>
            </td>

            <td>{{ formatDate(item.date) }}</td>

            <td>{{ item.overtimeHours }}</td>

            <td>{{ item.project || "-" }}</td>

            <td>
              <span
                class="badge"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </td>

            <td class="text-end">
              <!-- Approve -->
              <button
                v-if="item.status === 'Pending'"
                class="btn btn-sm btn-success me-1"
                @click="approve(item.id)"
              >
                Approve
              </button>

              <!-- Reject -->
              <button
                v-if="item.status === 'Pending'"
                class="btn btn-sm btn-danger me-1"
                @click="reject(item.id)"
              >
                Reject
              </button>

              <!-- View -->
              <button class="btn btn-sm btn-outline-secondary">
                View
              </button>
            </td>
          </tr>

          <tr v-if="!loading && rows.length === 0">
            <td colspan="6" class="text-center">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="row p-3">
      <div class="col-md-6">
        Showing {{ (pagination.page - 1) * pagination.limit + 1 }}
        -
        {{
          Math.min(
            pagination.page * pagination.limit,
            pagination.total
          )
        }}
        of {{ pagination.total }}
      </div>

      <div class="col-md-6 text-end">
        <button
          class="btn btn-sm btn-light me-1"
          :disabled="pagination.page === 1"
          @click="changePage(pagination.page - 1)"
        >
          Prev
        </button>

        <button
          v-for="p in pagination.pages"
          :key="p"
          class="btn btn-sm me-1"
          :class="p === pagination.page ? 'btn-primary' : 'btn-light'"
          @click="changePage(p)"
        >
          {{ p }}
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
</template>
