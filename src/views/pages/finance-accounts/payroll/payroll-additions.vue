<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center flex-wrap">
          <button class="btn btn-primary d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_payroll">
            <i class="ti ti-circle-plus me-2"></i>
            Add Addition
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="d-flex flex-wrap gy-2 justify-content-between my-3">
        <div class="payroll-btns">
          <router-link to="/payroll/payroll-additions" class="btn btn-white border me-2 active">
            Additions
          </router-link>
          <router-link to="/payroll/payroll-overtime" class="btn btn-white border me-2">
            Overtime
          </router-link>
          <router-link to="/payroll/payroll-deduction" class="btn btn-white border">
            Deductions
          </router-link>
        </div>
      </div>

      <!-- Card -->
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Payroll Additions</h5>

          <button class="btn btn-outline-secondary btn-sm" @click="fetchItems">
            Refresh
          </button>
        </div>

        <div class="card-body">

          <!-- Loading -->
          <div v-if="loading" class="text-center py-4">
            <span class="spinner-border"></span>
          </div>

          <!-- Table -->
          <div v-else class="table-responsive">
            <a-table
              :columns="columns"
              :data-source="filteredData"
              :pagination="false"
              rowKey="id"
            >

              <template #bodyCell="{ column, record }">

                <!-- Name -->
                <template v-if="column.key === 'name'">
                  <strong>{{ record.name }}</strong>
                </template>

                <!-- Category -->
                <template v-if="column.key === 'category'">
                  <span class="badge bg-light text-dark">
                    {{ record.category || 'Addition' }}
                  </span>
                </template>

                <!-- Amount -->
                <template v-if="column.key === 'amount'">
                  ₦ {{ formatCurrency(record.unitAmount) }}
                </template>

                <!-- Action -->
                <template v-if="column.key === 'action'">
                  <button class="btn btn-sm btn-danger" @click="deleteItem(record.id)">
                    <i class="ti ti-trash"></i>
                  </button>
                </template>

              </template>

            </a-table>
          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- ADD MODAL -->
  <div class="modal fade" id="add_payroll">
    <div class="modal-dialog modal-md">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Add Payroll Addition</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">

          <form @submit.prevent="createItem">

            <div class="mb-3">
              <label>Name</label>
              <input v-model="form.name" class="form-control" required />
            </div>

            <div class="mb-3">
              <label>Type</label>
              <select v-model="form.type" class="form-control">
                <option value="ADDITION">Addition</option>
              </select>
            </div>

            <div class="mb-3">
              <label>Category</label>
              <input v-model="form.category" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Unit Amount</label>
              <input v-model.number="form.unitAmount" type="number" class="form-control" required />
            </div>

            <button class="btn btn-primary w-100" :disabled="submitting">
              {{ submitting ? 'Saving...' : 'Create Addition' }}
            </button>

          </form>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Payroll Items",
      text: "Payroll",
      text1: "Additions",

      items: [],
      loading: false,
      submitting: false,

      form: {
        name: "",
        type: "ADDITION",
        category: "",
        unitAmount: 0,
      },

      columns: [
        { title: "Name", key: "name" },
        { title: "Category", key: "category" },
        { title: "Amount", key: "amount" },
        { title: "Action", key: "action" },
      ],
    };
  },

  computed: {
    filteredData() {
      return this.items.filter(i => i.type === "ADDITION");
    }
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    // -----------------------------
    // FETCH FROM BACKEND
    // -----------------------------
    async fetchItems() {
      this.loading = true;

      try {
        const res = await api.get("/payroll/items");
        this.items = res.data?.data || [];
      } catch (err) {
        console.error(err);
        this.$toast?.error("Failed to load payroll items");
      } finally {
        this.loading = false;
      }
    },

    // -----------------------------
    // CREATE ITEM (BACKEND INTEGRATION)
    // -----------------------------
    async createItem() {
      this.submitting = true;

      try {
        await api.post("/payroll/items", this.form);

        this.$toast?.success("Payroll addition created");

        this.form = {
          name: "",
          type: "ADDITION",
          category: "",
          unitAmount: 0,
        };

        await this.fetchItems();

        const modal = document.getElementById("add_payroll");
        window.bootstrap?.Modal.getInstance(modal)?.hide();

      } catch (err) {
        console.error(err);
        this.$toast?.error("Failed to create item");
      } finally {
        this.submitting = false;
      }
    },

    // -----------------------------
    // DELETE ITEM
    // -----------------------------
    async deleteItem(id) {
      if (!confirm("Delete this payroll item?")) return;

      try {
        await api.delete(`/payroll/items/${id}`);
        this.$toast?.success("Deleted successfully");
        await this.fetchItems();
      } catch (err) {
        console.error(err);
        this.$toast?.error("Delete failed");
      }
    },

    // -----------------------------
    // FORMAT CURRENCY
    // -----------------------------
    formatCurrency(value) {
      return Number(value || 0).toLocaleString();
    },
  },
};
</script>
