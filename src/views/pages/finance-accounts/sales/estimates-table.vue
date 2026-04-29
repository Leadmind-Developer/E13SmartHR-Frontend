<script>
import api from "@/services/api";

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
      const q = this.searchQuery.toLowerCase();

      return this.invoices.filter((inv) => {
        return (
          inv.customerName?.toLowerCase().includes(q) ||
          inv.invoiceNumber?.toLowerCase().includes(q) ||
          inv.status?.toLowerCase().includes(q)
        );
      });
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredData.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize) || 1;
    },

    columns() {
      return [
        { title: "Invoice No", dataIndex: "invoiceNumber" },
        { title: "Customer", dataIndex: "customerName" },
        { title: "Invoice Date", dataIndex: "invoiceDate" },
        { title: "Due Date", dataIndex: "dueDate" },
        { title: "Amount", dataIndex: "totalAmount" },
        { title: "Status", key: "status" },
        { title: "Action", key: "action" },
      ];
    },
  },

  mounted() {
    this.fetchInvoices();
  },

  methods: {
    async fetchInvoices() {
      try {
        this.loading = true;

        const { data } = await api.get("/invoices");

        this.invoices = data.data || [];
        this.total = this.invoices.length;
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      } finally {
        this.loading = false;
      }
    },

    formatCurrency(val) {
      if (!val) return "₦0";
      return `₦${Number(val).toLocaleString()}`;
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    getStatusClass(status) {
      switch (status) {
        case "PAID":
          return "badge-soft-success";
        case "SENT":
          return "badge-soft-purple";
        case "DRAFT":
          return "badge-soft-warning";
        default:
          return "badge-soft-secondary";
      }
    },

    async downloadPDF(id) {
      try {
        const response = await api.get(`/invoices/${id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error("PDF download failed", err);
      }
    },

    async payInvoice(id) {
      try {
        const { data } = await api.post(`/invoices/${id}/pay`);

        // redirect to Paystack
        window.location.href = data.data.authorization_url;
      } catch (err) {
        console.error("Payment init failed", err);
      }
    },

    goToEdit(id) {
      this.$router.push(`/sales/invoices/edit/${id}`);
    },

    goToView(id) {
      this.$router.push(`/sales/invoices/${id}`);
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- Filters -->
    <div class="row mb-3 px-3">
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
          type="text"
          class="form-control form-control-sm w-50 d-inline-block"
          placeholder="Search invoices..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="paginatedData"
        :loading="loading"
        rowKey="id"
        class="table"
      >
        <template #bodyCell="{ column, record }">
          <!-- Customer -->
          <template v-if="column.dataIndex === 'customerName'">
            <strong>{{ record.customerName }}</strong>
          </template>

          <!-- Dates -->
          <template v-if="column.dataIndex === 'invoiceDate'">
            {{ formatDate(record.invoiceDate) }}
          </template>

          <template v-if="column.dataIndex === 'dueDate'">
            {{ formatDate(record.dueDate) }}
          </template>

          <!-- Amount -->
          <template v-if="column.dataIndex === 'totalAmount'">
            {{ formatCurrency(record.totalAmount) }}
          </template>

          <!-- Status -->
          <template v-if="column.key === 'status'">
            <span class="badge" :class="getStatusClass(record.status)">
              {{ record.status }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-light"
                @click="goToView(record.id)"
              >
                View
              </button>

              <button
                class="btn btn-sm btn-light"
                @click="goToEdit(record.id)"
              >
                Edit
              </button>

              <button
                class="btn btn-sm btn-light"
                @click="downloadPDF(record.id)"
              >
                PDF
              </button>

              <button
                v-if="record.status !== 'PAID'"
                class="btn btn-sm btn-primary"
                @click="payInvoice(record.id)"
              >
                Pay
              </button>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center p-3">
      <span>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, filteredData.length) }}
        of {{ filteredData.length }}
      </span>

      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">
            ‹
          </a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage = page">
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage++">
            ›
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
