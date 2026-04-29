<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <div class="row align-items-center">
        <div class="col-md-10 mx-auto">
          <div class="card">
            <div class="card-body">

              <!-- Header -->
              <div class="d-flex align-items-center justify-content-between mb-4">
                <router-link to="/applications/invoices"
                  class="back-icon align-items-center fs-14 d-inline-flex fw-medium">
                  <span class="d-flex justify-content-center align-items-center rounded-circle me-2">
                    <i class="ti ti-arrow-left fs-12"></i>
                  </span>
                  Back to List
                </router-link>
              </div>

              <!-- ERROR -->
              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>

              <!-- INVOICE DETAILS -->
              <div class="border-bottom mb-3">
                <h4 class="mb-2">Invoice Details</h4>

                <div class="mb-2">
                  <label class="form-label">Invoice Title</label>
                  <input v-model="form.title" type="text" class="form-control" />
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label class="form-label">Invoice No</label>
                    <input v-model="form.invoiceNumber" type="text" class="form-control" />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">Invoice Date</label>
                    <input v-model="form.invoiceDate" type="date" class="form-control" />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">Due Date</label>
                    <input v-model="form.dueDate" type="date" class="form-control" />
                  </div>
                </div>
              </div>

              <!-- PAYMENT DETAILS -->
              <div class="border-bottom mb-3">
                <h4>Payment Details</h4>

                <div class="row">
                  <div class="col-md-3">
                    <label class="form-label">Customer Name</label>
                    <input v-model="form.customerName" class="form-control" />
                  </div>

                  <div class="col-md-3">
                    <label class="form-label">Customer Email</label>
                    <input v-model="form.customerEmail" class="form-control" />
                  </div>

                  <div class="col-md-3">
                    <label class="form-label">Reference</label>
                    <input v-model="form.referenceNumber" class="form-control" />
                  </div>

                  <div class="col-md-3">
                    <label class="form-label">Payment Type</label>
                    <select v-model="form.paymentType" class="form-control">
                      <option value="">Select</option>
                      <option value="CREDIT">Credit</option>
                      <option value="DEBIT">Debit</option>
                      <option value="BANK">Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- ITEMS -->
              <div class="border-bottom mb-3">
                <h4>Add Items</h4>

                <div v-for="(item, index) in form.items" :key="index" class="row mb-3">

                  <div class="col-md-5">
                    <label>Description</label>
                    <input v-model="item.description" class="form-control" />
                  </div>

                  <div class="col-md-2">
                    <label>Qty</label>
                    <input v-model.number="item.quantity" type="number" class="form-control" />
                  </div>

                  <div class="col-md-2">
                    <label>Rate</label>
                    <input v-model.number="item.rate" type="number" class="form-control" />
                  </div>

                  <div class="col-md-2">
                    <label>Discount</label>
                    <input v-model.number="item.discount" type="number" class="form-control" />
                  </div>

                  <div class="col-md-1 d-flex align-items-end">
                    <button class="btn btn-danger btn-sm" @click="removeItem(index)">
                      X
                    </button>
                  </div>

                </div>

                <button class="btn btn-link" @click="addItem">
                  + Add Item
                </button>
              </div>

              <!-- NOTES -->
              <div class="mb-3">
                <label>Notes</label>
                <textarea v-model="form.notes" class="form-control" rows="3"></textarea>
              </div>

              <!-- ACTIONS -->
              <div class="d-flex justify-content-end gap-2">

                <button class="btn btn-dark" :disabled="loading" @click="saveDraft">
                  Save Draft
                </button>

                <button class="btn btn-primary" :disabled="loading" @click="submitInvoice">
                  <span v-if="loading">Processing...</span>
                  <span v-else>Save & Send</span>
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
      <p class="mb-0">{{ new Date().getFullYear() }} &copy; SmartHR.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/services/api";

/**
 * =========================
 * STATE
 * =========================
 */
const loading = ref(false);
const error = ref("");

/**
 * =========================
 * FORM (BACKEND ALIGNED)
 * =========================
 */
const form = reactive({
  title: "",
  invoiceNumber: "",
  invoiceDate: "",
  dueDate: "",
  customerName: "",
  customerEmail: "",
  referenceNumber: "",
  paymentType: "",
  notes: "",
  status: "DRAFT",
  items: [
    {
      description: "",
      quantity: 1,
      rate: 0,
      discount: 0,
    },
  ],
});

/**
 * =========================
 * ITEM HANDLERS
 * =========================
 */
const addItem = () => {
  form.items.push({
    description: "",
    quantity: 1,
    rate: 0,
    discount: 0,
  });
};

const removeItem = (index) => {
  form.items.splice(index, 1);
};

/**
 * =========================
 * PAYLOAD NORMALIZER
 * =========================
 */
const buildPayload = (status) => {
  return {
    title: form.title,
    invoiceNumber: form.invoiceNumber,
    invoiceDate: form.invoiceDate,
    dueDate: form.dueDate,

    customerName: form.customerName,
    customerEmail: form.customerEmail,

    referenceNumber: form.referenceNumber,
    paymentType: form.paymentType,

    notes: form.notes,

    status,

    items: form.items.map((i) => ({
      description: i.description,
      quantity: Number(i.quantity),
      rate: Number(i.rate),
      discount: Number(i.discount || 0),
    })),
  };
};

/**
 * =========================
 * API CALL
 * =========================
 */
const createInvoice = async (status) => {
  loading.value = true;
  error.value = "";

  try {
    const payload = buildPayload(status);

    await api.post("/invoices", payload);

    window.location.href = "/applications/invoices";
  } catch (err) {
    error.value =
      err?.response?.data?.message || "Failed to create invoice";
  } finally {
    loading.value = false;
  }
};

/**
 * =========================
 * ACTIONS
 * =========================
 */
const saveDraft = () => createInvoice("DRAFT");
const submitInvoice = () => createInvoice("SENT");
</script>
