<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const invoices = ref([]);
const loading = ref(false);
const error = ref(null);

const search = ref("");
const statusFilter = ref("ALL");

/**
 * FETCH INVOICES
 */
const fetchInvoices = async () => {
  try {
    loading.value = true;
    const { data } = await api.get("/invoices");

    invoices.value = data.data || [];
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

/**
 * FILTERED DATA
 */
const filteredInvoices = computed(() => {
  return invoices.value.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber?.toLowerCase().includes(search.value.toLowerCase()) ||
      inv.customerName?.toLowerCase().includes(search.value.toLowerCase());

    const matchStatus =
      statusFilter.value === "ALL" ||
      inv.status === statusFilter.value;

    return matchSearch && matchStatus;
  });
});

/**
 * STATUS BADGE CLASS
 */
const getStatusClass = (status) => {
  switch (status) {
    case "PAID":
      return "badge bg-success";
    case "SENT":
      return "badge bg-info";
    case "DRAFT":
      return "badge bg-secondary";
    default:
      return "badge bg-light text-dark";
  }
};

/**
 * DOWNLOAD PDF
 */
const downloadPDF = async (id) => {
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
    alert("Failed to download PDF");
  }
};

/**
 * PAY INVOICE (PAYSTACK)
 */
const payInvoice = async (id) => {
  try {
    const { data } = await api.post(`/invoices/${id}/pay`);

    // redirect to Paystack payment page
    window.location.href = data.data.authorization_url;
  } catch (err) {
    alert("Payment initialization failed");
  }
};

onMounted(fetchInvoices);
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Invoices</h2>

        <router-link to="/sales/add-invoices" class="btn btn-primary">
          <i class="ti ti-plus me-2"></i>Add Invoice
        </router-link>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="search"
            type="text"
            class="form-control w-auto"
            placeholder="Search invoice or customer..."
          />

          <select v-model="statusFilter" class="form-select w-auto">
            <option value="ALL">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
          </select>

        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body">

          <!-- LOADING -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border"></div>
          </div>

          <!-- ERROR -->
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- EMPTY -->
          <div v-else-if="filteredInvoices.length === 0" class="text-center py-5">
            <p>No invoices found</p>
          </div>

          <!-- DATA -->
          <div v-else class="table-responsive">
            <table class="table table-hover">

              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="inv in filteredInvoices" :key="inv.id">

                  <td>{{ inv.invoiceNumber }}</td>
                  <td>{{ inv.customerName }}</td>
                  <td>{{ new Date(inv.invoiceDate).toLocaleDateString() }}</td>
                  <td>₦{{ Number(inv.totalAmount).toLocaleString() }}</td>

                  <td>
                    <span :class="getStatusClass(inv.status)">
                      {{ inv.status }}
                    </span>
                  </td>

                  <td class="text-end">

                    <button
                      class="btn btn-sm btn-light me-2"
                      @click="router.push(`/sales/edit-invoices/${inv.id}`)"
                    >
                      Edit
                    </button>

                    <button
                      class="btn btn-sm btn-outline-primary me-2"
                      @click="downloadPDF(inv.id)"
                    >
                      PDF
                    </button>

                    <button
                      v-if="inv.status !== 'PAID'"
                      class="btn btn-sm btn-success"
                      @click="payInvoice(inv.id)"
                    >
                      Pay
                    </button>

                  </td>

                </tr>
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer d-flex justify-content-between p-3">
      <p class="mb-0">
        {{ new Date().getFullYear() }} &copy; E13HR.
      </p>
    </div>

  </div>
</template>
