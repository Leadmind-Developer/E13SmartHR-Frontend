<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div>
          <h2 class="mb-1">Holidays</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">
                  <i class="ti ti-smart-home"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">Attendance</li>
              <li class="breadcrumb-item active">Holidays</li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-primary" @click="showCreateModal = true">
            <i class="ti ti-circle-plus me-2"></i> Add Holiday
          </button>

          <input type="file" class="form-control" @change="uploadFile" />
        </div>
      </div>

      <!-- Calendar View -->
      <div class="card mb-4">
        <div class="card-body">
          <FullCalendar :options="calendarOptions" />
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-3">
        <div class="card-body d-flex flex-wrap gap-3">

          <select v-model="filters.type" class="form-select w-auto" @change="fetchHolidays">
            <option value="">All Types</option>
            <option value="national">National</option>
            <option value="company">Company</option>
          </select>

          <select v-model="filters.status" class="form-select w-auto" @change="fetchHolidays">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input type="date" v-model="filters.startDate" class="form-control w-auto" @change="fetchHolidays" />
          <input type="date" v-model="filters.endDate" class="form-control w-auto" @change="fetchHolidays" />

        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-header">
          <h5>Holiday List</h5>
        </div>

        <div class="card-body table-responsive">
          <table class="custom-table table-hover table-nowrap mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Day</th>
                <th>Type</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in holidays" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.day }}</td>

                <td>
                  <span class="badge" :class="item.type === 'national' ? 'badge-light-danger' : 'badge-light-info'">
                    {{ item.type }}
                  </span>
                </td>

                <td>
                  <span class="badge" :class="item.status === 'active' ? 'badge-light-success' : 'badge-light-secondary'">
                    {{ item.status }}
                  </span>
                </td>

                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">

                    <button class="btn btn-sm btn-outline-primary" @click="editHoliday(item)">
                      Edit
                    </button>

                    <button class="btn btn-sm btn-outline-success" @click="approveHoliday(item.id)">
                      Approve
                    </button>

                    <button class="btn btn-sm btn-outline-warning" @click="publishHoliday(item.id)">
                      Publish
                    </button>

                    <button class="btn btn-sm btn-outline-danger" @click="deleteHoliday(item.id)">
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import api from "@/services/api";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

const holidays = ref([]);
const loading = ref(false);

const filters = ref({
  type: "",
  status: "",
  locationId: "",
  startDate: "",
  endDate: "",
});

const form = ref({
  id: null,
  name: "",
  date: "",
  type: "company",
  status: "active",
});

const showCreateModal = ref(false);

/**
 * Fetch holidays
 */
const fetchHolidays = async () => {
  loading.value = true;

  try {
    const res = await api.get("/holidays", {
      params: filters.value,
    });

    holidays.value = res.data.data.map((h) => ({
      ...h,
      day: new Date(h.date).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/**
 * Create / Update
 */
const saveHoliday = async () => {
  if (!form.value.name || !form.value.date) return;

  if (form.value.id) {
    await api.patch(`/holidays/${form.value.id}`, form.value);
  } else {
    await api.post("/holidays", form.value);
  }

  resetForm();
  fetchHolidays();
};

/**
 * Edit
 */
const editHoliday = (item) => {
  form.value = { ...item };
  showCreateModal.value = true;
};

/**
 * Delete
 */
const deleteHoliday = async (id) => {
  if (!confirm("Delete this holiday?")) return;

  await api.delete(`/holidays/${id}`);
  fetchHolidays();
};

/**
 * Approval
 */
const approveHoliday = async (id) => {
  await api.patch(`/holidays/${id}`, { status: "approved" });
  fetchHolidays();
};

/**
 * Publish
 */
const publishHoliday = async (id) => {
  await api.patch(`/holidays/${id}`, { status: "published" });
  fetchHolidays();
};

/**
 * Bulk Import
 */
const uploadFile = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  await api.post("/holidays/import", formData);
  fetchHolidays();
};

/**
 * Reset form
 */
const resetForm = () => {
  form.value = {
    id: null,
    name: "",
    date: "",
    type: "company",
    status: "active",
  };
  showCreateModal.value = false;
};

/**
 * Calendar
 */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: holidays.value.map((h) => ({
    title: h.title,
    date: h.date,
  })),
}));

watch(holidays, () => {
  // ensures calendar updates reactively
});

onMounted(fetchHolidays);
</script>
