<script>
import api from "@/services/api";
import dayjs from "dayjs";

export default {
  data() {
    return {
      loading: false,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
      },
      filters: {
        status: "",
        department: "",
        date: "",
      },
      searchQuery: "",
    };
  },

  computed: {
    columns() {
      return [
        {
          title: "Employee",
          key: "employee",
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Check In",
          dataIndex: "checkIn",
        },
        {
          title: "Check Out",
          dataIndex: "checkOut",
        },
        {
          title: "Break",
          dataIndex: "breakMinutes",
        },
        {
          title: "Late",
          dataIndex: "lateMinutes",
        },
        {
          title: "Production Hours",
          dataIndex: "productionMinutes",
        },
        {
          title: "",
          key: "action",
        },
      ];
    },
  },

  mounted() {
    this.fetchAttendance();
  },

  methods: {
    async fetchAttendance() {
      try {
        this.loading = true;

        const res = await api.get("/attendance/admin", {
          params: {
            page: this.pagination.page,
            limit: this.pagination.limit,
            status: this.filters.status,
            department: this.filters.department,
            date: this.filters.date,
          },
        });

        this.data = res.data.data;
        this.pagination.total = res.data.pagination.total;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    handleTableChange(pagination) {
      this.pagination.page = pagination.current;
      this.pagination.limit = pagination.pageSize;
      this.fetchAttendance();
    },

    formatTime(value) {
      return value ? dayjs(value).format("hh:mm A") : "-";
    },

    formatMinutes(value) {
      return value ? `${value} Min` : "-";
    },

    formatHours(minutes) {
      if (!minutes) return "0.00 Hrs";
      return `${(minutes / 60).toFixed(2)} Hrs`;
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <div class="table-responsive">
      <a-table
        class="table datatable thead-light"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="{
          total: pagination.total,
          current: pagination.page,
          pageSize: pagination.limit
        }"
        @change="handleTableChange"
        rowKey="id"
      >
        <template #bodyCell="{ column, record }">
          
          <!-- Employee -->
          <template v-if="column.key === 'employee'">
            <div class="d-flex align-items-center file-name-icon">
              <a class="avatar avatar-md border avatar-rounded">
                <img
                  :src="record.employee?.avatar || '/default-avatar.png'"
                  class="img-fluid"
                />
              </a>
              <div class="ms-2">
                <h6 class="fw-medium">
                  {{ record.employee?.name }}
                </h6>
                <span class="fs-12">
                  {{ record.employee?.department }}
                </span>
              </div>
            </div>
          </template>

          <!-- Status -->
          <template v-if="column.dataIndex === 'status'">
            <span
              class="badge"
              :class="{
                'badge-success-transparent': record.status === 'present',
                'badge-danger-transparent': record.status === 'absent'
              }"
            >
              {{ record.status }}
            </span>
          </template>

          <!-- Check In -->
          <template v-if="column.dataIndex === 'checkIn'">
            {{ formatTime(record.checkIn) }}
          </template>

          <!-- Check Out -->
          <template v-if="column.dataIndex === 'checkOut'">
            {{ formatTime(record.checkOut) }}
          </template>

          <!-- Break -->
          <template v-if="column.dataIndex === 'breakMinutes'">
            {{ formatMinutes(record.breakMinutes) }}
          </template>

          <!-- Late -->
          <template v-if="column.dataIndex === 'lateMinutes'">
            {{ formatMinutes(record.lateMinutes) }}
          </template>

          <!-- Production -->
          <template v-if="column.dataIndex === 'productionMinutes'">
            <span
              class="badge"
              :class="{
                'badge-danger': record.productionMinutes < 420,
                'badge-success': record.productionMinutes >= 480,
                'badge-info': record.productionMinutes >= 540
              }"
            >
              {{ formatHours(record.productionMinutes) }}
            </span>
          </template>

          <!-- Actions -->
          <template v-if="column.key === 'action'">
            <div class="action-icon d-inline-flex">
              <a class="me-2">
                <i class="ti ti-edit"></i>
              </a>
            </div>
          </template>

        </template>
      </a-table>
    </div>
  </div>
</template>
