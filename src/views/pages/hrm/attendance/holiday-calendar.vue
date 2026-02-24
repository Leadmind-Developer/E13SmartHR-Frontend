<template>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content">
            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Holiday Calendar</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                            </li>
                            <li class="breadcrumb-item">
                                Attendance
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Holiday Calendar</li>
                        </ol>
                    </nav>

                </div>
                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                    <div class="mb-2">
                        <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add_event"
                            class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Add
                            New Holiday</a>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div id='external-events'></div>
                    <div id="calendar2">
                        <FullCalendar ref="calendarEl" :options="calendarOptions" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Page Wrapper -->

    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
        <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>

    <!-- Add New Event -->
    <div class="modal fade" id="add_event">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add New Event</h4>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <label class="form-label">Holiday Name</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <label class="form-label">Holiday Date</label>
                                    <div class="input-icon-end position-relative">
                                        <a-date-picker v-model="valueOne" class="form-control datetimepicker"
                                            placeholder="dd/mm/yyyy" />
                                        <span class="input-icon-addon">
                                            <i class="ti ti-calendar text-gray-7"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add Holiday</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Add New Event -->

    <!-- Event -->
    <div class="modal fade" id="event_modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark modal-bg">
                    <div class="modal-title text-white"><span id="eventTitle"></span></div>
                    <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ti ti-x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="d-flex align-items-center fw-medium text-dark mb-3"><i
                            class="ti ti-calendar-check text-default me-2"></i>01 jan,2026 to 01 jan,2026</p>
                    <p class="d-flex align-items-center fw-medium text-dark mb-0"><i
                            class="ti ti-calendar-check text-default me-2"></i>12:00 AM to 12:59 PM</p>
                </div>
            </div>
        </div>
    </div>
    <!-- /Event -->
</template>
<script>
import { ref, nextTick } from "vue";
const valueOne = ref();
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
    data() {
        return {
            valueOne,
        };
    },
    props: {
        msg: String,
    },
    components: {
        FullCalendar,
    },
    setup() {
        const value = ref();
        const onPanelChange = (value, mode) => {
            console.log(value, mode);
        };

        const calendarEl = ref(null);

        const events = [
            {
                title: "Meeting with Team Dev",
                className: "badge badge-pink-transparent",
                backgroundColor: "#FFEDF6",
                textColor: "#FD3995",
                start: new Date(Date.now() - 168000000).toJSON().slice(0, 10),
                end: new Date(Date.now() - 168000000).toJSON().slice(0, 10),
            },
        ];

        const calendarOptions = ref({
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            events,
            initialView: "dayGridMonth",
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            eventClick: (info) => {
                console.log("Event clicked:", info.event.title);
            },
        });

        // Resize FullCalendar when switching tabs
        const handleTabSwitch = () => {
            document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
                tab.addEventListener("shown.bs.tab", () => {
                    nextTick(() => {
                        if (calendarEl.value?.getApi()) {
                            calendarEl.value.getApi().updateSize();
                        }
                    });
                });
            });
        };

        return {
            calendarEl,
            calendarOptions,
            handleTabSwitch,
            value, onPanelChange
        };
    },
    mounted() {
        this.handleTabSwitch();
    },
    methods: {
        toggleHeader() {
            document.getElementById("collapse-header").classList.toggle("active");
            document.body.classList.toggle("header-collapse");
        },
    },
};
</script>