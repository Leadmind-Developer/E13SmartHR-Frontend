<script>
import api from "@/services/api";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      loading: false,
      invoices: [],
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },

  computed: {
    filteredData() {
      if (!this.searchQuery) return this.invoices;

      const q = this.searchQuery.toLowerCase();

      return this.invoices.filter((inv) =>
        [
          inv.invoiceNumber,
          inv.customerName,
          inv.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    },
  },

  mounted() {
    this.fetchInvoices();
  },

  methods: {
    /**
     * FETCH FROM BACKEND
     */
    async fetchInvoices() {
      try {
        this.loading = true;

        const { data } = await api.get("/invoices");

        this.invoices = data.data || [];
        this.total = this.invoices.length;
      } catch (err) {
        message.error("Failed to load invoices");
      } finally {
        this.loading = false;
      }
    },

    /**
     * FORMAT DATE
     */
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    /**
     * FORMAT MONEY
     */
    formatCurrency(amount) {
      return `₦${Number(amount || 0).toLocaleString()}`;
    },

    /**
     * STATUS CLASS
     */
    getStatusClass(status) {
      return {
        "badge-soft-secondary": status === "DRAFT",
        "badge-soft-purple": status === "SENT",
        "badge-soft-success": status === "PAID",
        "badge-soft-warning": status === "OVERDUE",
      };
    },

    /**
     * DOWNLOAD PDF
     */
    async downloadPDF(id) {
      try {
        const response = await api.get(`/invoices/${id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        message.error("Failed to generate PDF");
      }
    },

    /**
     * PAY WITH PAYSTACK
     */
    async payInvoice(id) {
      try {
        const { data } = await api.post(`/invoices/${id}/pay`);

        window.location.href = data.data.authorization_url;
      } catch (err) {
        message.error("Payment initialization failed");
      }
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- HEADER -->
    <div class="row mb-3">
      <div class="col-md-6">
        <select v-model="pageSize" class="form-select form-select-sm w-auto">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm w-auto d-inline"
          placeholder="Search invoices..."
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="thead-light">
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Due</th>
            <th>Amount</th>
            <th>Status</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="text-center py-4">Loading...</td>
          </tr>

          <tr v-for="inv in filteredData" :key="inv.id">
            <!-- Invoice -->
            <td>
              <router-link
                :to="`/sales/invoice-details/${inv.id}`"
                class="text-primary fw-medium"
              >
                {{ inv.invoiceNumber }}
              </router-link>
            </td>

            <!-- Customer -->
            <td>{{ inv.customerName }}</td>

            <!-- Dates -->
            <td>{{ formatDate(inv.invoiceDate) }}</td>
            <td>{{ formatDate(inv.dueDate) }}</td>

            <!-- Amount -->
            <td>{{ formatCurrency(inv.totalAmount) }}</td>

            <!-- Status -->
            <td>
              <span class="badge" :class="getStatusClass(inv.status)">
                {{ inv.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="text-end">
              <div class="d-inline-flex gap-2">
                <router-link
                  :to="`/sales/edit-invoices/${inv.id}`"
                  class="text-info"
                >
                  <i class="ti ti-edit"></i>
                </router-link>

                <a href="#" @click.prevent="downloadPDF(inv.id)">
                  <i class="ti ti-file-download"></i>
                </a>

                <a
                  v-if="inv.status !== 'PAID'"
                  href="#"
                  @click.prevent="payInvoice(inv.id)"
                >
                  <i class="ti ti-credit-card"></i>
                </a>
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredData.length === 0">
            <td colspan="7" class="text-center py-4">
              No invoices found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
