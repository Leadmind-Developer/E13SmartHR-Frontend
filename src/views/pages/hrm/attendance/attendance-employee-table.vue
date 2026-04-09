<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      data: [],
      columns: [
        {
          title: "Date",
          dataIndex: "date",
        },
        {
          title: "Check In",
          dataIndex: "checkIn",
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
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
          dataIndex: "productionHours",
        },
      ],
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },

  mounted() {
    this.fetchAttendance();
  },

  methods: {
    async fetchAttendance() {
      try {
        this.loading = true;

        const res = await axios.get("/api/attendance/me", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
          },
        });

        this.total = res.data.pagination.total;

        this.data = res.data.data.map((item) => ({
          key: item.id,
          date: this.formatDate(item.date),
          checkIn: this.formatTime(item.checkIn),
          checkOut: this.formatTime(item.checkOut),
          status: this.capitalize(item.status),
          breakMinutes: this.formatMinutes(item.breakMinutes),
          lateMinutes: this.formatMinutes(item.lateMinutes),
          productionHours: this.formatHours(item.productionMinutes),
        }));
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },

    formatTime(date) {
      if (!date) return "-";
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatMinutes(min) {
      if (!min) return "-";
      return `${min} Min`;
    },

    formatHours(min) {
      if (!min) return "0.00 Hrs";
      return `${(min / 60).toFixed(2)} Hrs`;
    },

    capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    handleTableChange(pagination) {
      this.currentPage = pagination.current;
      this.pageSize = pagination.pageSize;
      this.fetchAttendance();
    },
  },

  watch: {
    currentPage() {
      this.fetchAttendance();
    },
    pageSize() {
      this.fetchAttendance();
    },
  },
};
</script>

<template>
  <div class="card-body p-0">
    <div class="custom-datatable-filter table-responsive">
      <a-table
        class="table datatable thead-light"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true
        }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          
          <!-- Status Badge -->
          <template v-if="column.key === 'status'">
            <span
              class="badge d-inline-flex align-items-center"
              :class="
                record.status === 'Present'
                  ? 'badge-success-transparent'
                  : 'badge-danger-transparent'
              "
            >
              <i class="ti ti-point-filled me-1"></i>
              {{ record.status }}
            </span>
          </template>

          <!-- Production Hours -->
          <template v-if="column.dataIndex === 'productionHours'">
            <span
              class="badge d-inline-flex align-items-center"
              :class="
                parseFloat(record.productionHours) >= 8
                  ? 'badge-success'
                  : 'badge-danger'
              "
            >
              <i class="ti ti-clock-hour-11 me-1"></i>
              {{ record.productionHours }}
            </span>
          </template>

        </template>
      </a-table>
    </div>
  </div>
</template>
