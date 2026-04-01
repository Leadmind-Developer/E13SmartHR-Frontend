<template>
  <div>
    <div
      v-for="company in companies"
      :key="company.name"
      class="d-sm-flex justify-content-between flex-wrap mb-3"
    >
      <div class="d-flex align-items-center mb-2">
        <div class="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"></div>

        <div class="ms-2 flex-fill">
          <h6 class="fs-medium text-truncate mb-1">
            {{ company.name }}
          </h6>

          <p class="fs-13">
            {{ company.plan }} ({{ company.billing || 'Monthly' }})
          </p>
        </div>
      </div>

      <div class="text-sm-end mb-2">
        <p class="fs-13 mb-1">
          {{ company.users }} Users
        </p>

        <h6 class="fs-13 fw-normal">
          {{ company.domain }}
        </h6>
      </div>
    </div>

    <div v-if="!companies?.length" class="text-center text-muted">
      No companies found
    </div>
  </div>
</template>

<script setup>
defineProps({
  companies: {
    type: Array,
    default: () => [],
  },
});
</script>
