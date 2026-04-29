<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
/
const route = useRoute();
const router = useRouter();
const invoiceId = route.params.id;

/
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
/
const loading = ref(false);
const saving = ref(false);
const error = ref(null);

/
|--------------------------------------------------------------------------
| Form (ALIGNED WITH BACKEND)
|--------------------------------------------------------------------------
/
const form = reactive({
  title: "",
  invoiceNumber: "",
  invoiceDate: "",
  dueDate: "",
  customerName: "",
  referenceNumber: "",
  paymentType: "CREDIT",
  bankName: "",
  description: "",
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

/
|--------------------------------------------------------------------------
| Computed Totals
|--------------------------------------------------------------------------
/
const subtotal = computed(() =>
  form.items.reduce(
    (sum, i) => sum + i.quantity * i.rate,
    0
  )
);

const discountTotal = computed(() =>
  form.items.reduce((sum, i) => sum + (i.discount || 0), 0)
);

const totalAmount = computed(() => subtotal.value - discountTotal.value);

/
|--------------------------------------------------------------------------
| Fetch Invoice
|--------------------------------------------------------------------------
/
const fetchInvoice = async () => {
  try {
    loading.value = true;

    const { data } = await api.get(/invoices/${invoiceId});

    Object.assign(form, data.data);
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

/
|--------------------------------------------------------------------------
| Items
|--------------------------------------------------------------------------
/
const addItem = () => {
  form.items.push({
    description: "",
    quantity: 1,
    rate: 0,
    discount: 0,
  });
};

const removeItem = (index) => {
  if (form.items.length === 1) return;
  form.items.splice(index, 1);
};

/
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
/
const submit = async (status = "DRAFT") => {
  try {
    saving.value = true;

    const payload = {
      ...form,
      status,
      invoiceDate: new Date(form.invoiceDate),
      dueDate: new Date(form.dueDate),
    };

    await api.put(/invoices/${invoiceId}, payload);

    router.push("/sales/invoices");
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    saving.value = false;
  }
};

/
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
/
const saveDraft = () => submit("DRAFT");
const saveAndSend = () => submit("SENT");

const downloadPDF = async () => {
  const res = await api.get(/invoices/${invoiceId}/pdf, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = invoice-${invoiceId}.pdf;
  link.click();
};

const initiatePayment = async () => {
  const { data } = await api.post(/invoices/${invoiceId}/pay);
  window.location.href = data.data.authorization_url;
};

/
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
*/
onMounted(() => {
  fetchInvoice();
});
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <div class="col-md-10 mx-auto">

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-if="loading" class="text-center py-5">Loading...</div>

        <div v-else class="card">
          <div class="card-body">

            <!-- Header -->
            <div class="d-flex justify-content-between mb-4">
              <router-link to="/sales/invoices">← Back</router-link>
              <button class="btn btn-outline-primary" @click="downloadPDF">
                Download PDF
              </button>
            </div>

            <!-- Invoice Details -->
            <h5>Invoice Details</h5>

            <input v-model="form.title" class="form-control mb-2" placeholder="Title" />
            <input v-model="form.invoiceNumber" class="form-control mb-2" placeholder="Invoice No" />

            <div class="row">
              <div class="col-md-6">
                <input type="date" v-model="form.invoiceDate" class="form-control mb-2" />
              </div>
              <div class="col-md-6">
                <input type="date" v-model="form.dueDate" class="form-control mb-2" />
              </div>
            </div>

            <!-- Customer -->
            <h5 class="mt-4">Customer</h5>

            <input v-model="form.customerName" class="form-control mb-2" placeholder="Customer Name" />
            <input v-model="form.referenceNumber" class="form-control mb-2" placeholder="Reference" />

            <!-- Payment -->
            <div class="row">
              <div class="col-md-6">
                <select v-model="form.paymentType" class="form-control">
                  <option value="CREDIT">Credit</option>
                  <option value="DEBIT">Debit</option>
                </select>
              </div>
              <div class="col-md-6">
                <input v-model="form.bankName" class="form-control" placeholder="Bank" />
              </div>
            </div>

            <!-- Items -->
            <h5 class="mt-4">Items</h5>

            <div v-for="(item, index) in form.items" :key="index" class="border p-3 mb-2">
              <input v-model="item.description" class="form-control mb-2" placeholder="Description" />

              <div class="row">
                <div class="col-md-3">
                  <input type="number" v-model.number="item.quantity" class="form-control" placeholder="Qty" />
                </div>
                <div class="col-md-3">
                  <input type="number" v-model.number="item.rate" class="form-control" placeholder="Rate" />
                </div>
                <div class="col-md-3">
                  <input type="number" v-model.number="item.discount" class="form-control" placeholder="Discount" />
                </div>
                <div class="col-md-3 d-flex align-items-center">
                  <button class="btn btn-danger btn-sm" @click="removeItem(index)">X</button>
                </div>
              </div>
            </div>

            <button class="btn btn-outline-primary" @click="addItem">+ Add Item</button>

            <!-- Totals -->
            <div class="mt-4 text-end">
              <p>Subtotal: {{ subtotal }}</p>
              <p>Discount: {{ discountTotal }}</p>
              <h5>Total: {{ totalAmount }}</h5>
            </div>

            <!-- Notes -->
            <textarea v-model="form.description" class="form-control mt-3" placeholder="Description" />
            <textarea v-model="form.notes" class="form-control mt-2" placeholder="Notes" />

            <!-- Actions -->
            <div class="mt-4 d-flex justify-content-end">
              <button class="btn btn-dark me-2" :disabled="saving" @click="saveDraft">
                Save Draft
              </button>

              <button class="btn btn-primary me-2" :disabled="saving" @click="saveAndSend">
                Save & Send
              </button>

              <button class="btn btn-success" @click="initiatePayment">
                Pay
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
