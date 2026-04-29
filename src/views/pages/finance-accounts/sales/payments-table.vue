<script>
import api from "@/services/api";

export default {
  name: "PaymentsTable",

  data() {
    return {
      payments: [],
      loading: false,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],
    };
  },

  computed: {
    filteredPayments() {
      if (!this.searchQuery) return this.payments;

      const q = this.searchQuery.toLowerCase();

      return this.payments.filter((p) => {
        return (
          p.invoiceNumber?.toLowerCase().includes(q) ||
          p.customerName?.toLowerCase().includes(q) ||
          p.paymentType?.toLowerCase().includes(q) ||
          p.status?.toLowerCase().includes(q)
        );
      });
    },

    paginatedPayments() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredPayments.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredPayments.length / this.pageSize) || 1;
    },
  },

  mounted() {
    this.fetchPayments();
  },

  methods: {
    /**
     * FETCH FROM BACKEND (REAL SOURCE)
     */
    async fetchPayments() {
      this.loading = true;

      try {
        const { data } = await api.get("/invoices");

        this.payments = (data.data || []).map((inv) => ({
          id: inv.id,
          invoiceNumber: inv.invoiceNumber,
          customerName: inv.customerName,
          companyName: inv.companyName || "—",
          paymentType: inv.paymentType || "—",
          status: inv.status,
          amount: inv.totalAmount,
          date: inv.updatedAt,
        }));

        this.total = this.payments.length;
      } catch (err) {
        console.error("Failed to fetch payments:", err.message);
      } finally {
        this.loading = false;
      }
    },

    /**
     * FORMAT MONEY
     */
    formatAmount(value) {
      if (!value) return "₦0";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(value);
    },

    /**
     * FORMAT DATE
     */
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    /**
     * STATUS CLASS
     */
    statusClass(status) {
      return {
        PAID: "badge bg-success",
        PENDING: "badge bg-warning",
        FAILED: "badge bg-danger",
        DRAFT: "badge bg-secondary",
      }[status] || "badge bg-secondary";
    },

    /**
     * ROW SELECTION
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    /**
     * PAGINATION
     */
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- SEARCH + PAGE SIZE -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label>
          Rows:
          <select v-model="pageSize" class="form-select form-select-sm d-inline-block w-auto">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          type="search"
          class="form-control form-control-sm"
          placeholder="Search invoices, customers..."
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Company</th>
            <th>Payment Type</th>
            <th>Status</th>
            <th>Date</th>
            <th class="text-end">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in paginatedPayments" :key="item.id">
            
            <!-- INVOICE -->
            <td>
              <router-link :to="`/sales/invoice/${item.id}`" class="text-primary">
                {{ item.invoiceNumber }}
              </router-link>
            </td>

            <!-- CUSTOMER -->
            <td>
              <strong>{{ item.customerName }}</strong>
            </td>

            <!-- COMPANY -->
            <td>{{ item.companyName }}</td>

            <!-- PAYMENT TYPE -->
            <td>
              <span class="badge bg-info text-dark">
                {{ item.paymentType }}
              </span>
            </td>

            <!-- STATUS -->
            <td>
              <span :class="statusClass(item.status)">
                {{ item.status }}
              </span>
            </td>

            <!-- DATE -->
            <td>{{ formatDate(item.date) }}</td>

            <!-- AMOUNT -->
            <td class="text-end fw-bold">
              {{ formatAmount(item.amount) }}
            </td>
          </tr>

          <tr v-if="!paginatedPayments.length">
            <td colspan="7" class="text-center py-4 text-muted">
              No payments found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="d-flex justify-content-between align-items-center mt-3">

      <div>
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, filteredPayments.length) }}
        of {{ filteredPayments.length }}
      </div>

      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
            ‹
          </a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
            ›
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>
