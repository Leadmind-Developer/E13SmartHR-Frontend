<template>
    <layout-header />
    <layout-sidebar />

    <div class="page-wrapper">
        <div class="content">

            <!-- Breadcrumb -->
            <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                <div class="my-auto mb-2">
                    <h2 class="mb-1">Resume Parsing</h2>
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">
                                    <i class="ti ti-smart-home"></i>
                                </router-link>
                            </li>
                            <li class="breadcrumb-item">Recruitment</li>
                            <li class="breadcrumb-item active">Resume Parsing</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- Card -->
            <div class="card">

                <!-- Header -->
                <div class="card-header d-flex justify-content-between flex-wrap gap-3">
                    <h5 class="mb-0">Resume List</h5>

                    <div class="d-flex gap-3 flex-wrap align-items-center">

                        <!-- Search -->
                        <input
                            v-model="search"
                            @input="debouncedFetch"
                            type="search"
                            class="form-control form-control-sm"
                            placeholder="Search candidates..."
                        />

                        <!-- Page Size -->
                        <select v-model="limit" @change="fetchData" class="form-select form-select-sm">
                            <option :value="10">10</option>
                            <option :value="25">25</option>
                            <option :value="50">50</option>
                            <option :value="100">100</option>
                        </select>

                    </div>
                </div>

                <!-- Table -->
                <div class="card-body p-0">

                    <div v-if="loading" class="p-4 text-center">
                        <div class="spinner-border text-primary"></div>
                    </div>

                    <div v-else class="table-responsive">
                        <a-table
                            :columns="columns"
                            :data-source="rows"
                            :pagination="false"
                            row-key="id"
                        >
                            <template #bodyCell="{ column, record }">

                                <!-- Candidate -->
                                <template v-if="column.key === 'candidate'">
                                    <div class="d-flex align-items-center">
                                        <div class="ms-2">
                                            <div class="fw-medium">
                                                {{ record.candidateName }}
                                            </div>
                                            <small class="text-muted">
                                                {{ record.email }}
                                            </small>
                                        </div>
                                    </div>
                                </template>

                                <!-- Status -->
                                <template v-if="column.key === 'status'">
                                    <span class="badge bg-outline-info">
                                        {{ record.status }}
                                    </span>
                                </template>

                                <!-- Action -->
                                <template v-if="column.key === 'action'">
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-sm btn-light" @click="viewResume(record)">
                                            <i class="ti ti-eye"></i>
                                        </button>

                                        <button class="btn btn-sm btn-danger" @click="deleteResume(record.id)">
                                            <i class="ti ti-trash"></i>
                                        </button>
                                    </div>
                                </template>

                            </template>
                        </a-table>
                    </div>

                </div>

                <!-- Pagination -->
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }}
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-light" :disabled="page === 1" @click="page-- && fetchData()">
                            Prev
                        </button>

                        <button class="btn btn-sm btn-light" :disabled="page >= meta.lastPage" @click="page++ && fetchData()">
                            Next
                        </button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import debounce from "lodash/debounce";

export default {
    data() {
        return {
            rows: [],
            loading: false,

            search: "",
            page: 1,
            limit: 10,

            meta: {
                total: 0,
                from: 0,
                to: 0,
                lastPage: 1,
            },

            columns: [
                { title: "Cand ID", dataIndex: "candId", key: "candId" },
                { title: "Candidate", key: "candidate" },
                { title: "Applied Role", dataIndex: "appliedRole", key: "appliedRole" },
                { title: "Phone", dataIndex: "phone", key: "phone" },
                { title: "Experience", dataIndex: "experience", key: "experience" },
                { title: "Location", dataIndex: "location", key: "location" },
                { title: "Status", key: "status" },
                { title: "Action", key: "action" },
            ],
        };
    },

    created() {
        this.fetchData();
        this.debouncedFetch = debounce(this.fetchData, 400);
    },

    methods: {

        async fetchData() {
            this.loading = true;

            try {
                const { data } = await api.get("/resumeParsing", {
                    params: {
                        page: this.page,
                        limit: this.limit,
                        search: this.search,
                    },
                });

                const result = data?.data;

                this.rows = result?.rows || [];

                this.meta = {
                    total: result?.count || 0,
                    from: ((this.page - 1) * this.limit) + 1,
                    to: Math.min(this.page * this.limit, result?.count || 0),
                    lastPage: Math.ceil((result?.count || 0) / this.limit),
                };

            } catch (err) {
                console.error("Resume fetch error:", err);
                this.$toast?.error("Failed to load resumes");
            } finally {
                this.loading = false;
            }
        },

        viewResume(record) {
            this.$router.push(`/recruitment/resume/${record.id}`);
        },

        async deleteResume(id) {
            if (!confirm("Delete this resume?")) return;

            try {
                await api.delete(`/resumeParsing/${id}`);
                this.fetchData();
            } catch (err) {
                console.error(err);
                alert("Failed to delete resume");
            }
        },
    },
};
</script>
