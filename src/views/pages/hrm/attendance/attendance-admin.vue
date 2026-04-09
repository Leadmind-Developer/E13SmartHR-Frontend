<script>
import api from "@/services/api";

export default {
  data() {
    return {
      title: "Attendance Admin",
      text: "Attendance",
      text1: "Attendance Admin",

      // Filters
      filters: {
        date: null,
        status: null,
        department: null,
        page: 1,
        limit: 10,
      },

      // Data
      loading: false,
      attendance: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
      },

      // Stats
      stats: {
        present: 0,
        absent: 0,
        late: 0,
      },
    };
  },

  mounted() {
    this.fetchAttendance();
  },

  methods: {
    toggleHeader() {
      document.getElementById("collapse-header").classList.toggle("active");
      document.body.classList.toggle("header-collapse");
    },

    async fetchAttendance() {
      this.loading = true;
      try {
        const res = await api.get("/attendance/admin", {
          params: {
            date: this.filters.date,
            page: this.filters.page,
            limit: this.filters.limit,
            status: this.filters.status,
            department: this.filters.department,
          },
        });

        this.attendance = res.data.data;
        this.pagination = res.data.pagination;

        this.computeStats();
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    computeStats() {
      const stats = {
        present: 0,
        absent: 0,
        late: 0,
      };

      this.attendance.forEach((item) => {
        if (item.status === "present") stats.present++;
        if (item.status === "absent") stats.absent++;
        if (item.lateMinutes > 0) stats.late++;
      });

      this.stats = stats;
    },

    onDateChange(date) {
      this.filters.date = date;
      this.filters.page = 1;
      this.fetchAttendance();
    },

    setStatus(status) {
      this.filters.status = status;
      this.fetchAttendance();
    },

    setDepartment(dept) {
      this.filters.department = dept;
      this.fetchAttendance();
    },

    changePage(page) {
      this.filters.page = page;
      this.fetchAttendance();
    },
  },
};
</script>
