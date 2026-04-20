<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <breadcrumb :title="title" :text="text" :text1="text1" />

        <div class="d-flex align-items-center gap-2">
          <router-link to="/projects/clients" class="btn btn-icon btn-sm">
            <i class="ti ti-list-tree"></i>
          </router-link>

          <router-link to="/projects/clients-grid" class="btn btn-primary btn-icon btn-sm">
            <i class="ti ti-layout-grid"></i>
          </router-link>

          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_client">
            <i class="ti ti-plus me-1"></i> Add Client
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row mb-3">
        <div v-for="s in stats" :key="s.label" class="col-xl-3 col-md-6">
          <div class="card">
            <div class="card-body d-flex justify-content-between">
              <div>
                <p class="mb-1">{{ s.label }}</p>
                <h4>{{ s.value }}</h4>
              </div>
              <span :class="s.badgeClass">{{ s.percent }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div class="row">
        <div v-for="client in clients" :key="client.id" class="col-xl-3 col-lg-4 col-md-6">
          <div class="card">

            <div class="card-body">

              <!-- Top -->
              <div class="d-flex justify-content-between mb-2">
                <input type="checkbox" />

                <router-link :to="client.link" class="avatar avatar-xl">
                  <img :src="img(client.avatar)" />
                </router-link>

                <div class="dropdown">
                  <i class="ti ti-dots-vertical" data-bs-toggle="dropdown"></i>
                  <ul class="dropdown-menu dropdown-menu-end p-2">
                    <li><a class="dropdown-item">Edit</a></li>
                    <li><a class="dropdown-item">Delete</a></li>
                  </ul>
                </div>
              </div>

              <!-- Name -->
              <div class="text-center mb-3">
                <h6>{{ client.name }}</h6>
                <span class="badge bg-light">{{ client.role }}</span>
              </div>

              <!-- Project -->
              <p class="text-truncate mb-1">{{ client.project }}</p>

              <div class="progress mb-2">
                <div class="progress-bar" :style="{ width: client.progress + '%' }"></div>
              </div>

              <!-- Footer -->
              <div class="d-flex justify-content-between">
                <div class="avatar-list-stacked">
                  <span
                    v-for="(u, i) in client.team"
                    :key="i"
                    class="avatar"
                  >
                    <img :src="img(u)" />
                  </span>
                </div>

                <span>{{ client.progress }}%</span>
              </div>

              <hr />

              <div class="d-flex justify-content-between">
                <div>
                  <small>Company</small>
                  <p class="mb-0">{{ client.company }}</p>
                </div>

                <div>
                  <i class="ti ti-message me-2"></i>
                  <i class="ti ti-phone"></i>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

    <footer class="p-3 border-top text-center">
      {{ new Date().getFullYear() }} © SmartHR
    </footer>

  </div>

  <clients-list-modal />
</template>

<script>
export default {
  data() {
    return {
      title: "Clients",
      text: "Projects",
      text1: "Client Grid",

      stats: [
        { label: "Total Clients", value: 300, percent: "+19%", badgeClass: "text-success" },
        { label: "Active Clients", value: 270, percent: "+19%", badgeClass: "text-primary" },
        { label: "Inactive Clients", value: 30, percent: "+19%", badgeClass: "text-danger" },
        { label: "New Clients", value: 45, percent: "+19%", badgeClass: "text-info" },
      ],

      clients: [
        {
          id: 1,
          name: "Michael Walker",
          role: "CEO",
          project: "Office Management App",
          progress: 60,
          company: "BrightWave Innovations",
          avatar: "user-39.jpg",
          team: ["user-01.jpg", "user-02.jpg", "user-03.jpg"],
          link: "/projects/clients-details",
        },
        {
          id: 2,
          name: "Sophie Headrick",
          role: "Manager",
          project: "Clinic Management",
          progress: 40,
          company: "Stellar Dynamics",
          avatar: "user-40.jpg",
          team: ["user-04.jpg", "user-05.jpg"],
          link: "/projects/clients-details",
        },
      ],
    };
  },

  methods: {
    img(name) {
      return new URL(`/src/assets/img/users/${name}`, import.meta.url).href;
    },

    toggleHeader() {
      document.body.classList.toggle("header-collapse");
    },
  },
};
</script>
