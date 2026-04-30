<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <div class="row">

        <!-- LEFT SIDEBAR -->
        <div class="col-xl-3 theiaStickySidebar">
          <div class="stickysidebar">

            <div class="card">
              <div class="card-body">

                <!-- Profile Summary -->
                <div class="bg-light rounded p-3 mb-4 text-center">
                  <img
                    class="avatar avatar-xl avatar-rounded mb-2"
                    :src="userAvatar"
                    alt="User"
                  />
                  <h5 class="mb-0">{{ user?.name }}</h5>
                  <p class="fs-12 text-muted">@{{ user?.username }}</p>

                  <div class="row g-1 mt-3">
                    <div class="col-4">
                      <div class="bg-white rounded py-2">
                        <h6 class="mb-0">{{ stats.followers }}</h6>
                        <small>Followers</small>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="bg-white rounded py-2">
                        <h6 class="mb-0">{{ stats.following }}</h6>
                        <small>Following</small>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="bg-white rounded py-2">
                        <h6 class="mb-0">{{ stats.posts }}</h6>
                        <small>Posts</small>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Create Post Button -->
                <button class="btn btn-primary w-100 mb-3" @click="focusComposer">
                  <i class="ti ti-circle-plus me-2"></i>Create Post
                </button>

                <!-- Navigation -->
                <div class="files-list">
                  <a class="active d-flex justify-content-between p-2">
                    <span>All Feeds</span>
                    <span class="badge bg-danger">{{ posts.length }}</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- MAIN FEED -->
        <div class="col-xl-6">

          <!-- CREATE POST -->
          <div class="card mb-3">
            <div class="card-body">

              <textarea
                ref="composer"
                v-model="newPost.content"
                class="form-control mb-2"
                rows="3"
                placeholder="What's on your mind?"
              ></textarea>

              <input type="file" multiple @change="handleFiles" class="form-control mb-2"/>

              <div class="d-flex justify-content-between">
                <button class="btn btn-light btn-sm" @click="resetComposer">
                  Clear
                </button>

                <button class="btn btn-primary btn-sm" @click="createPost" :disabled="loadingCreate">
                  <i class="ti ti-send me-1"></i>
                  {{ loadingCreate ? "Posting..." : "Post" }}
                </button>
              </div>

            </div>
          </div>

          <!-- FEED LIST -->
          <div v-for="post in posts" :key="post.id" class="card mb-3">

            <!-- HEADER -->
            <div class="card-header border-0 pb-0 d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <img :src="post.user?.avatar || userAvatar" class="avatar avatar-rounded me-2" />
                <div>
                  <h6 class="mb-0">{{ post.user?.name || "Unknown" }}</h6>
                  <small class="text-muted">@{{ post.user?.username }}</small>
                </div>
              </div>

              <div class="dropdown">
                <a data-bs-toggle="dropdown">
                  <i class="ti ti-dots-vertical"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" @click="deletePost(post.id)">Delete</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- BODY -->
            <div class="card-body">

              <p class="mb-2">{{ post.content }}</p>

              <!-- MEDIA -->
              <div v-if="post.media?.length" class="mb-2">
                <img
                  v-for="m in post.media"
                  :key="m.id"
                  :src="m.url"
                  class="img-fluid rounded mb-2"
                />
              </div>

              <!-- ACTIONS -->
              <div class="d-flex justify-content-between align-items-center">

                <div>
                  <button class="btn btn-sm btn-light me-2" @click="likePost(post)">
                    ❤️ {{ post.likesCount || 0 }}
                  </button>

                  <span class="text-muted me-2">
                    💬 {{ post.commentsCount || 0 }}
                  </span>
                </div>

              </div>

              <!-- COMMENT BOX -->
              <div class="mt-3 d-flex">
                <input
                  v-model="commentMap[post.id]"
                  class="form-control form-control-sm me-2"
                  placeholder="Write comment..."
                />
                <button class="btn btn-sm btn-primary" @click="commentPost(post)">
                  Send
                </button>
              </div>

              <!-- COMMENTS -->
              <div class="mt-3" v-if="post.comments?.length">
                <div
                  v-for="c in post.comments"
                  :key="c.id"
                  class="bg-light rounded p-2 mb-2"
                >
                  <strong>{{ c.user?.name }}</strong>
                  <p class="mb-0">{{ c.content }}</p>
                </div>
              </div>

            </div>
          </div>

          <!-- LOAD MORE -->
          <div class="text-center my-3">
            <button class="btn btn-outline-primary" @click="loadMore" :disabled="loading">
              Load More
            </button>
          </div>

        </div>

        <!-- RIGHT SIDEBAR (kept static UI, optional backend integration later) -->
        <div class="col-xl-3 theiaStickySidebar">
          <div class="stickysidebar">

            <div class="card">
              <div class="card-body">
                <h5>Trending</h5>
                <div class="d-flex flex-wrap gap-1">
                  <span class="badge bg-info">#Health</span>
                  <span class="badge bg-info">#Tech</span>
                  <span class="badge bg-info">#AI</span>
                </div>
              </div>
            </div>

          </div>
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
      user: null,
      posts: [],
      page: 1,
      loading: false,
      loadingCreate: false,

      newPost: {
        content: "",
        files: []
      },

      commentMap: {},

      stats: {
        followers: 0,
        following: 0,
        posts: 0
      }
    };
  },

  computed: {
    userAvatar() {
      return this.user?.avatar || require("@/assets/img/users/user-11.jpg");
    }
  },

  async mounted() {
    await this.fetchFeed();
  },

  methods: {

    focusComposer() {
      this.$refs.composer?.focus();
    },

    handleFiles(e) {
      this.newPost.files = Array.from(e.target.files);
    },

    resetComposer() {
      this.newPost.content = "";
      this.newPost.files = [];
    },

    async fetchFeed() {
      this.loading = true;

      try {
        const res = await api.get(`/social/feed?page=${this.page}&limit=10`);
        this.posts.push(...res.data.data);
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      this.page++;
      await this.fetchFeed();
    },

    async createPost() {
      if (!this.newPost.content) return;

      this.loadingCreate = true;

      try {
        const formData = new FormData();
        formData.append("content", this.newPost.content);

        this.newPost.files.forEach(file => {
          formData.append("files", file);
        });

        const res = await api.post("/social", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        this.posts.unshift(res.data.data);
        this.resetComposer();

      } finally {
        this.loadingCreate = false;
      }
    },

    async likePost(post) {
      await api.post(`/social/${post.id}/like`);
      post.likesCount = (post.likesCount || 0) + 1;
    },

    async commentPost(post) {
      const content = this.commentMap[post.id];
      if (!content) return;

      const res = await api.post(`/social/${post.id}/comment`, {
        content
      });

      post.comments.unshift(res.data.data);
      post.commentsCount++;

      this.commentMap[post.id] = "";
    },

    async deletePost(postId) {
      await api.delete(`/social/${postId}`);
      this.posts = this.posts.filter(p => p.id !== postId);
    }
  }
};
</script>
