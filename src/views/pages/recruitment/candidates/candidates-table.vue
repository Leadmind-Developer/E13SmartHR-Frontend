<script>
import api from "@/services/api";

export default {
  data() {
    return {
      loading: false,
      candidates: [],
      nextCursor: null,
      limit: 10,
      search: "",
      stage: "",
      selectedRowKeys: [],
    };
  },

  mounted() {
    this.fetchCandidates();
  },

  methods: {
    async fetchCandidates(reset = true) {
      try {
        this.loading = true;

        if (reset) {
          this.candidates = [];
          this.nextCursor = null;
        }

        const { data } = await api.get("/candidates", {
          params: {
            limit: this.limit,
            cursor: this.nextCursor,
            search: this.search || undefined,
            stage: this.stage || undefined,
          },
        });

        if (data.success) {
          this.candidates = [...this.candidates, ...data.data];
          this.nextCursor = data.nextCursor;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      if (!this.nextCursor) return;
      await this.fetchCandidates(false);
    },

    async deleteCandidate(id) {
      if (!confirm("Delete this candidate?")) return;

      try {
        await api.delete(`/candidates/${id}`);
        this.fetchCandidates();
      } catch (err) {
        console.error(err);
      }
    },

    async moveStage(record, stage) {
      try {
        await api.patch(`/candidates/${record.id}/stage`, { stage });
        this.fetchCandidates();
      } catch (err) {
        console.error(err);
      }
    },

    getStatusClass(status) {
      switch (status) {
        case "NEW":
          return "border-purple text-purple";
        case "SCHEDULED":
          return "border-pink text-pink";
        case "INTERVIEWED":
          return "border-info text-info";
        case "OFFERED":
          return "border-warning text-warning";
        case "HIRED":
          return "border-success text-success";
        case "REJECTED":
          return "border-danger text-danger";
        default:
          return "border-secondary text-secondary";
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },

  computed: {
    columns() {
      return [
        {
          title: "Candidate",
          key: "candidate",
        },
        {
          title: "Role",
          dataIndex: "appliedRole",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Applied",
          key: "appliedAt",
        },
        {
          title: "Status",
          key: "stage",
        },
        {
          title: "",
          key: "action",
        },
      ];
    },

    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (keys) => {
          this.selectedRowKeys = keys;
        },
      };
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <!-- Filters -->
    <div class="row mb-3">
      <div class="col-md-4">
        <input
          v-model="search"
          @input="fetchCandidates()"
          type="text"
          class="form-control"
          placeholder="Search candidates..."
        />
      </div>

      <div class="col-md-3">
        <select
          v-model="stage"
          @change="fetchCandidates()"
          class="form-select"
        >
          <option value="">All Stages</option>
          <option value="NEW">New</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="INTERVIEWED">Interviewed</option>
          <option value="OFFERED">Offered</option>
          <option value="HIRED">Hired</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <a-table
        :columns="columns"
        :data-source="candidates"
        :loading="loading"
        rowKey="id"
        :row-selection="rowSelection"
      >
        <template #bodyCell="{ column, record }">
          <!-- Candidate -->
          <template v-if="column.key === 'candidate'">
            <div>
              <strong>{{ record.name }}</strong>
              <div class="text-muted small">{{ record.email || 'Hidden' }}</div>
            </div>
          </template>

          <!-- Date -->
          <template v-if="column.key === 'appliedAt'">
            {{ formatDate(record.createdAt) }}
          </template>

          <!-- Status -->
          <template v-if="column.key === 'stage'">
            <span class="badge border" :class="getStatusClass(record.stage)">
              {{ record.stage }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="d-flex gap-2">
              <select
                class="form-select form-select-sm"
                @change="moveStage(record, $event.target.value)"
              >
                <option disabled selected>Move</option>
                <option value="NEW">New</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="INTERVIEWED">Interviewed</option>
                <option value="OFFERED">Offered</option>
                <option value="HIRED">Hired</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <button
                class="btn btn-sm btn-danger"
                @click="deleteCandidate(record.id)"
              >
                Delete
              </button>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <!-- Load More -->
    <div class="text-center my-3" v-if="nextCursor">
      <button class="btn btn-primary" @click="loadMore">
        Load More
      </button>
    </div>
  </div>
</template>
