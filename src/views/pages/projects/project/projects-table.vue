<template>
  <div class="card-body p-0">

    <!-- Filters -->
    <div class="row mb-3">

      <div class="col-md-3">
        <select
          v-model="filters.status"
          class="form-select"
          @change="reload"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div class="col-md-3">
        <select
          v-model="filters.priority"
          class="form-select"
          @change="reload"
        >
          <option value="">All Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <div class="col-md-3">
        <select
          v-model="pageSize"
          class="form-select"
          @change="reload"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div class="col-md-3">
        <input
          v-model="searchQuery"
          @keyup.enter="reload"
          class="form-control"
          placeholder="Search projects..."
        />
      </div>

    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <!-- Table -->
    <div v-else class="custom-datatable-filter table-responsive">

      <a-table
        :columns="columns"
        :data-source="projects"
        :pagination="false"
        row-key="id"
      >

        <template #bodyCell="{ column, record }">

          <!-- ID -->
          <template v-if="column.key==='id'">
            <router-link
              :to="`/projects/projects-details/${record.id}`"
            >
              {{ shortId(record.id) }}
            </router-link>
          </template>

          <!-- Name -->
          <template v-if="column.key==='name'">
            <h6 class="fw-medium mb-0">
              {{ record.name }}
            </h6>
          </template>

          <!-- Leader -->
          <template v-if="column.key==='leader'">
            {{ projectLeader(record) }}
          </template>

          <!-- Team -->
          <template v-if="column.key==='team'">
            <span class="badge bg-light text-dark">
              {{ memberCount(record) }} Members
            </span>
          </template>

          <!-- Deadline -->
          <template v-if="column.key==='deadline'">
            {{ formatDate(record.dueDate || record.createdAt) }}
          </template>

          <!-- Priority -->
          <template v-if="column.key==='priority'">

            <span
              class="badge"
              :class="priorityClass(record.priority)"
            >
              {{ record.priority || 'MEDIUM' }}
            </span>

          </template>

          <!-- Status -->
          <template v-if="column.key==='status'">

            <span
              class="badge"
              :class="statusClass(record.status)"
            >
              {{ record.status }}
            </span>

          </template>

          <!-- Actions -->
          <template v-if="column.key==='action'">

            <div class="action-icon d-inline-flex">

              <router-link
                :to="`/projects/projects-details/${record.id}`"
                class="me-3"
              >
                <i class="ti ti-eye"></i>
              </router-link>

              <a
                href="#"
                class="me-3"
                @click.prevent="$emit('edit-project',record)"
              >
                <i class="ti ti-edit"></i>
              </a>

              <a
                href="#"
                @click.prevent="deleteProject(record)"
              >
                <i class="ti ti-trash"></i>
              </a>

            </div>

          </template>

        </template>

      </a-table>

    </div>

    <!-- Footer -->
    <div class="row pagination mt-4">

      <div class="col-md-5">
        Showing
        {{ startRow }}
        -
        {{ endRow }}
        of
        {{ total }}
      </div>

      <div class="col-md-7">

        <ul class="pagination justify-content-end">

          <li
            class="page-item"
            :class="{disabled: currentPage===1}"
          >
            <a
              href="#"
              class="page-link"
              @click.prevent="changePage(currentPage-1)"
            >
              <i class="ti ti-chevron-left"></i>
            </a>
          </li>

          <li
            v-for="p in totalPages"
            :key="p"
            class="page-item"
            :class="{active:p===currentPage}"
          >
            <a
              href="#"
              class="page-link"
              @click.prevent="changePage(p)"
            >
              {{ p }}
            </a>
          </li>

          <li
            class="page-item"
            :class="{disabled: currentPage===totalPages}"
          >
            <a
              href="#"
              class="page-link"
              @click.prevent="changePage(currentPage+1)"
            >
              <i class="ti ti-chevron-right"></i>
            </a>
          </li>

        </ul>

      </div>

    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {

  name:"ProjectsTable",

  emits:[
    "edit-project"
  ],

  data() {
    return {

      loading:false,

      projects:[],

      total:0,

      currentPage:1,

      totalPages:1,

      pageSize:10,

      searchQuery:"",

      filters:{
        status:"",
        priority:""
      },

      columns:[
        { title:"Project ID", key:"id" },
        { title:"Project Name", key:"name" },
        { title:"Leader", key:"leader" },
        { title:"Team", key:"team" },
        { title:"Deadline", key:"deadline" },
        { title:"Priority", key:"priority" },
        { title:"Status", key:"status" },
        { title:"", key:"action" }
      ]

    };
  },

  computed:{

    startRow(){
      if(!this.total) return 0;
      return ((this.currentPage-1)*this.pageSize)+1;
    },

    endRow(){
      return Math.min(
        this.currentPage*this.pageSize,
        this.total
      );
    }

  },

  mounted(){
    this.fetchProjects();
  },

  methods:{

    async fetchProjects(){

      this.loading=true;

      try{

        const { data } = await api.get("/projects",{
          params:{
            page:this.currentPage,
            limit:this.pageSize,
            search:this.searchQuery || undefined,
            status:this.filters.status || undefined,
            priority:this.filters.priority || undefined
          }
        });

        const payload = data?.data || {};

        this.projects =
          payload.data || [];

        this.total =
          payload.meta?.total || 0;

        this.totalPages =
          payload.meta?.pages || 1;

      }
      catch(err){
        console.error(
          "Failed loading projects",
          err
        );
      }
      finally{
        this.loading=false;
      }

    },

    reload(){
      this.currentPage=1;
      this.fetchProjects();
    },

    changePage(page){

      if(
        page < 1 ||
        page > this.totalPages
      ) return;

      this.currentPage=page;

      this.fetchProjects();

    },

    async deleteProject(project){

      if(
        !confirm(
          `Archive ${project.name}?`
        )
      ) return;

      try{

        await api.delete(
          `/projects/${project.id}`
        );

        await this.fetchProjects();

      }
      catch(err){
        console.error(
          "Delete failed",
          err
        );
      }

    },

    shortId(id){
      return `PRO-${String(id).slice(0,6)}`;
    },

    projectLeader(project){

      const members =
        project.ProjectMembers || [];

      if(!members.length)
        return "Unassigned";

      return (
        members[0]?.name ||
        members[0]?.user?.name ||
        "Project Manager"
      );

    },

    memberCount(project){

      return (
        project.ProjectMembers?.length || 0
      );

    },

    formatDate(date){

      if(!date) return "-";

      return new Date(date)
      .toLocaleDateString();

    },

    priorityClass(priority){

      switch(priority){

        case "HIGH":
          return "badge-danger";

        case "LOW":
          return "badge-success";

        default:
          return "badge-warning";
      }

    },

    statusClass(status){

      if(
        status==="ACTIVE"
      ){
        return "badge-success";
      }

      return "badge-danger";

    }

  }

};
</script>
