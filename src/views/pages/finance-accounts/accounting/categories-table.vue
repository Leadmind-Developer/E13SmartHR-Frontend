<script>
import api from "@/services/api";

export default {
  name: "CategoriesTable",

  data() {
    return {
      categories: [],
      loading: false,
      error: null,

      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,

      selectedRowKeys: [],
    };
  },

  computed: {
    filteredCategories() {
      if (!this.searchQuery) return this.categories;

      const q = this.searchQuery.toLowerCase();

      return this.categories.filter((item) => {
        return (
          item.name?.toLowerCase().includes(q) ||
          item.SubCategories?.some((sub) =>
            sub.name?.toLowerCase().includes(q)
          )
        );
      });
    },

    paginatedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredCategories.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.ceil(this.filteredCategories.length / this.pageSize) || 1;
    },
  },

  watch: {
    pageSize() {
      this.currentPage = 1;
    },
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    /**
     * ===============================
     * FETCH CATEGORIES (ERP READY)
     * ===============================
     */
    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get("/category");

        // expected backend: { success, data: [] }
        this.categories = data?.data || [];
        this.total = this.categories.length;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to load categories";
      } finally {
        this.loading = false;
      }
    },

    /**
     * ===============================
     * DELETE CATEGORY
     * ===============================
     */
    async deleteCategory(id) {
      try {
        await api.delete(`/category/${id}`);

        this.categories = this.categories.filter((c) => c.id !== id);
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || "Delete failed");
      }
    },

    /**
     * ===============================
     * UI HELPERS
     * ===============================
     */
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    handleSelect(keys) {
      this.selectedRowKeys = keys;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">

    <!-- ================= LOADING ================= -->
    <div v-if="loading" class="p-4 text-center">
      <div class="spinner-border"></div>
    </div>

    <!-- ================= ERROR ================= -->
    <div v-if="error" class="alert alert-danger m-3">
      {{ error }}
    </div>

    <!-- ================= HEADER CONTROLS ================= -->
    <div class="row p-3">
      <div class="col-md-6">
        <label>
          Rows per page
          <select v-model="pageSize" class="form-select form-select-sm">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </label>
      </div>

      <div class="col-md-6 text-end">
        <input
          v-model="searchQuery"
          class="form-control form-control-sm"
          placeholder="Search categories or subcategories..."
        />
      </div>
    </div>

    <!-- ================= TABLE ================= -->
    <div class="table-responsive">
      <table class="table table-hover">

        <thead>
          <tr>
            <th>Category</th>
            <th>Sub Categories</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cat in paginatedCategories" :key="cat.id">

            <!-- CATEGORY -->
            <td>
              <strong>{{ cat.name }}</strong>
            </td>

            <!-- SUB CATEGORIES -->
            <td>
              <span
                v-for="sub in cat.SubCategories"
                :key="sub.id"
                class="badge bg-light text-dark me-1"
              >
                {{ sub.name }}
              </span>
            </td>

            <!-- ACTIONS -->
            <td class="text-end">

              <button class="btn btn-sm btn-outline-primary me-2">
                Edit
              </button>

              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteCategory(cat.id)"
              >
                Delete
              </button>

            </td>

          </tr>

          <tr v-if="!loading && paginatedCategories.length === 0">
            <td colspan="3" class="text-center text-muted py-4">
              No categories found
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- ================= PAGINATION ================= -->
    <div class="d-flex justify-content-between align-items-center p-3">

      <div class="text-muted">
        Showing
        {{ (currentPage - 1) * pageSize + 1 }}
        -
        {{ Math.min(currentPage * pageSize, filteredCategories.length) }}
        of
        {{ filteredCategories.length }}
      </div>

      <ul class="pagination mb-0">

        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click.prevent="changePage(currentPage - 1)">
            Prev
          </a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a class="page-link" @click.prevent="changePage(currentPage + 1)">
            Next
          </a>
        </li>

      </ul>

    </div>

  </div>
</template>
