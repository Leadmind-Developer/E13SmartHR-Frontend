<script>
import api from "@/services/api";

export default {
  name: "TrainingTypeTable",

  data() {
    return {
      loading: false,
      trainings: [],
      total: 0,

      // table state
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      // debounce
      searchTimeout: null,
    };
  },

  computed: {
    columns() {
      return [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Type",
          key: "type",
          customRender: ({ record }) => record?.TrainingType?.name || "-",
        },
        {
          title: "Trainer",
          key: "trainer",
          customRender: ({ record }) => record?.Trainer?.name || "-",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Created",
          key: "createdAt",
          customRender: ({ record }) =>
            new Date(record.createdAt).toLocaleDateString(),
        },
        {
          title: "",
          key: "action",
        },
      ];
    },

    totalPages() {
      return Math.ceil(this.total / this.pageSize) || 1;
    },
  },

  watch: {
    currentPage() {
      this.fetchTrainings();
    },
    pageSize() {
      this.currentPage = 1;
      this.fetchTrainings();
    },
    searchQuery() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchTrainings();
      }, 500);
    },
  },

  mounted() {
    this.fetchTrainings();
  },

  methods: {
    async fetchTrainings() {
      this.loading = true;

      try {
        const { data } = await api.get("/trainings", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            search: this.searchQuery,
          },
        });

        this.trainings = data?.data?.rows || [];
        this.total = data?.data?.count || 0;
      } catch (error) {
        console.error("Failed to fetch trainings", error);
      } finally {
        this.loading = false;
      }
    },

    handleDelete(record) {
      this.$emit("delete", record);
    },

    handleEdit(record) {
      this.$emit("edit", record);
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- Top Controls -->
    <div class="row mb-2">
      <div class="col-md-6">
        <label class="d-flex align-items-center">
          <span class="me-2">Rows</span>
          <select v-model="pageSize" class="form-select form-select-sm w-auto">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm w-auto d-inline-block"
          placeholder="Search trainings..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="trainings"
        :loading="loading"
        row-key="id"
        :pagination="false"
        class="table datatable thead-light"
      >
        <template #bodyCell="{ column, record }">
          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span
              class="badge d-inline-flex align-items-center badge-xs"
              :class="
                record.status === 'ACTIVE'
                  ? 'badge-success'
                  : 'badge-secondary'
              "
            >
              <i class="ti ti-point-filled me-1"></i>
              {{ record.status || "N/A" }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a
                href="javascript:void(0);"
                class="me-2"
                @click="handleEdit(record)"
              >
                <i class="ti ti-edit"></i>
              </a>

              <a href="javascript:void(0);" @click="handleDelete(record)">
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="row mt-3">
      <div class="col-md-5">
        <div>
          Showing
          {{ (currentPage - 1) * pageSize + 1 }}
          -
          {{ Math.min(currentPage * pageSize, total) }}
          of {{ total }}
        </div>
      </div>

      <div class="col-md-7 text-end">
        <ul class="pagination justify-content-end">
          <!-- Prev -->
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage--"
            >
              <i class="ti ti-chevron-left"></i>
            </a>
          </li>

          <!-- Pages -->
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a
              href="#"
              class="page-link"
              @click.prevent="currentPage = page"
            >
              {{ page }}
            </a>
          </li>

          <!-- Next -->
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage++"
            >
              <i class="ti ti-chevron-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
