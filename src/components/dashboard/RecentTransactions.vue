<template>
  <div>
    <div
      v-for="tx in transactions"
      :key="tx.id"
      class="d-sm-flex justify-content-between flex-wrap mb-3"
    >
      <div class="d-flex align-items-center mb-2">
        <div class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"></div>

        <div class="ms-2 flex-fill">
          <h6 class="fs-medium text-truncate mb-1">
            {{ tx.company }}
          </h6>

          <p class="fs-13 d-inline-flex align-items-center">
            <span class="text-info">#{{ tx.id }}</span>
            <i class="ti ti-circle-filled fs-4 text-primary mx-1"></i>
            {{ formatDate(tx.date) }}
          </p>
        </div>
      </div>

      <div class="text-sm-end mb-2">
        <h6 class="mb-1">+{{ formatCurrency(tx.amount) }}</h6>
        <p class="fs-13">
          {{ tx.plan }} ({{ tx.billing }})
        </p>
      </div>
    </div>

    <div v-if="!transactions?.length" class="text-center text-muted">
      No transactions yet
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value || 0);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>
