// composables/useEmployees.js
import { ref, watch } from "vue";
import { useEmployeeStore } from "@/stores/employee.store";

export function useEmployees() {
  const store = useEmployeeStore();

  const search = ref("");
  const page = ref(1);
  const pageSize = ref(10);
  const sortBy = ref("");
  const sortOrder = ref("");

  const fetch = async () => {
    await store.fetchEmployees({
      search: search.value,
      page: page.value,
      limit: pageSize.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    });
  };

  watch([search, page, pageSize, sortBy, sortOrder], fetch, {
    immediate: true,
  });

  return {
    store,
    search,
    page,
    pageSize,
    sortBy,
    sortOrder,
    fetch,
  };
}
