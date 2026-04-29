<script>
import layoutHeader from "@/views/layouts/layout-header.vue";
import api from "@/services/api";

export default {
  components: { layoutHeader },

  data() {
    return {
      loading: true,
      invoice: null,
      error: null,
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },

    formattedDate() {
      return (date) =>
        date ? new Date(date).toLocaleDateString() : "-";
    },

    statusClass() {
      const map = {
        PAID: "badge-success",
        DRAFT: "badge-secondary",
        SENT: "badge-warning",
      };
      return map[this.invoice?.status] || "badge-secondary";
    },
  },

  async mounted() {
    await this.fetchInvoice();
  },

  methods: {
    async fetchInvoice() {
      this.loading = true;
      try {
        const { data } = await api.get(`/invoices/${this.id}`);
        this.invoice = data.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to load invoice";
      } finally {
        this.loading = false;
      }
    },

    async downloadPDF() {
      try {
        const response = await api.get(`/invoices/${this.id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${this.id}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        alert("Failed to download PDF");
      }
    },

    async payInvoice() {
      try {
        const { data } = await api.post(`/invoices/${this.id}/pay`);

        // redirect to Paystack
        window.location.href = data.data.authorization_url;
      } catch (err) {
        alert("Payment initialization failed");
      }
    },

    printInvoice() {
      window.print();
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <h5>Loading invoice...</h5>
      </div>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Invoice -->
      <div v-if="invoice">
        <!-- Header -->
        <div class="d-flex justify-content-between mb-3">
          <router-link to="/sales/invoices" class="btn btn-light">
            ← Back
          </router-link>

          <div class="d-flex gap-2">
            <button class="btn btn-dark" @click="downloadPDF">
              Download PDF
            </button>

            <button
              v-if="invoice.status !== 'PAID'"
              class="btn btn-success"
              @click="payInvoice"
            >
              Pay Now
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">

            <!-- Top -->
            <div class="d-flex justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h4>Invoice</h4>
                <p>#{{ invoice.invoiceNumber }}</p>
              </div>

              <div class="text-end">
                <p>Date: {{ formattedDate(invoice.invoiceDate) }}</p>
                <p>Due: {{ formattedDate(invoice.dueDate) }}</p>
                <span class="badge" :class="statusClass">
                  {{ invoice.status }}
                </span>
              </div>
            </div>

            <!-- Customer -->
            <div class="row mb-4">
              <div class="col-md-6">
                <h6>Customer</h6>
                <p>{{ invoice.customerName }}</p>
              </div>

              <div class="col-md-6 text-end">
                <h6>Payment</h6>
                <p>{{ invoice.paymentType }} - {{ invoice.bankName }}</p>
              </div>
            </div>

            <!-- Items -->
            <div class="table-responsive mb-4">
              <table class="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-end">Qty</th>
                    <th class="text-end">Rate</th>
                    <th class="text-end">Discount</th>
                    <th class="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in invoice.items" :key="item.id">
                    <td>{{ item.description }}</td>
                    <td class="text-end">{{ item.quantity }}</td>
                    <td class="text-end">{{ item.rate }}</td>
                    <td class="text-end">{{ item.discount || 0 }}</td>
                    <td class="text-end">{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totals -->
            <div class="row justify-content-end">
              <div class="col-md-4">
                <div class="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>{{ invoice.subtotal }}</span>
                </div>

                <div class="d-flex justify-content-between">
                  <span>Discount</span>
                  <span>{{ invoice.discountTotal }}</span>
                </div>

                <div class="d-flex justify-content-between fw-bold mt-2">
                  <span>Total</span>
                  <span>{{ invoice.totalAmount }}</span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="mt-4">
              <h6>Description</h6>
              <p>{{ invoice.description || "-" }}</p>

              <h6>Notes</h6>
              <p>{{ invoice.notes || "-" }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="text-center mt-3">
          <button class="btn btn-primary me-2" @click="printInvoice">
            Print
          </button>

          <router-link
            :to="`/sales/edit-invoice/${invoice.id}`"
            class="btn btn-outline-secondary"
          >
            Edit
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
