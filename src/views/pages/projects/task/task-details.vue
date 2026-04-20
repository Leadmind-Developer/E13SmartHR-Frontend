<template>
<div>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- CONTENT -->
      <template v-else-if="task">

        <!-- Header -->
        <div class="row align-items-center mb-4">

          <div class="d-md-flex justify-content-between align-items-center">

            <h6 class="mb-0">
              <router-link to="/projects/tasks">
                <i class="ti ti-arrow-left me-2"></i>
                Back to Tasks
              </router-link>
            </h6>

            <div class="d-flex gap-2">

              <select
                class="form-select"
                v-model="task.status"
                @change="updateStatus"
              >
                <option value="Todo">Todo</option>
                <option value="Inprogress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

          </div>

        </div>

        <div class="row">

          <!-- LEFT -->
          <div class="col-xl-8">

            <!-- Task Card -->
            <div class="card">
              <div class="card-body">

                <div class="d-flex justify-content-between mb-4">

                  <div>
                    <h4>
                      {{ task.title || task.name }}
                    </h4>

                    <span
                      class="badge"
                      :class="priorityBadge(task.priority)"
                    >
                      {{ task.priority || 'Normal' }}
                    </span>

                  </div>

                  <span
                    class="badge"
                    :class="statusBadge(task.status)"
                  >
                    {{ task.status }}
                  </span>

                </div>

                <div class="mb-4">
                  <h6>Description</h6>

                  <p class="mb-0">
                    {{ task.description || 'No description' }}
                  </p>
                </div>

                <!-- Assignees -->
                <div class="mb-4">
                  <h6>Assigned Users</h6>

                  <div class="d-flex flex-wrap gap-2">

                    <div
                      v-for="assignee in task.TaskAssignments || []"
                      :key="assignee.id"
                      class="badge bg-light text-dark p-2"
                    >
                      User #{{ assignee.userId }}
                    </div>

                    <div
                      v-if="!task.TaskAssignments?.length"
                      class="text-muted"
                    >
                      No assignees
                    </div>

                  </div>

                </div>

              </div>
            </div>


            <!-- FILES -->
            <div class="card">
              <div class="card-body">

                <div class="d-flex justify-content-between mb-3">
                  <h5>Files</h5>

                  <label class="btn btn-primary btn-sm mb-0">
                    Upload
                    <input
                      hidden
                      type="file"
                      multiple
                      @change="uploadFiles"
                    />
                  </label>

                </div>

                <div v-if="!task.TaskFiles?.length" class="text-muted">
                  No files uploaded
                </div>

                <Carousel
                  v-else
                  :itemsToShow="3"
                  :wrapAround="true"
                >

                  <Slide
                    v-for="file in task.TaskFiles"
                    :key="file.id"
                  >

                    <div class="card shadow-none border m-2">
                      <div class="card-body">

                        <div class="d-flex justify-content-between">

                          <div>
                            <h6 class="mb-1">
                              {{ file.name || 'Attachment' }}
                            </h6>

                            <small>
                              {{ file.createdAt | formatDate }}
                            </small>
                          </div>

                          <a
                            :href="file.url"
                            target="_blank"
                            class="btn btn-sm btn-icon"
                          >
                            <i class="ti ti-download"></i>
                          </a>

                        </div>

                      </div>
                    </div>

                  </Slide>

                </Carousel>

              </div>
            </div>


            <!-- COMMENTS -->
            <div class="card">
              <div class="card-body">

                <h5 class="mb-4">
                  Comments
                </h5>

                <div
                  v-if="!task.TaskComments?.length"
                  class="text-muted mb-4"
                >
                  No comments yet
                </div>

                <div
                  v-for="comment in task.TaskComments"
                  :key="comment.id"
                  class="border-bottom pb-3 mb-3"
                >
                  <strong>
                    User #{{ comment.userId }}
                  </strong>

                  <p class="mb-1">
                    {{ comment.message }}
                  </p>

                  <small>
                    {{ comment.createdAt | formatDate }}
                  </small>
                </div>


                <div class="mt-4">

                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="newComment"
                    placeholder="Add comment..."
                  ></textarea>

                  <button
                    class="btn btn-primary mt-3"
                    @click="addComment"
                    :disabled="commentSubmitting"
                  >
                    Add Comment
                  </button>

                </div>

              </div>
            </div>

          </div>


          <!-- RIGHT SIDEBAR -->
          <div class="col-xl-4">

            <div class="card">
              <div class="card-body p-0">

                <div class="border-bottom p-3 d-flex justify-content-between">
                  <span>Project</span>
                  <strong>
                    {{ task.Project?.name || '-' }}
                  </strong>
                </div>

                <div class="border-bottom p-3 d-flex justify-content-between">
                  <span>Created</span>
                  <strong>
                    {{ task.createdAt | formatDate }}
                  </strong>
                </div>

                <div class="border-bottom p-3 d-flex justify-content-between">
                  <span>Due Date</span>
                  <strong>
                    {{ task.dueDate | formatDate }}
                  </strong>
                </div>

              </div>
            </div>

          </div>

        </div>

      </template>

    </div>
  </div>

</div>
</template>

<script>
import api from "@/services/api";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {

components: {
  Carousel,
  Slide,
},

data() {
  return {
    loading: false,
    error: null,

    task: null,

    newComment: "",

    commentSubmitting: false,
  };
},

async mounted() {
  await this.fetchTask();
},

methods: {

  async fetchTask() {
    this.loading = true;

    try {

      const taskId =
        this.$route.params.taskId ||
        this.$route.params.id;

      const res = await api.get(
        `/projects/tasks/${taskId}`
      );

      this.task = res.data.data;

    } catch (e) {

      console.error(e);

      this.error =
        e?.response?.data?.message ||
        "Failed to load task";

    } finally {

      this.loading = false;

    }
  },



  async updateStatus() {

    try {

      await api.patch(
        `/projects/tasks/${this.task.id}/status`,
        {
          status: this.task.status
        }
      );

    } catch (e) {

      console.error(e);

    }

  },



  async addComment() {

    if (!this.newComment.trim()) {
      return;
    }

    this.commentSubmitting = true;

    try {

      await api.post(
        `/projects/tasks/${this.task.id}/comments`,
        {
          message: this.newComment
        }
      );

      this.newComment = "";

      await this.fetchTask();

    } catch (e) {

      console.error(e);

    } finally {

      this.commentSubmitting = false;

    }

  },



  async uploadFiles(event) {

    const files = event.target.files;

    if (!files.length) return;

    try {

      for (const file of files) {

        const formData = new FormData();

        formData.append(
          "file",
          file
        );

        await api.post(
          `/projects/tasks/${this.task.id}/files`,
          formData
        );

      }

      await this.fetchTask();

    } catch (e) {

      console.error(e);

    }

  },



  priorityBadge(priority) {

    if (priority === "High") {
      return "badge-danger";
    }

    if (priority === "Medium") {
      return "badge-warning";
    }

    return "badge-secondary";
  },



  statusBadge(status) {

    if (status === "Completed") {
      return "badge-success";
    }

    if (status === "Inprogress") {
      return "badge-purple";
    }

    return "badge-secondary";
  }

},

filters: {

  formatDate(v) {

    if (!v) return "-";

    return new Date(v)
      .toLocaleDateString();

  }

}

};
</script>

<style scoped>
.badge-purple{
background:#6f42c1;
color:white;
}
</style>
