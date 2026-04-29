<script>
import api from "@/services/api";

export default {
  data() {
    return {
      taxes: [],
      loading: false,
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,

      // form state (for modal integration later)
      form: {
        id: null,
        name: "",
        rate: "",
        status: "ACTIVE",
      },
    };
  },

  computed: {
    filteredTaxes() {
      const q = this.searchQuery.toLowerCase();

      return this.taxes.filter((t) => {
        return (
          t.name?.toLowerCase().includes(q) ||
          String(t.rate).toLowerCase().includes(q) ||
          t.status?.toLowerCase().includes(q)
        );
      });
    },

    paginatedTaxes() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTaxes.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredTaxes.length / this.pageSize) || 1;
    },
  },

  methods: {
    async fetchTaxes() {
      this.loading = true;

      try {
        const { data } = await api.get("/taxes");

        this.taxes = data.data || [];
      } catch (err) {
        console.error("Failed to fetch taxes", err);
      } finally {
        this.loading = false;
      }
    },

    async createTax() {
      try {
        await api.post("/taxes", this.form);
        await this.fetchTaxes();
        this.resetForm();
      } catch (err) {
        console.error("Create tax failed", err);
      }
    },

    async updateTax() {
      try {
        await api.put(`/taxes/${this.form.id}`, this.form);
        await this.fetchTaxes();
        this.resetForm();
      } catch (err) {
        console.error("Update tax failed", err);
      }
    },

    async deleteTax(id) {
      if (!confirm("Delete this tax?")) return;

      try {
        await api.delete(`/taxes/${id}`);
        await this.fetchTaxes();
      } catch (err) {
        console.error("Delete tax failed", err);
      }
    },

    async toggleStatus(tax) {
      try {
        await api.patch(`/taxes/${tax.id}/status`, {
          status: tax.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        });

        await this.fetchTaxes();
      } catch (err) {
        console.error("Status update failed", err);
      }
    },

    editTax(tax) {
      this.form = { ...tax };
    },

    resetForm() {
      this.form = {
        id: null,
        name: "",
        rate: "",
        status: "ACTIVE",
      };
    },
  },

  mounted() {
    this.fetchTaxes();
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- Controls -->
    <div class="row mb-2">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="col-md-6">
        <input
          v-model="searchQuery"
          class="form-control form-control-sm"
          placeholder="Search taxes..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="paginatedTaxes"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">

          <!-- NAME -->
          <template v-if="column.dataIndex === 'name'">
            <div class="d-flex align-items-center">
              <strong class="me-2">{{ record.name }}</strong>
            </div>
          </template>

          <!-- RATE -->
          <template v-if="column.dataIndex === 'rate'">
            {{ record.rate }}%
          </template>

          <!-- STATUS -->
          <template v-if="column.key === 'status'">
            <button
              class="btn btn-sm"
              :class="record.status === 'ACTIVE' ? 'btn-success' : 'btn-secondary'"
              @click="toggleStatus(record)"
            >
              {{ record.status }}
            </button>
          </template>

          <!-- ACTIONS -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a @click="editTax(record)" class="me-2">
                <i class="ti ti-edit"></i>
              </a>

              <a @click="deleteTax(record.id)">
                <i class="ti ti-trash"></i>
              </a>
            </div>
          </template>

        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between mt-3">
      <div>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, filteredTaxes.length) }}
        of {{ filteredTaxes.length }}
      </div>

      <div>
        <button
          class="btn btn-sm btn-light"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <button
          class="btn btn-sm btn-light ms-1"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script>
// table columns
export const columns = [
  {
    title: "Tax Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
  },
];
</script>
