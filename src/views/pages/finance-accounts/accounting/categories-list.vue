<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Categories",
      text: "Accounting",
      text1: "Categories",

      categories: [],
      loading: false,

      // pagination
      page: 1,
      limit: 10,
      total: 0,

      // modal form
      form: {
        id: null,
        name: "",
      },

      isEditing: false,
      submitting: false,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    toggleHeader() {
      document
        .getElementById("collapse-header")
        ?.classList.toggle("active");

      document.body.classList.toggle("header-collapse");
    },

    /**
     * ===============================
     * FETCH CATEGORIES
     * ===============================
     */
    async fetchCategories() {
      this.loading = true;

      try {
        const { data } = await api.get("/category", {
          params: {
            page: this.page,
            limit: this.limit,
          },
        });

        this.categories = data?.data || [];
        this.total = data?.count || this.categories.length;
      } catch (err) {
        console.error("Failed to load categories", err);
        this.$toast?.error("Failed to load categories");
      } finally {
        this.loading = false;
      }
    },

    /**
     * ===============================
     * OPEN CREATE MODAL
     * ===============================
     */
    openCreateModal() {
      this.isEditing = false;
      this.form = { id: null, name: "" };

      const modal = new bootstrap.Modal(
        document.getElementById("add_category")
      );

      modal.show();
    },

    /**
     * ===============================
     * OPEN EDIT MODAL
     * ===============================
     */
    openEditModal(category) {
      this.isEditing = true;
      this.form = {
        id: category.id,
        name: category.name,
      };

      const modal = new bootstrap.Modal(
        document.getElementById("add_category")
      );

      modal.show();
    },

    /**
     * ===============================
     * SAVE (CREATE / UPDATE)
     * ===============================
     */
    async saveCategory() {
      this.submitting = true;

      try {
        if (!this.form.name) {
          this.$toast?.error("Category name is required");
          return;
        }

        if (this.isEditing) {
          await api.patch(`/category/${this.form.id}`, {
            name: this.form.name,
          });

          this.$toast?.success("Category updated");
        } else {
          await api.post("/category", {
            name: this.form.name,
          });

          this.$toast?.success("Category created");
        }

        this.fetchCategories();

        bootstrap.Modal.getInstance(
          document.getElementById("add_category")
        ).hide();
      } catch (err) {
        console.error(err);
        this.$toast?.error(
          err?.response?.data?.message || "Operation failed"
        );
      } finally {
        this.submitting = false;
      }
    },

    /**
     * ===============================
     * DELETE CATEGORY
     * ===============================
     */
    async deleteCategory(id) {
      if (!confirm("Delete this category?")) return;

      try {
        await api.delete(`/category/${id}`);

        this.$toast?.success("Category deleted");

        this.fetchCategories();
      } catch (err) {
        console.error(err);
        this.$toast?.error("Failed to delete category");
      }
    },

    /**
     * ===============================
     * PAGINATION
     * ===============================
     */
    changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;

      this.page = newPage;
      this.fetchCategories();
    },
  },
};
</script>

<template>
  <layout-header />
  <layout-sidebar />

  <!-- Page Wrapper -->
  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3"
      >
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div class="mb-2">
            <button
              class="btn btn-primary d-flex align-items-center"
              @click="openCreateModal"
            >
              <i class="ti ti-circle-plus me-2"></i>
              Add Category
            </button>
          </div>

          <div class="ms-2 head-icons">
            <a
              href="javascript:void(0);"
              id="collapse-header"
              @click="toggleHeader"
              data-bs-toggle="tooltip"
              title="Collapse"
            >
              <i class="ti ti-chevrons-up"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h5>Category List</h5>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="p-4 text-center">
          <span class="spinner-border"></span>
        </div>

        <!-- Table -->
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="cat in categories" :key="cat.id">
                <td>{{ cat.name }}</td>
                <td>{{ new Date(cat.createdAt).toLocaleDateString() }}</td>

                <td class="text-end">
                  <button
                    class="btn btn-sm btn-light me-2"
                    @click="openEditModal(cat)"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteCategory(cat.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              <tr v-if="categories.length === 0">
                <td colspan="3" class="text-center text-muted">
                  No categories found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-between">
          <button
            class="btn btn-outline-secondary"
            :disabled="page === 1"
            @click="changePage(page - 1)"
          >
            Prev
          </button>

          <span>
            Page {{ page }} of {{ totalPages || 1 }}
          </span>

          <button
            class="btn btn-outline-secondary"
            :disabled="page >= totalPages"
            @click="changePage(page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
    >
      <p class="mb-0">
        2014 - {{ new Date().getFullYear() }} &copy; SmartHR.
      </p>
      <p>
        Designed & Developed By
        <a href="javascript:void(0);" class="text-primary">Dreams</a>
      </p>
    </div>
  </div>

  <!-- Modal Hook (assumes existing component) -->
  <categories-modal
    :form="form"
    :is-editing="isEditing"
    :loading="submitting"
    @submit="saveCategory"
  />
</template>
