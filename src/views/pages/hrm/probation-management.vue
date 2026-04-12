<template>
    <layout-header />
    <layout-sidebar />

    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex justify-content-between align-items-center page-breadcrumb mb-3">
                <div>
                    <h2 class="mb-1">Probation Management</h2>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard"><i class="ti ti-smart-home"></i></router-link>
                        </li>
                        <li class="breadcrumb-item">HRM</li>
                        <li class="breadcrumb-item active">Probation</li>
                    </ol>
                </div>

                <button class="btn btn-primary" @click="openCreateModal">
                    <i class="ti ti-circle-plus me-2"></i> New Probation
                </button>
            </div>

            <!-- TABLE CARD -->
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Probation Records</h5>

                    <input
                        v-model="searchQuery"
                        class="form-control w-25"
                        placeholder="Search employee..."
                    />
                </div>

                <div class="card-body p-0">
                    <a-table
                        :columns="columns"
                        :data-source="filteredData"
                        :row-key="'id'"
                        :loading="loading"
                    >
                        <!-- EMPLOYEE -->
                        <template #bodyCell="{ column, record }">

                            <template v-if="column.key === 'employee'">
                                <div class="d-flex align-items-center">
                                    <div class="avatar avatar-md me-2">
                                        <img :src="record.avatar || defaultAvatar" class="rounded-circle" />
                                    </div>
                                    <div>
                                        <div class="fw-bold">{{ record.employeeName }}</div>
                                        <small class="text-muted">{{ record.designation }}</small>
                                    </div>
                                </div>
                            </template>

                            <!-- STATUS BADGE -->
                            <template v-if="column.key === 'status'">
                                <span class="badge" :class="statusClass(record.status)">
                                    {{ record.status }}
                                </span>
                            </template>

                            <!-- ACTIONS -->
                            <template v-if="column.key === 'action'">
                                <div class="d-flex gap-2">

                                    <!-- VIEW -->
                                    <button class="btn btn-sm btn-light" @click="viewRecord(record)">
                                        <i class="ti ti-eye"></i>
                                    </button>

                                    <!-- APPROVE / MOVE WORKFLOW -->
                                    <button
                                        v-if="record.status !== 'COMPLETED' && record.status !== 'FAILED'"
                                        class="btn btn-sm btn-success"
                                        @click="advanceStatus(record)"
                                    >
                                        <i class="ti ti-check"></i>
                                    </button>

                                    <!-- REJECT -->
                                    <button
                                        v-if="record.status !== 'COMPLETED'"
                                        class="btn btn-sm btn-danger"
                                        @click="failStatus(record)"
                                    >
                                        <i class="ti ti-x"></i>
                                    </button>

                                </div>
                            </template>

                        </template>
                    </a-table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import api from "@/services/api";

export default {
    data() {
        return {
            loading: false,
            searchQuery: "",
            data: [],
            defaultAvatar: "/src/assets/img/users/user.jpg",

            columns: [
                {
                    title: "Employee",
                    key: "employee",
                },
                {
                    title: "Start Date",
                    dataIndex: "startDate",
                    key: "startDate",
                },
                {
                    title: "End Date",
                    dataIndex: "endDate",
                    key: "endDate",
                },
                {
                    title: "Status",
                    key: "status",
                },
                {
                    title: "Action",
                    key: "action",
                },
            ],
        };
    },

    computed: {
        filteredData() {
            const q = this.searchQuery.toLowerCase();

            return this.data.filter((item) =>
                (item.employeeName || "").toLowerCase().includes(q) ||
                (item.designation || "").toLowerCase().includes(q) ||
                (item.status || "").toLowerCase().includes(q)
            );
        },
    },

    methods: {
        /**
         * LOAD DATA (CACHE ENABLED BACKEND)
         */
        async fetchProbations() {
            this.loading = true;

            try {
                const res = await api.get("/probation");
                this.data = res.data.data || [];
            } catch (err) {
                console.error("Failed to fetch probations", err);
            } finally {
                this.loading = false;
            }
        },

        /**
         * ADVANCE WORKFLOW (IN_REVIEW → COMPLETED etc.)
         */
        async advanceStatus(record) {
            try {
                const next = this.getNextStatus(record.status);

                await api.patch(`/probation/${record.id}/status`, {
                    status: next,
                });

                await this.fetchProbations();
            } catch (err) {
                console.error(err);
            }
        },

        /**
         * FAIL FLOW
         */
        async failStatus(record) {
            try {
                await api.patch(`/probation/${record.id}/status`, {
                    status: "FAILED",
                });

                await this.fetchProbations();
            } catch (err) {
                console.error(err);
            }
        },

        /**
         * SIMPLE WORKFLOW ENGINE (FRONTEND MIRROR)
         */
        getNextStatus(current) {
            const flow = {
                PENDING: "IN_REVIEW",
                IN_REVIEW: "EXTENDED",
                EXTENDED: "COMPLETED",
            };

            return flow[current] || "COMPLETED";
        },

        statusClass(status) {
            return {
                "bg-warning": status === "PENDING",
                "bg-info": status === "IN_REVIEW",
                "bg-primary": status === "EXTENDED",
                "bg-success": status === "COMPLETED",
                "bg-danger": status === "FAILED",
            };
        },

        viewRecord(record) {
            console.log("VIEW:", record);
        },

        openCreateModal() {
            console.log("OPEN CREATE MODAL");
        },
    },

    mounted() {
        this.fetchProbations();
    },
};
</script>
