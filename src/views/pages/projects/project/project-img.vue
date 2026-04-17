<template>
  <div class="project-gallery">

    <!-- =========================
        HEADER / ACTIONS
    ========================== -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0">Project Media</h6>

      <label class="btn btn-primary btn-sm mb-0">
        <i class="ti ti-upload me-1"></i>
        Upload
        <input
          type="file"
          class="d-none"
          multiple
          @change="handleUpload"
        />
      </label>
    </div>

    <!-- =========================
        LOADING
    ========================== -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <!-- =========================
        EMPTY STATE
    ========================== -->
    <div v-else-if="!images.length" class="text-center py-5 text-muted">
      <i class="ti ti-photo-off fs-1"></i>
      <p class="mt-2 mb-0">No images uploaded yet</p>
    </div>

    <!-- =========================
        CAROUSEL
    ========================== -->
    <Carousel
      v-else
      :itemsToShow="6"
      :wrapAround="true"
      :transition="300"
      :breakpoints="breakpoints"
    >
      <Slide v-for="(image, index) in images" :key="image.id">
        <div class="gallery-item" @click="openLightbox(index)">
          <img
            :src="image.url"
            class="rounded img-fluid"
            :alt="image.name || 'Project image'"
          />

          <!-- Hover Actions -->
          <div class="hover-links">

            <span class="action-btn" @click.stop="openLightbox(index)">
              <i class="ti ti-maximize"></i>
            </span>

            <a
              :href="image.url"
              target="_blank"
              class="action-btn"
              @click.stop
            >
              <i class="ti ti-link"></i>
            </a>

            <span
              class="action-btn text-danger"
              @click.stop="deleteImage(image)"
            >
              <i class="ti ti-trash"></i>
            </span>

          </div>
        </div>
      </Slide>
    </Carousel>

    <!-- =========================
        LIGHTBOX
    ========================== -->
    <VueEasyLightbox
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import VueEasyLightbox from "vue-easy-lightbox";
import api from "@/services/api";
import { useRoute } from "vue-router";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const route = useRoute();
const projectId = route.params.id;

const images = ref([]);
const loading = ref(false);

const lightboxVisible = ref(false);
const lightboxIndex = ref(0);

/*
|--------------------------------------------------------------------------
| RESPONSIVE
|--------------------------------------------------------------------------
*/

const breakpoints = {
  320: { itemsToShow: 2 },
  768: { itemsToShow: 3 },
  1024: { itemsToShow: 4 },
  1400: { itemsToShow: 6 },
};

/*
|--------------------------------------------------------------------------
| COMPUTED
|--------------------------------------------------------------------------
*/

const lightboxImages = computed(() =>
  images.value.map((img) => img.url)
);

/*
|--------------------------------------------------------------------------
| FETCH IMAGES
|--------------------------------------------------------------------------
*/

const fetchImages = async () => {
  loading.value = true;

  try {
    const { data } = await api.get(`/projects/${projectId}`);

    /*
    |--------------------------------------------------------------------------
    | EXPECTED BACKEND STRUCTURE
    |--------------------------------------------------------------------------
    | project.ProjectFiles OR task.TaskFiles
    */

    const files =
      data?.data?.ProjectFiles ||
      [];

    images.value = files.map((file) => ({
      id: file.id,
      url: file.url,
      publicId: file.publicId,
      name: file.name,
    }));

  } catch (err) {
    console.error("Failed to fetch images:", err);
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| LIGHTBOX
|--------------------------------------------------------------------------
*/

const openLightbox = (index) => {
  lightboxIndex.value = index;
  lightboxVisible.value = true;
};

/*
|--------------------------------------------------------------------------
| UPLOAD
|--------------------------------------------------------------------------
*/

const handleUpload = async (event) => {
  const files = event.target.files;

  if (!files.length) return;

  try {
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      /*
      |--------------------------------------------------------------------------
      | ⚠️ You currently ONLY support TASK upload
      | Add project upload endpoint OR reuse task endpoint
      |--------------------------------------------------------------------------
      */

      await api.post(
        `/projects/tasks/${projectId}/files`, // adjust if needed
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    }

    await fetchImages();

  } catch (err) {
    console.error("Upload failed:", err);
  }
};

/*
|--------------------------------------------------------------------------
| DELETE IMAGE
|--------------------------------------------------------------------------
*/

const deleteImage = async (image) => {
  if (!confirm("Delete this image?")) return;

  try {
    /*
    |--------------------------------------------------------------------------
    | ⚠️ BACKEND MISSING:
    | You need DELETE endpoint:
    | DELETE /tasks/files/:id
    |--------------------------------------------------------------------------
    */

    await api.delete(`/tasks/files/${image.id}`);

    images.value = images.value.filter(
      (img) => img.id !== image.id
    );

  } catch (err) {
    console.error("Delete failed:", err);
  }
};

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/

onMounted(fetchImages);
</script>

<style scoped>
.project-gallery {
  position: relative;
}

/* =========================
   GALLERY ITEM
========================= */
.gallery-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

/* =========================
   HOVER ACTIONS
========================= */
.hover-links {
  position: absolute;
  inset: 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  opacity: 0;
  transition: 0.3s;
}

.gallery-item:hover .hover-links {
  opacity: 1;
}

/* =========================
   ACTION BUTTON
========================= */
.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.action-btn:hover {
  transform: scale(1.1);
}
</style>
