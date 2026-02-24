<template>
   <layout-header />
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper cardhead">
    <!-- Start Content -->
    <div class="content container-fluid">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Vector Map</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center">
              <router-link to="/dashboard/"
                ><i class="ti ti-home me-1"></i>Home</router-link
              >
            </li>
            <li class="breadcrumb-item d-flex align-items-center">
              <a href="javascript:void(0);">Icons</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Vector Map</li>
          </ol>
        </nav>
      </div>
      <!-- /Page Header -->

      <!-- Map Section -->
      <div class="row">
        <div class="col-xl-12">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">Basic Vector Map (Leaflet)</div>
            </div>
            <div class="card-body">
              <!-- Map Container -->
              <div id="map" style="height: 500px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Content -->
     <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
  </div>

  <!-- ========================
End Page Content
========================= -->
</template>
<script>
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "App",
  setup() {
    let map = null;

    // Map Data
    const mapData = {
      London: {
        lat: 51.505,
        lng: -0.09,
        popupText: "This is London",
      },
      NewYork: {
        lat: 40.7128,
        lng: -74.006,
        popupText: "This is New York",
      },
      Tokyo: {
        lat: 35.6762,
        lng: 139.6503,
        popupText: "This is Tokyo",
      },
    };

    onMounted(() => {
      // Initialize the map
      map = L.map("map").setView([51.505, -0.09], 2); // Default to London and zoom level 2

      // Add a tile layer (you can replace this with other providers like Mapbox, etc.)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      // Add markers using the mapData
      for (const key in mapData) {
        const { lat, lng, popupText } = mapData[key];
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(popupText || key);
      }
    });

    onBeforeUnmount(() => {
      // Clean up map instance when component is destroyed
      if (map) {
        map.remove();
      }
    });

    return {
      title: "Home",
      text: "Vector Maps",
      text1: "Maps",
    };
  },
};
</script>
