<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

/**
 * Router
 */
const router = useRouter();

/**
 * FORM STATE (ALIGNED WITH BACKEND)
 */
const form = reactive({
  title: "",
  invoiceNumber: "",
  invoiceDate: new Date(),
  dueDate: new Date(),

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

/**
 * OPTIONS
 */
const paymentOptions = [
  { label: "Credit", value: "CREDIT" },
  { label: "Debit", value: "DEBIT" },
];

const bankOptions = [
  { label: "Bank of America", value: "Bank of America" },
  { label: "U.S. Bank", value: "U.S. Bank" },
];

/**
 * COMPUTED TOTALS (SYNC WITH BACKEND)
 */
const subtotal = computed(() =>
  form.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
);

const discountTotal = computed(() =>
  form.items.reduce((sum, item) => sum + (item.discount || 0), 0)
);

const totalAmount = computed(() => subtotal.value - discountTotal.value);

/**
 * ITEM HANDLING
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
  if (form.items.length > 1) {
    form.items.splice(index, 1);
  }
};

/**
 * SUBMIT
 */
const loading = ref(false);

const submit = async (status = "DRAFT") => {
  try {
    loading.value = true;

    const payload = {
      ...form,
      status,
    };

    await api.post("/invoices", payload);

    router.push("/sales/invoices");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error creating invoice");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <div class="col-md-10 mx-auto">
        <div class="card">
          <div class="card-body">

            <!-- HEADER -->
            <div class="d-flex justify-content-between mb-4">
              <router-link to="/sales/invoices">← Back</router-link>
            </div>

            <!-- INVOICE DETAILS -->
            <h4>Invoice Details</h4>

            <input v-model="form.title" placeholder="Invoice Title" class="form-control mb-2" />

            <div class="row">
              <div class="col-md-4">
                <input v-model="form.invoiceNumber" placeholder="Invoice No" class="form-control" />
              </div>

              <div class="col-md-4">
                <input type="date" v-model="form.invoiceDate" class="form-control" />
              </div>

              <div class="col-md-4">
                <input type="date" v-model="form.dueDate" class="form-control" />
              </div>
            </div>

            <!-- CUSTOMER -->
            <h4 class="mt-4">Customer</h4>

            <div class="row">
              <div class="col-md-4">
                <input v-model="form.customerName" placeholder="Customer Name" class="form-control" />
              </div>

              <div class="col-md-4">
                <input v-model="form.referenceNumber" placeholder="Reference" class="form-control" />
              </div>

              <div class="col-md-4">
                <select v-model="form.paymentType" class="form-control">
                  <option v-for="p in paymentOptions" :key="p.value" :value="p.value">
                    {{ p.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- ITEMS -->
            <h4 class="mt-4">Items</h4>

            <div
              v-for="(item, index) in form.items"
              :key="index"
              class="border p-3 mb-2"
            >
              <div class="row">
                <div class="col-md-4">
                  <input v-model="item.description" placeholder="Description" class="form-control" />
                </div>

                <div class="col-md-2">
                  <input type="number" v-model.number="item.quantity" class="form-control" />
                </div>

                <div class="col-md-2">
                  <input type="number" v-model.number="item.rate" class="form-control" />
                </div>

                <div class="col-md-2">
                  <input type="number" v-model.number="item.discount" class="form-control" />
                </div>

                <div class="col-md-2 d-flex align-items-center">
                  <button class="btn btn-danger btn-sm" @click="removeItem(index)">
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <button class="btn btn-outline-primary" @click="addItem">
              + Add Item
            </button>

            <!-- TOTALS -->
            <div class="mt-4 text-end">
              <p>Subtotal: {{ subtotal }}</p>
              <p>Discount: {{ discountTotal }}</p>
              <h5>Total: {{ totalAmount }}</h5>
            </div>

            <!-- NOTES -->
            <textarea v-model="form.description" class="form-control mt-3" placeholder="Description" />
            <textarea v-model="form.notes" class="form-control mt-2" placeholder="Notes" />

            <!-- ACTIONS -->
            <div class="mt-4 text-end">
              <button
                class="btn btn-dark"
                :disabled="loading"
                @click="submit('DRAFT')"
              >
                Save Draft
              </button>

              <button
                class="btn btn-primary ms-2"
                :disabled="loading"
                @click="submit('SENT')"
              >
                Save & Send
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
