<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "@/services/api"; // adjust to your setup
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const calendarEl = ref(null);

// form state
const form = ref({
  name: "",
  date: "",
});

// events
const events = ref([]);

// calendar config
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth",
  },
  events: events.value,
  eventClick: handleEventClick,
});

// 🔄 Fetch holidays
const fetchHolidays = async () => {
  const res = await api.get("/holidays");

  events.value = res.data.data.map((h) => ({
    id: h.id,
    title: h.title,
    start: h.date,
    allDay: true,
    className: "badge badge-success",
  }));

  refreshCalendar();
};

// ➕ Add holiday
const addHoliday = async () => {
  if (!form.value.name || !form.value.date) return;

  await api.post("/holidays", form.value);

  form.value.name = "";
  form.value.date = "";

  await fetchHolidays();
};

// ❌ Delete holiday
const deleteHoliday = async (id) => {
  await api.delete(`/holidays/${id}`);
  await fetchHolidays();
};

// 📌 Click event
function handleEventClick(info) {
  const confirmDelete = confirm(`Delete ${info.event.title}?`);
  if (confirmDelete) {
    deleteHoliday(info.event.id);
  }
}

// 🔄 Refresh calendar
const refreshCalendar = () => {
  nextTick(() => {
    const api = calendarEl.value?.getApi();
    if (api) {
      api.removeAllEvents();
      events.value.forEach((e) => api.addEvent(e));
    }
  });
};

onMounted(fetchHolidays);
</script>
