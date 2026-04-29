<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";

/**
 * STATE
 /
const invoices = ref([]);
const loading = ref(false);
const error = ref(null);

const filters = ref({
  status: "",
  search: "",
  sort: "desc",
});

/*
 * FETCH DATA
 /
const fetchInvoices = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data } = await api.get("/invoices");
    invoices.value = data.data || [];
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load invoices";
  } finally {
    loading.value = false;
  }
};

/*
 * FILTERED DATA
 /
const filteredInvoices = computed(() => {
  let data = [...invoices.value];

  if (filters.value.status) {
    data = data.filter((i) => i.status === filters.value.status);
  }

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    data = data.filter(
      (i) =>
        i.invoiceNumber?.toLowerCase().includes(q) ||
        i.customerName?.toLowerCase().includes(q)
    );
  }

  data.sort((a, b) => {
    return filters.value.sort === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  return data;
});

/*
 * ACTIONS
 /
const downloadPDF = (id) => {
  window.open(${api.defaults.baseURL}/invoices/${id}/pdf, "_blank");
};

const payInvoice = async (id) => {
  try {
    const { data } = await api.post(/invoices/${id}/pay);
    window.location.href = data.data.authorization_url;
  } catch (err) {
    alert("Payment failed");
  }
};

/*
 * INIT
 */
onMounted(fetchInvoices);
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Invoices</h4>

        <router-link
          to="/sales/add-invoice"
          class="btn btn-primary"
        >
          + Create Invoice
        </router-link>
      </div>

      <!-- FILTERS -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-2">

          <input
            v-model="filters.search"
            class="form-control w-auto"
            placeholder="Search invoice / customer"
          />

          <select v-model="filters.status" class="form-select w-auto">
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
          </select>

          <select v-model="filters.sort" class="form-select w-auto">
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

        </div>
      </div>

      <!-- STATES -->
      <div v-if="loading" class="text-center p-4">
        <span class="spinner-border"></span>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- TABLE -->
      <div v-else class="card">
        <div class="card-body table-responsive">

          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="filteredInvoices.length === 0">
                <td colspan="6" class="text-center">
                  No invoices found
                </td>
              </tr>

              <tr v-for="inv in filteredInvoices" :key="inv.id">
                <td>{{ inv.invoiceNumber }}</td>
                <td>{{ inv.customerName }}</td>
                <td>₦{{ Number(inv.totalAmount).toLocaleString() }}</td>

                <td>
                  <span
                    class="badge"
                    :class="{
                      'bg-secondary': inv.status === 'DRAFT',
                      'bg-warning': inv.status === 'SENT',
                      'bg-success': inv.status === 'PAID',
                    }"
                  >
                    {{ inv.status }}
                  </span>
                </td>

                <td>{{ new Date(inv.createdAt).toLocaleDateString() }}</td>

                <td class="text-end">

                  <button
                    class="btn btn-sm btn-light me-1"
                    @click="downloadPDF(inv.id)"
                  >
                    PDF
                  </button>

                  <button
                    v-if="inv.status !== 'PAID'"
                    class="btn btn-sm btn-primary me-1"
                    @click="payInvoice(inv.id)"
                  >
                    Pay
                  </button>

                  <router-link
                    :to="`/sales/invoices/${inv.id}`"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    View
                  </router-link>

                </td>
              </tr>
            </tbody>

          </table>

        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer d-flex justify-content-between p-3 bg-white border-top">
      <p class="mb-0">
        {{ new Date().getFullYear() }} © SmartHR
      </p>
    </div>
  </div>
</template>
