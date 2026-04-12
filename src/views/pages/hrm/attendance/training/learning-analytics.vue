<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Header -->
      <div class="d-md-flex d-block align-items-center justify-content-between mb-3">
        <div>
          <h2>Learning Analytics</h2>
        </div>
      </div>

      <!-- STATS -->
      <div class="row">

        <!-- Learning Trend -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5>Learning Trend</h5>
            </div>
            <div class="card-body">
              <apexchart
                type="line"
                height="300"
                :options="charts.learning.options"
                :series="charts.learning.series"
              />
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5>Certifications Issued</h5>
            </div>
            <div class="card-body">
              <apexchart
                type="area"
                height="300"
                :options="charts.certifications.options"
                :series="charts.certifications.series"
              />
            </div>
          </div>
        </div>

      </div>

      <!-- TABLE -->
      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
          <h5>Learning Records</h5>

          <input
            v-model="search"
            @input="fetchTrainings"
            class="form-control w-25"
            placeholder="Search..."
          />
        </div>

        <div class="card-body p-0">

          <div v-if="loading" class="text-center p-4">
            Loading...
          </div>

          <div v-else>
            <a-table
              :columns="columns"
              :data-source="trainings"
              :pagination="false"
              rowKey="id"
            >
              <template #bodyCell="{ column, record }">

                <!-- Employee -->
                <template v-if="column.key === 'employee'">
                  <div>
                    <strong>{{ record.user?.email }}</strong>
                  </div>
                </template>

                <!-- Training -->
                <template v-if="column.key === 'training'">
                  {{ record.training?.title }}
                </template>

                <!-- Status -->
                <template v-if="column.key === 'status'">
                  <span class="badge bg-info">
                    {{ record.status || 'N/A' }}
                  </span>
                </template>

                <!-- Certificate -->
                <template v-if="column.key === 'certificate'">
                  <span v-if="record.certificate">
                    Issued
                  </span>
                  <span v-else>-</span>
                </template>

              </template>
            </a-table>

            <!-- PAGINATION -->
            <div class="p-3 d-flex justify-content-between">
              <div>
                Page {{ page }} of {{ totalPages }}
              </div>

              <div>
                <button
                  class="btn btn-sm btn-light me-2"
                  :disabled="page === 1"
                  @click="page-- && fetchTrainings()"
                >
                  Prev
                </button>

                <button
                  class="btn btn-sm btn-light"
                  :disabled="page === totalPages"
                  @click="page++ && fetchTrainings()"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "LearningAnalytics",

  data() {
    return {
      loading: false,

      // table
      trainings: [],
      page: 1,
      limit: 10,
      total: 0,
      search: "",

      // charts
      charts: {
        learning: {
          series: [],
          options: {
            chart: { toolbar: { show: false } },
            xaxis: { categories: [] }
          }
        },
        certifications: {
          series: [],
          options: {
            chart: { toolbar: { show: false } },
            xaxis: { categories: [] }
          }
        }
      },

      columns: [
        { title: "Employee", key: "employee" },
        { title: "Training", key: "training" },
        { title: "Status", key: "status" },
        { title: "Certificate", key: "certificate" }
      ]
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit) || 1;
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      await Promise.all([
        this.fetchAnalytics(),
        this.fetchTrainings()
      ]);
    },

    /*
    |--------------------------------------------------------------------------
    | FETCH ANALYTICS
    |--------------------------------------------------------------------------
    */
    async fetchAnalytics() {
      try {
        const { data } = await api.get("/analytics/learning");

        const res = data.data;

        /*
        Expected backend shape (example)
        {
          months: [],
          learningCounts: [],
          certifications: []
        }
        */

        this.charts.learning.series = [
          { name: "Employees", data: res.learningCounts || [] }
        ];

        this.charts.learning.options.xaxis.categories =
          res.months || [];

        this.charts.certifications.series = [
          { name: "Certifications", data: res.certifications || [] }
        ];

        this.charts.certifications.options.xaxis.categories =
          res.months || [];

      } catch (err) {
        console.error("Analytics error", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | FETCH TRAININGS
    |--------------------------------------------------------------------------
    */
    async fetchTrainings() {
      this.loading = true;

      try {
        const { data } = await api.get("/trainings", {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.search
          }
        });

        this.trainings = data.data.rows || [];
        this.total = data.data.count || 0;

      } catch (err) {
        console.error("Training fetch error", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
