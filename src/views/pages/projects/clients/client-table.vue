<template>
  <div
    id="primaryBorderFive"
    class="accordion-collapse collapse border-top"
    aria-labelledby="headingFive"
    data-bs-parent="#accordionExample"
  >
    <div class="accordion-body">

      <!-- HEADER -->
      <div class="row align-items-center g-3 mb-3">
        <div class="col-sm-4">
          <h6>Total Documents : {{ documents.length }}</h6>
        </div>

        <div class="col-sm-8">
          <div class="d-flex align-items-center">
            <div class="position-relative input-icon flex-fill">
              <span class="input-icon-addon">
                <i class="ti ti-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search documents..."
                v-model="searchQuery"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="custom-datatable-filter table-responsive border">

        <!-- LOADING -->
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border"></div>
        </div>

        <!-- TABLE -->
        <a-table
          v-else
          class="table datatable thead-light"
          :columns="columns"
          :data-source="filteredDocuments"
          :row-selection="rowSelection"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">

            <!-- NAME -->
            <template v-if="column.key === 'name'">
              <div class="d-flex align-items-center file-name-icon">
                <div class="avatar avatar-md bg-light">
                  <img :src="getFileIcon(record.type)" class="img-fluid" />
                </div>

                <div class="ms-2">
                  <p class="text-title fw-medium mb-0">
                    {{ record.name }}
                  </p>
                  <small class="text-muted">{{ record.type }}</small>
                </div>
              </div>
            </template>

            <!-- SIZE -->
            <template v-if="column.key === 'size'">
              <p class="mb-0">{{ record.size }}</p>
            </template>

            <!-- TYPE -->
            <template v-if="column.key === 'type'">
              <p class="mb-0">{{ record.type }}</p>
            </template>

            <!-- MODIFIED -->
            <template v-if="column.key === 'updatedAt'">
              <p class="mb-0">{{ formatDate(record.updatedAt) }}</p>
            </template>

            <!-- SHARED -->
            <template v-if="column.key === 'shared'">
              <div class="avatar-list-stacked avatar-group-sm">
                <span
                  v-for="(user, i) in (record.sharedWith || []).slice(0, 3)"
                  :key="i"
                  class="avatar avatar-rounded"
                >
                  <img
                    class="border border-white"
                    :src="user.avatar"
                    alt="img"
                  />
                </span>

                <span
                  v-if="record.sharedWith && record.sharedWith.length > 3"
                  class="avatar bg-primary avatar-rounded text-fixed-white"
                >
                  +{{ record.sharedWith.length - 3 }}
                </span>
              </div>
            </template>

            <!-- ACTION -->
            <template v-if="column.key === 'action'">
              <div class="d-flex align-items-center">

                <div class="rating-select me-2">
                  <a href="javascript:void(0);">
                    <i class="ti ti-star"></i>
                  </a>
                </div>

                <div class="dropdown">
                  <a href="javascript:void(0);" data-bs-toggle="dropdown">
                    <i class="ti ti-dots fs-14"></i>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);">
                        <i class="ti ti-trash me-2"></i>Delete
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);">
                        <i class="ti ti-download me-2"></i>Download
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </template>

          </template>
        </a-table>

      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Size", dataIndex: "size", key: "size" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Modified", dataIndex: "updatedAt", key: "updatedAt" },
  { title: "Shared", dataIndex: "shared", key: "shared" },
  { title: "", key: "action" },
];

const rowSelection = {
  onChange: () => {},
  onSelect: () => {},
  onSelectAll: () => {},
};

export default {
  data() {
    return {
      loading: false,
      documents: [],
      searchQuery: "",
      columns,
      rowSelection,
    };
  },

  mounted() {
    this.fetchDocuments();
  },

  computed: {
    filteredDocuments() {
      const q = this.searchQuery.toLowerCase();

      return this.documents.filter((d) => {
        return (
          (d.name || "").toLowerCase().includes(q) ||
          (d.type || "").toLowerCase().includes(q) ||
          (d.size || "").toLowerCase().includes(q)
        );
      });
    },
  },

  methods: {
    async fetchDocuments() {
      this.loading = true;

      try {
        const { data } = await api.get("/clients/documents");
        this.documents = data?.data || data || [];
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        this.loading = false;
      }
    },

    getFileIcon(type) {
      const map = {
        pdf: "file-pdf.svg",
        doc: "file-doc.svg",
        image: "file-image.svg",
        folder: "file-folder.svg",
        xml: "file-xml.svg",
      };

      const file = map[type?.toLowerCase()] || "file-default.svg";
      return new URL(`/src/assets/img/icons/${file}`, import.meta.url).href;
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
