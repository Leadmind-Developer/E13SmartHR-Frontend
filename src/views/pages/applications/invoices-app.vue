<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">

          <div class="mb-2 me-2">
            <router-link
              to="/applications/add-invoices"
              class="btn btn-primary d-flex align-items-center"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Invoice
            </router-link>
          </div>

          <div class="ms-2 head-icons">
            <a
              href="javascript:void(0);"
              data-bs-toggle="tooltip"
              title="Collapse"
              @click="toggleHeader"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- STATS -->
      <div class="row">
        <div class="col-xl-3 col-sm-6" v-for="card in statsCards" :key="card.label">
          <div class="card flex-fill">
            <div class="card-body">
              <p class="fs-12 mb-1">{{ card.label }}</p>
              <h5>{{ formatCurrency(card.value) }}</h5>

              <div class="progress my-2" style="height: 5px;">
                <div class="progress-bar" :class="card.color" :style="{ width: card.percent + '%' }"></div>
              </div>

              <small :class="card.trend >= 0 ? 'text-success' : 'text-danger'">
                {{ card.trend >= 0 ? '+' : '' }}{{ card.trend }}% from last month
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="row mt-3">
        <div class="col-sm-12">
          <div class="card">

            <!-- Header -->
            <div class="card-header d-flex justify-content-between flex-wrap">

              <h5>
                Invoices
                <span class="badge badge-dark-transparent ms-2">
                  {{ invoices.length }} Total
                </span>
              </h5>

              <div class="d-flex gap-2 flex-wrap">

                <input
                  v-model="search"
                  class="form-control form-control-sm"
                  placeholder="Search invoice..."
                />

                <select v-model="statusFilter" class="form-control form-control-sm">
                  <option value="">All Status</option>
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="DRAFT">Draft</option>
                </select>

              </div>

            </div>

            <!-- Table -->
            <div class="card-body p-0">
              <div class="table-responsive">

                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th>
                        <input type="checkbox" v-model="selectAll" />
                      </th>
                      <th>Invoice</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Due</th>
                      <th>Status</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr v-for="inv in filteredInvoices" :key="inv.id">

                      <td>
                        <input type="checkbox" v-model="selected" :value="inv.id" />
                      </td>

                      <td>
                        <router-link :to="`/applications/invoice-details/${inv.id}`">
                          {{ inv.invoiceNumber }}
                        </router-link>
                      </td>

                      <td>
                        <div>
                          <strong>{{ inv.customerName }}</strong><br />
                          <small>{{ inv.customerEmail }}</small>
                        </div>
                      </td>

                      <td>{{ formatDate(inv.createdAt) }}</td>

                      <td>{{ formatCurrency(inv.totalAmount) }}</td>

                      <td>{{ formatCurrency(inv.amountDue || 0) }}</td>

                      <td>
                        <span class="badge" :class="statusClass(inv.status)">
                          {{ inv.status }}
                        </span>
                      </td>

                      <td class="text-end">

                        <button class="btn btn-sm btn-light me-1" @click="downloadPDF(inv.id)">
                          <i class="ti ti-download"></i>
                        </button>

                        <button class="btn btn-sm btn-success me-1" @click="payInvoice(inv.id)">
                          Pay
                        </button>

                        <router-link
                          :to="`/applications/edit-invoices/${inv.id}`"
                          class="btn btn-sm btn-primary me-1"
                        >
                          <i class="ti ti-edit"></i>
                        </router-link>

                        <button class="btn btn-sm btn-danger" @click="openDelete(inv.id)">
                          <i class="ti ti-trash"></i>
                        </button>

                      </td>

                    </tr>

                    <tr v-if="!loading && filteredInvoices.length === 0">
                      <td colspan="8" class="text-center py-4">
                        No invoices found
                      </td>
                    </tr>

                  </tbody>
                </table>

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

  <!-- Delete Modal -->
  <div class="modal fade" id="delete_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body text-center">
          <i class="ti ti-trash-x fs-36 text-danger mb-3"></i>

          <h4>Delete Invoice?</h4>
          <p>This action cannot be undone.</p>

          <button class="btn btn-light me-2" data-bs-dismiss="modal">
            Cancel
          </button>

          <button class="btn btn-danger" @click="deleteInvoice">
            Delete
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from "@/services/api";

/**
 * STATE
 */
const invoices = ref([]);
const loading = ref(false);

const search = ref("");
const statusFilter = ref("");

const selected = ref([]);
const deleteId = ref(null);

/**
 * HEADER
 */
const title = "Invoices";
const text = "Applications";
const text1 = "Invoices";

/**
 * FETCH INVOICES (BACKEND ALIGNED)
 */
const fetchInvoices = async () => {
  loading.value = true;
  try {
    const res = await api.get("/invoices");
    invoices.value = res.data.data || [];
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
      !statusFilter.value || inv.status === statusFilter.value;

    return matchSearch && matchStatus;
  });
});

/**
 * SELECT ALL
 */
const selectAll = computed({
  get: () => selected.value.length === invoices.value.length,
  set: (val) => {
    selected.value = val ? invoices.value.map((i) => i.id) : [];
  },
});

/**
 * STATS (REAL DATA)
 */
const statsCards = computed(() => {
  const total = invoices.value.reduce((s, i) => s + (i.totalAmount || 0), 0);
  const overdue = invoices.value.filter(i => i.status === "OVERDUE").length;
  const draft = invoices.value.filter(i => i.status === "DRAFT").length;
  const paid = invoices.value.filter(i => i.status === "PAID").length;

  return [
    { label: "Total Invoice", value: total, percent: 85, color: "bg-primary", trend: 12 },
    { label: "Paid", value: paid, percent: 70, color: "bg-success", trend: 8 },
    { label: "Draft", value: draft, percent: 30, color: "bg-warning", trend: -2 },
    { label: "Overdue", value: overdue, percent: 20, color: "bg-danger", trend: -5 },
  ];
});

/**
 * ACTIONS
 */
const openDelete = (id) => {
  deleteId.value = id;
  document.getElementById("delete_modal").classList.add("show");
};

const deleteInvoice = async () => {
  await api.delete(`/invoices/${deleteId.value}`);
  await fetchInvoices();
};

const payInvoice = async (id) => {
  const { data } = await api.post(`/invoices/${id}/pay`);
  window.location.href = data.data.authorization_url;
};

const downloadPDF = async (id) => {
  const res = await api.get(`/invoices/${id}/pdf`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${id}.pdf`;
  a.click();
};

/**
 * HELPERS
 */
const formatCurrency = (val) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(val || 0);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB");

const statusClass = (status) => {
  return {
    PAID: "bg-success",
    OVERDUE: "bg-danger",
    PENDING: "bg-warning",
    DRAFT: "bg-secondary",
  }[status] || "bg-secondary";
};

const toggleHeader = () => {
  document.body.classList.toggle("header-collapse");
};

/**
 * INIT
 */
onMounted(fetchInvoices);
</script>
