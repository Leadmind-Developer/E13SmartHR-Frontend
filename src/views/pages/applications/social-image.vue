<template>
  <div v-if="post" class="card-body">

    <!-- CONTENT -->
    <div class="mb-2">
      <p class="text-dark fw-medium">
        <span v-for="(chunk, index) in parsedContent" :key="index">
          <template v-if="chunk.type === 'text'">
            {{ chunk.value }}
          </template>

          <template v-else-if="chunk.type === 'hashtag'">
            <a
              href="javascript:void(0);"
              class="text-info link-hover me-1"
              @click="searchTag(chunk.value)"
            >
              #{{ chunk.value }}
            </a>
          </template>

          <template v-else-if="chunk.type === 'mention'">
            <span class="text-primary me-1">
              @{{ chunk.value }}
            </span>
          </template>
        </span>
      </p>
    </div>

    <!-- MAIN IMAGE / FIRST MEDIA -->
    <div v-if="mainImage" class="mb-3">
      <img
        :src="mainImage"
        class="rounded img-fluid"
        alt="post-image"
        @click="openLightbox(0)"
        style="cursor: pointer;"
      />
    </div>

    <!-- LIGHTBOX -->
    <vue-easy-lightbox
      :visible="lightboxVisible"
      :imgs="fullImages"
      :index="lightboxIndex"
      @close="closeLightbox"
    />

    <!-- GALLERY -->
    <div v-if="fullImages.length > 1" class="d-flex flex-wrap gap-2 mb-3">
      <div
        v-for="(img, index) in fullImages"
        :key="index"
        @click="openLightbox(index)"
        class="gallery-thumb"
      >
        <img
          :src="img"
          class="rounded"
          style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
        />
      </div>
    </div>

    <!-- STATS -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">

      <div class="d-flex gap-3">
        <span class="text-muted">
          ❤️ {{ likesCount }} Likes
        </span>

        <span class="text-muted">
          💬 {{ commentsCount }} Comments
        </span>
      </div>

      <div class="d-flex gap-2">

        <button
          class="btn btn-sm btn-light rounded-circle"
          @click="toggleLike"
          :disabled="loading.like"
        >
          <i
            class="ti"
            :class="isLiked ? 'ti-heart-filled text-danger' : 'ti-heart'"
          ></i>
        </button>

        <button
          class="btn btn-sm btn-light rounded-circle"
          @click="focusComment"
        >
          <i class="ti ti-message-dots"></i>
        </button>

        <button
          class="btn btn-sm btn-light rounded-circle"
          @click="deletePost"
          v-if="canDelete"
        >
          <i class="ti ti-trash text-danger"></i>
        </button>

      </div>
    </div>

    <!-- COMMENT INPUT -->
    <div class="d-flex align-items-center gap-2">

      <img
        :src="currentUserAvatar"
        class="avatar avatar-rounded"
        style="width: 40px; height: 40px;"
      />

      <input
        v-model="commentText"
        ref="commentInput"
        type="text"
        class="form-control"
        placeholder="Write a comment..."
        @keyup.enter="submitComment"
      />

      <button
        class="btn btn-primary"
        @click="submitComment"
        :disabled="loading.comment || !commentText"
      >
        Post
      </button>

    </div>

  </div>
</template>

<script>
import { ref, computed } from "vue";
import api from "@/services/api";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "SocialImage",
  components: { VueEasyLightbox },

  props: {
    post: { type: Object, required: true },
    currentUser: { type: Object, default: null }
  },

  setup(props) {

    /* =========================
       STATE
    ========================== */
    const commentText = ref("");
    const commentInput = ref(null);

    const lightboxVisible = ref(false);
    const lightboxIndex = ref(0);

    const likesCount = ref(props.post.likesCount || 0);
    const commentsCount = ref(props.post.commentsCount || 0);
    const isLiked = ref(false);

    const loading = ref({
      like: false,
      comment: false,
      delete: false
    });

    /* =========================
       MEDIA
    ========================== */
    const fullImages = computed(() => {
      return (
        props.post.SocialMedia?.map((m) => m.url) || []
      );
    });

    const mainImage = computed(() => fullImages.value[0] || null);

    /* =========================
       USER
    ========================== */
    const currentUserAvatar = computed(() =>
      props.currentUser?.avatar ||
      "/src/assets/img/users/user-11.jpg"
    );

    const canDelete = computed(() =>
      props.currentUser?.id === props.post.userId
    );

    /* =========================
       CONTENT PARSER (hashtags, mentions)
    ========================== */
    const parsedContent = computed(() => {
      const content = props.post.content || "";

      const regex = /(#\w+|@\w+)/g;
      const parts = content.split(regex);

      return parts.map((part) => {
        if (part.startsWith("#")) {
          return { type: "hashtag", value: part.slice(1) };
        }
        if (part.startsWith("@")) {
          return { type: "mention", value: part.slice(1) };
        }
        return { type: "text", value: part };
      });
    });

    /* =========================
       LIGHTBOX
    ========================== */
    const openLightbox = (index) => {
      lightboxIndex.value = index;
      lightboxVisible.value = true;
    };

    const closeLightbox = () => {
      lightboxVisible.value = false;
    };

    /* =========================
       LIKE POST
    ========================== */
    const toggleLike = async () => {
      if (loading.value.like) return;

      loading.value.like = true;

      try {
        const { data } = await api.post(
          `/social/${props.post.id}/like`
        );

        if (data?.liked) {
          isLiked.value = true;
          likesCount.value++;
        }

      } catch (err) {
        console.error(err);
      } finally {
        loading.value.like = false;
      }
    };

    /* =========================
       COMMENT POST
    ========================== */
    const submitComment = async () => {
      if (!commentText.value) return;

      loading.value.comment = true;

      try {
        const { data } = await api.post(
          `/social/${props.post.id}/comment`,
          {
            content: commentText.value,
            parentId: null
          }
        );

        if (data?.success) {
          commentsCount.value++;
          commentText.value = "";
        }

      } catch (err) {
        console.error(err);
      } finally {
        loading.value.comment = false;
      }
    };

    const focusComment = () => {
      commentInput.value?.focus();
    };

    /* =========================
       DELETE POST
    ========================== */
    const deletePost = async () => {
      if (!confirm("Delete this post?")) return;

      loading.value.delete = true;

      try {
        await api.delete(`/social/${props.post.id}`);
        props.post.deleted = true;

      } catch (err) {
        console.error(err);
      } finally {
        loading.value.delete = false;
      }
    };

    /* =========================
       SEARCH HASHTAG
    ========================== */
    const searchTag = (tag) => {
      window.location.href = `/social/search?q=${tag}`;
    };

    return {
      commentText,
      commentInput,
      lightboxVisible,
      lightboxIndex,
      fullImages,
      mainImage,
      likesCount,
      commentsCount,
      isLiked,
      loading,
      parsedContent,
      currentUserAvatar,
      canDelete,

      openLightbox,
      closeLightbox,
      toggleLike,
      submitComment,
      focusComment,
      deletePost,
      searchTag
    };
  }
};
</script>

<style scoped>
.gallery-thumb {
  transition: transform 0.2s ease;
}
.gallery-thumb:hover {
  transform: scale(1.05);
}
</style>
