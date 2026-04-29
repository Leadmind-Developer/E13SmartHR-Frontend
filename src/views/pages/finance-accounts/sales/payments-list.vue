<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import moment from "moment";

export default {
  name: "PaymentsList",

  setup() {
    const loading = ref(false);
    const payments = ref([]);
    const search = ref("");
    const dateRange = ref("");

    const pagination = ref({
      page: 1,
      limit: 10,
      total: 0,
    });

    /**
     * ===============================
     * FETCH PAYMENTS (FROM INVOICES)
     * ===============================
     */
    const fetchPayments = async () => {
      loading.value = true;

      try {
        const { data } = await api.get("/invoices", {
          params: {
            page: pagination.value.page,
            limit: pagination.value.limit,
            search: search.value,
          },
        });

        payments.value = data.data || data;
        pagination.value.total = data.total || payments.value.length;
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        loading.value = false;
      }
    };

    /**
     * ===============================
     * INITIATE PAYMENT (PAYSTACK)
     * ===============================
     */
    const payInvoice = async (invoiceId) => {
      try {
        const { data } = await api.post(`/invoices/${invoiceId}/pay`);

        if (data?.data?.authorization_url) {
          window.open(data.data.authorization_url, "_blank");
        }
      } catch (err) {
        console.error("Payment failed", err);
      }
    };

    /**
     * ===============================
     * EXPORT (PDF / EXCEL HOOK)
     * ===============================
     */
    const exportData = async (type) => {
      try {
        if (type === "pdf") {
          window.open("/api/invoices/export/pdf", "_blank");
        }

        if (type === "excel") {
          window.open("/api/invoices/export/excel", "_blank");
        }
      } catch (err) {
        console.error("Export failed", err);
      }
    };

    /**
     * ===============================
     * DATE FILTER (UI ONLY HOOK)
     * ===============================
     */
    const setDateRange = (range) => {
      dateRange.value = range;
      fetchPayments();
    };

    onMounted(() => {
      fetchPayments();
    });

    return {
      loading,
      payments,
      search,
      pagination,
      dateRange,
      fetchPayments,
      payInvoice,
      exportData,
      setDateRange,
      moment,
    };
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Payments</h4>

        <div class="d-flex gap-2">
          <input
            v-model="search"
            @input="fetchPayments"
            class="form-control"
            placeholder="Search invoice, customer..."
          />

          <button class="btn btn-white" @click="exportData('pdf')">
            Export PDF
          </button>

          <button class="btn btn-white" @click="exportData('excel')">
            Export Excel
          </button>
        </div>
      </div>

      <!-- DATE FILTER -->
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between">
          <div>
            <strong>Date Filter:</strong>
            {{ dateRange || "All Time" }}
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-light" @click="setDateRange('7d')">
              Last 7 Days
            </button>
            <button class="btn btn-sm btn-light" @click="setDateRange('30d')">
              Last 30 Days
            </button>
            <button class="btn btn-sm btn-light" @click="setDateRange('all')">
              All
            </button>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body">

          <div v-if="loading" class="text-center py-5">
            Loading payments...
          </div>

          <table v-else class="table table-hover">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="p in payments" :key="p.id">
                <td>{{ p.invoiceNumber }}</td>
                <td>{{ p.customerName }}</td>
                <td>
                  ₦{{ Number(p.totalAmount).toLocaleString() }}
                </td>

                <td>
                  <span
                    class="badge"
                    :class="{
                      'bg-warning': p.status === 'DRAFT',
                      'bg-primary': p.status === 'SENT',
                      'bg-success': p.status === 'PAID',
                    }"
                  >
                    {{ p.status }}
                  </span>
                </td>

                <td>
                  {{ moment(p.createdAt).format("DD MMM YYYY") }}
                </td>

                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">
                      Actions
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a class="dropdown-item" :href="`/invoices/${p.id}/pdf`" target="_blank">
                          View PDF
                        </a>
                      </li>

                      <li>
                        <a class="dropdown-item" @click="payInvoice(p.id)">
                          Pay Invoice
                        </a>
                      </li>

                      <li>
                        <a class="dropdown-item" :href="`/sales/invoices/edit/${p.id}`">
                          Edit
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

              <tr v-if="payments.length === 0">
                <td colspan="6" class="text-center py-4">
                  No payments found
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
</template>
