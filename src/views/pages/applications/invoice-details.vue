<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <span class="spinner-border"></span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Invoice -->
      <div v-else-if="invoice">
        <div class="row">
          <div class="col-sm-10 mx-auto">

            <!-- Back -->
            <router-link to="/applications/invoices"
              class="back-icon d-flex align-items-center fs-12 fw-medium mb-3 d-inline-flex">
              <span class="d-flex justify-content-center align-items-center rounded-circle me-2">
                <i class="ti ti-arrow-left"></i>
              </span>
              Back to List
            </router-link>

            <div class="card">
              <div class="card-body">

                <!-- Header -->
                <div class="row justify-content-between align-items-center border-bottom mb-3">
                  <div class="col-md-6">
                    <img src="@/assets/img/logo.jpeg" class="img-fluid logo" alt="logo" />
                    <p class="mt-2">{{ invoice.tenantAddress || "N/A" }}</p>
                  </div>

                  <div class="col-md-6 text-end">
                    <h5>
                      Invoice No:
                      <span class="text-primary">#{{ invoice.invoiceNumber }}</span>
                    </h5>
                    <p>Created: {{ formatDate(invoice.createdAt) }}</p>
                  </div>
                </div>

                <!-- Parties -->
                <div class="row border-bottom mb-3">
                  <div class="col-md-6">
                    <h6>From</h6>
                    <p class="mb-1">{{ invoice.createdByName || "Company" }}</p>
                  </div>

                  <div class="col-md-6">
                    <h6>To</h6>
                    <p class="mb-1">{{ invoice.customerName || "N/A" }}</p>
                    <p class="mb-1">{{ invoice.customerEmail }}</p>
                  </div>
                </div>

                <!-- Status -->
                <div class="mb-3">
                  <span class="badge"
                    :class="invoice.status === 'PAID' ? 'badge-success' : 'badge-danger'">
                    {{ invoice.status }}
                  </span>
                </div>

                <!-- Items -->
                <div class="table-responsive mb-3">
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
                        <td class="text-end">{{ formatMoney(item.rate) }}</td>
                        <td class="text-end">{{ formatMoney(item.discount || 0) }}</td>
                        <td class="text-end">
                          {{ formatMoney(item.total || (item.quantity * item.rate)) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Summary -->
                <div class="row border-bottom mb-3">
                  <div class="col-md-6">
                    <h6>Notes</h6>
                    <p>Please reference invoice number for payment.</p>
                  </div>

                  <div class="col-md-6 text-end">
                    <p>Subtotal: {{ formatMoney(invoice.subtotal) }}</p>
                    <p>Discount: {{ formatMoney(invoice.discountTotal) }}</p>
                    <h5>Total: {{ formatMoney(invoice.totalAmount) }}</h5>
                  </div>
                </div>

                <!-- Actions -->
                <div class="d-flex justify-content-center gap-2 mt-4">
                  <button class="btn btn-primary" @click="downloadPdf">
                    <i class="ti ti-download me-1"></i> Download PDF
                  </button>

                  <button class="btn btn-success" @click="payInvoice"
                    v-if="invoice.status !== 'PAID'">
                    Pay Invoice
                  </button>

                  <button class="btn btn-white border" @click="cloneInvoice">
                    Clone
                  </button>

                  <button class="btn btn-dark" @click="printInvoice">
                    Print
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex justify-content-between bg-white border-top p-3">
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Invoice Details",
      text: "Applications",
      text1: "Invoice",
      invoice: null,
      loading: false,
      error: null,
    };
  },

  async created() {
    await this.fetchInvoice();
  },

  methods: {
    /**
     * FETCH INVOICE
     */
    async fetchInvoice() {
      this.loading = true;
      this.error = null;

      try {
        const id = this.$route.params.id;

        const res = await api.get(`/invoices/${id}`);

        this.invoice = res.data.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Failed to load invoice";
      } finally {
        this.loading = false;
      }
    },

    /**
     * DOWNLOAD PDF
     */
    async downloadPdf() {
      try {
        const id = this.$route.params.id;

        const res = await api.get(`/invoices/${id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        alert("Failed to download PDF");
      }
    },

    /**
     * PAY INVOICE (PAYSTACK)
     */
    async payInvoice() {
      try {
        const id = this.$route.params.id;

        const res = await api.post(`/invoices/${id}/pay`);

        if (res.data?.data?.authorization_url) {
          window.location.href = res.data.data.authorization_url;
        }
      } catch (err) {
        alert("Payment initialization failed");
      }
    },

    /**
     * CLONE (RECURRING INVOICE)
     */
    async cloneInvoice() {
      try {
        const id = this.$route.params.id;

        await api.post(`/invoices/${id}/recurring`, {
          interval: "monthly",
        });

        alert("Invoice cloned successfully");
      } catch (err) {
        alert("Failed to clone invoice");
      }
    },

    /**
     * PRINT
     */
    printInvoice() {
      window.print();
    },

    /**
     * FORMATTERS
     */
    formatMoney(value) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(value || 0);
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
