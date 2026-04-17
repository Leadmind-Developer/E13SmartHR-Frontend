<template>
  <div class="project-images">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">Project Media</h5>

      <label class="btn btn-primary btn-sm mb-0">
        <i class="ti ti-upload me-1"></i>
        Upload
        <input type="file" hidden multiple @change="handleUpload" />
      </label>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="!images.length" class="text-center py-5 text-muted">
      <i class="ti ti-photo-off fs-2 d-block mb-2"></i>
      No images yet
    </div>

    <!-- Carousel -->
    <Carousel
      v-else
      :itemsToShow="6"
      :wrapAround="true"
      :transition="300"
      :breakpoints="breakpoints"
    >
      <Slide v-for="(image, index) in images" :key="image.id">
        <div class="gallery-item">
          <img
            :src="image.url"
            class="rounded"
            :alt="image.name || 'Project image'"
            @click="openLightbox(index)"
          />

          <!-- Hover Actions -->
          <div class="hover-links">
            <span
              class="avatar avatar-md avatar-rounded"
              @click.stop="openLightbox(index)"
            >
              <i class="ti ti-maximize"></i>
            </span>

            <a
              :href="image.url"
              target="_blank"
              class="avatar avatar-md avatar-rounded"
              @click.stop
            >
              <i class="ti ti-link"></i>
            </a>

            <span
              class="avatar avatar-md avatar-rounded text-danger"
              @click.stop="deleteImage(image)"
            >
              <i class="ti ti-trash"></i>
            </span>
          </div>
        </div>
      </Slide>
    </Carousel>

    <!-- Lightbox -->
    <VueEasyLightbox
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import VueEasyLightbox from "vue-easy-lightbox";
import api from "@/services/api";

export default {
  name: "ProjectImages",

  components: {
    Carousel,
    Slide,
    VueEasyLightbox,
  },

  props: {
    projectId: {
      type: [String, Number],
      required: true,
    },

    // Optional: if you want task-based uploads
    taskId: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      images: [],

      lightboxVisible: false,
      lightboxIndex: 0,

      breakpoints: {
        320: { itemsToShow: 2 },
        640: { itemsToShow: 3 },
        1024: { itemsToShow: 5 },
        1280: { itemsToShow: 6 },
      },
    };
  },

  computed: {
    lightboxImages() {
      return this.images.map((img) => img.url);
    },
  },

  mounted() {
    this.fetchImages();
  },

  methods: {
    /*
    |--------------------------------------------------------------------------
    | FETCH IMAGES
    |--------------------------------------------------------------------------
    */
    async fetchImages() {
      this.loading = true;

      try {
        const { data } = await api.get(`/projects/${this.projectId}`);

        // Expecting ProjectFiles from backend
        const files = data?.data?.ProjectFiles || [];

        this.images = files.map((file) => ({
          id: file.id,
          url: file.url,
          name: file.name,
          publicId: file.publicId,
        }));
      } catch (err) {
        console.error("Failed to load images:", err);
      } finally {
        this.loading = false;
      }
    },

    /*
    |--------------------------------------------------------------------------
    | UPLOAD
    |--------------------------------------------------------------------------
    */
    async handleUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          // Use task endpoint (current backend)
          if (this.taskId) {
            await api.post(
              `/projects/tasks/${this.taskId}/files`,
              formData
            );
          } else {
            // FUTURE (recommended)
            await api.post(
              `/projects/${this.projectId}/files`,
              formData
            );
          }
        }

        await this.fetchImages();
      } catch (err) {
        console.error("Upload failed:", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | DELETE IMAGE
    |--------------------------------------------------------------------------
    */
    async deleteImage(image) {
      if (!confirm("Delete this image?")) return;

      try {
        // ⚠️ Backend endpoint not implemented yet
        await api.delete(`/projects/files/${image.id}`);

        this.images = this.images.filter((img) => img.id !== image.id);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    },

    /*
    |--------------------------------------------------------------------------
    | LIGHTBOX
    |--------------------------------------------------------------------------
    */
    openLightbox(index) {
      this.lightboxIndex = index;
      this.lightboxVisible = true;
    },
  },
};
</script>

<style scoped>
.project-images {
  position: relative;
}

.gallery-item {
  position: relative;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

/* Hover overlay */
.hover-links {
  position: absolute;
  inset: 0;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: 0.3s ease;
}

.gallery-item:hover .hover-links {
  opacity: 1;
}

.avatar {
  background: #fff;
  cursor: pointer;
}
</style>
