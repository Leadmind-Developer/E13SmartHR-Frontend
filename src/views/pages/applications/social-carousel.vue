<template>
  <div class="card social-carousel-card">
    <div class="card-body">

      <!-- Header -->
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="mb-0">Trending Posts</h5>

        <button
          class="btn btn-sm btn-light"
          @click="fetchFeed"
          :disabled="loading"
        >
          Refresh
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        <span class="spinner-border spinner-border-sm"></span>
        <p class="mt-2 mb-0">Loading feed...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!items.length" class="text-center py-4 text-muted">
        No posts available yet
      </div>

      <!-- Carousel -->
      <div v-else class="channels-slider">
        <Carousel
          :wrap-around="true"
          :items-to-show="1"
          :breakpoints="breakpoints"
          snap-align="center"
        >
          <Slide v-for="post in items" :key="post.id">
            <div class="social-card">

              <!-- Media -->
              <div class="social-media">
                <img
                  v-if="getPrimaryImage(post)"
                  :src="getPrimaryImage(post)"
                  class="social-img"
                  alt="post media"
                />
                <div v-else class="no-media">
                  <i class="feather-image"></i>
                </div>
              </div>

              <!-- Content -->
              <div class="social-content">
                <p class="text-truncate mb-1">
                  {{ post.content || "No content" }}
                </p>

                <!-- Hashtags -->
                <div v-if="post.hashtags?.length" class="hashtags">
                  <span
                    v-for="tag in post.hashtags.slice(0, 3)"
                    :key="tag"
                    class="badge bg-light text-dark me-1"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <!-- Stats -->
                <div class="d-flex justify-content-between mt-2 small text-muted">
                  <span>❤️ {{ post.likesCount || 0 }}</span>
                  <span>💬 {{ post.commentsCount || 0 }}</span>
                </div>
              </div>

            </div>
          </Slide>

        </Carousel>
      </div>

    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import api from "@/services/api";

export default {
  name: "SocialCarousel",

  components: {
    Carousel,
    Slide,
    Navigation,
  },

  data() {
    return {
      items: [],
      loading: false,

      breakpoints: {
        576: { itemsToShow: 2, snapAlign: "center" },
        768: { itemsToShow: 3, snapAlign: "center" },
        992: { itemsToShow: 4, snapAlign: "center" },
        1200: { itemsToShow: 5, snapAlign: "start" },
      },
    };
  },

  mounted() {
    this.fetchFeed();
  },

  methods: {
    /**
     * Fetch approved social feed
     */
    async fetchFeed() {
      this.loading = true;

      try {
        const { data } = await api.get("/social/feed", {
          params: {
            page: 1,
            limit: 12,
          },
        });

        this.items = data?.data || [];
      } catch (err) {
        console.error("Feed load failed:", err);
        this.items = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Get first valid media image from post
     */
    getPrimaryImage(post) {
      if (!post?.SocialMedia?.length) return null;

      const media = post.SocialMedia.find(
        (m) => m.type === "IMAGE" && m.url
      );

      return media?.url || null;
    },
  },
};
</script>

<style scoped>
.social-carousel-card {
  border-radius: 12px;
}

.social-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eee;
  margin: 6px;
  transition: all 0.2s ease;
}

.social-card:hover {
  transform: translateY(-2px);
}

.social-media {
  width: 100%;
  height: 140px;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-media {
  font-size: 24px;
  color: #aaa;
}

.social-content {
  padding: 10px;
}

.hashtags {
  margin-top: 6px;
}
</style>
