<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      modules: {
        Todo: {
          DotBgClass: "bg-transparent-purple",
          DotClass: "bg-purple",
          Title: "To Do",
          Count: "02",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Urgent",
              BadgeClass: "badge bg-danger",
              Title: "Payment Gatway",
              ProgressClass: "bg-warning",
              Width: "40%",
              DueOn: "18 Apr 2024",
              Img: "avatar-19.jpg",
              Img1: "avatar-29.jpg",
              Img2: "avatar-16.jpg",
              Img3: "avatar-01.jpg",
              Img4: "avatar-02.jpg",
            },
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Medium",
              BadgeClass: "badge bg-warning",
              Title: "Patient appointment booking",
              ProgressClass: "bg-danger",
              Width: "20%",
              DueOn: "15 Apr 2024",
              Img: "avatar-01.jpg",
              Img1: "avatar-02.jpg",
              Img2: "avatar-03.jpg",
              Img3: "avatar-04.jpg",
              Img4: "avatar-05.jpg",
            },
          ],
        },
        Pending: {
          DotBgClass: "bg-soft-pink",
          DotClass: "bg-pink",
          Title: "Pending",
          Count: "13",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Low",
              BadgeClass: "badge bg-success",
              Title: "Patient appointment booking",
              ProgressClass: "bg-danger",
              Width: "20%",
              DueOn: "15 Apr 2024",
              Img: "avatar-19.jpg",
              Img1: "avatar-29.jpg",
              Img2: "avatar-16.jpg",
              Img3: "avatar-01.jpg",
              Img4: "avatar-02.jpg",
            },
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Urgent",
              BadgeClass: "badge bg-danger",
              Title: "Payment Gateway",
              ProgressClass: "bg-warning",
              Width: "40%",
              DueOn: "15 Apr 2024",
              Img: "avatar-10.jpg",
              Img1: "avatar-11.jpg",
              Img2: "avatar-12.jpg",
              Img3: "avatar-13.jpg",
              Img4: "avatar-14.jpg",
            },
          ],
        },
        Inprogress: {
          DotBgClass: "bg-soft-skyblue",
          DotClass: "bg-skyblue",
          Title: "Inprogress",
          Count: "04",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Urgent",
              BadgeClass: "badge bg-danger",
              Title: "Doctor Module",
              ProgressClass: "bg-warning",
              Width: "35%",
              DueOn: "20 Apr 2024",
              Img: "avatar-15.jpg",
              Img1: "avatar-16.jpg",
              Img2: "avatar-17.jpg",
              Img3: "avatar-18.jpg",
              Img4: "avatar-19.jpg",
            },
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Low",
              BadgeClass: "badge bg-success",
              Title: "Inventory and Supplies",
              ProgressClass: "bg-purple",
              Width: "60%",
              DueOn: "21 Apr 2024",
              Img: "avatar-20.jpg",
              Img1: "avatar-21.jpg",
              Img2: "avatar-22.jpg",
              Img3: "avatar-23.jpg",
              Img4: "avatar-24.jpg",
            },
          ],
        },
        Completed: {
          DotBgClass: "bg-soft-success",
          DotClass: "bg-success",
          Title: "Completed",
          Count: "10",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Medium",
              BadgeClass: "badge bg-warning",
              Title: "Billing and Payments",
              ProgressClass: "bg-success",
              Width: "100%",
              DueOn: "22 Apr 2024",
              Img: "avatar-25.jpg",
              Img1: "avatar-26.jpg",
              Img2: "avatar-27.jpg",
              Img3: "avatar-28.jpg",
              Img4: "avatar-29.jpg",
            },
          ],
        },
        OnHold: {
          DotBgClass: "bg-soft-warning",
          DotClass: "bg-warning",
          Title: "On-hold",
          Count: "10",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Urgent",
              BadgeClass: "badge bg-danger",
              Title: "Patient Feedback",
              ProgressClass: "bg-danger",
              Width: "15%",
              DueOn: "22 Apr 2024",
              Img: "avatar-30.jpg",
              Img1: "avatar-31.jpg",
              Img2: "avatar-05.jpg",
              Img3: "avatar-09.jpg",
              Img4: "avatar-11.jpg",
            },
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Low",
              BadgeClass: "badge bg-success",
              Title: "Telemedicine Implementation",
              ProgressClass: "bg-warning",
              Width: "40%",
              DueOn: "22 Apr 2024",
              Img: "avatar-30.jpg",
              Img1: "avatar-31.jpg",
              Img2: "avatar-05.jpg",
              Img3: "avatar-09.jpg",
              Img4: "avatar-11.jpg",
            },
          ],
        },
        Review: {
          DotBgClass: "bg-soft-skyblue",
          DotClass: "bg-skyblue",
          Title: "Review",
          Count: "10",
          Cards: [
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Medium",
              BadgeClass: "badge bg-warning",
              Title: "Patient Feedback",
              ProgressClass: "bg-success",
              Width: "100%",
              DueOn: "16 Apr 2024",
              Img: "avatar-30.jpg",
              Img1: "avatar-31.jpg",
              Img2: "avatar-05.jpg",
              Img3: "avatar-09.jpg",
              Img4: "avatar-11.jpg",
            },
            {
              BadgeOne: "Web Layout",
              BadgeTwo: "Urgent",
              BadgeClass: "badge bg-danger",
              Title: "Appointment Scheduling",
              ProgressClass: "bg-success",
              Width: "100%",
              DueOn: "24 Apr 2024",
              Img: "avatar-20.jpg",
              Img1: "avatar-21.jpg",
              Img2: "avatar-22.jpg",
              Img3: "avatar-23.jpg",
              Img4: "avatar-24.jpg",
            },
          ],
        },
      },
    };
  },
  methods: {
    onDragEnd() {},
    onModuleDragEnd() {},
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/profiles/${imageName}`, import.meta.url).href;
    }
  },
};
</script>

<template>
  <div class="d-flex align-items-start overflow-auto project-status pb-4">
    <div
      class="p-3 rounded bg-transparent-secondary w-100 me-3"
      v-for="(module, color) in modules"
      :key="color"
    >
      <div class="bg-white p-2 rounded mb-2">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <span class="p-1 d-flex rounded-circle me-2" :class="module.DotBgClass">
              <span class="rounded-circle d-block p-1" :class="module.DotClass"></span
            ></span>
            <h5 class="me-2">{{ module.Title }}</h5>
            <span class="badge bg-light rounded-pill">{{ module.Count }}</span>
          </div>
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i class="ti ti-dots-vertical"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li>
                <a
                  href="javascript:void(0);"
                  class="dropdown-item rounded-1"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_task"
                  ><i class="ti ti-edit me-2"></i>Edit</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  class="dropdown-item rounded-1"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_modal"
                  ><i class="ti ti-trash me-2"></i>Delete</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="kanban-drag-wrap">
        <draggable
          :list="module.Cards"
          :group="{ name: 'kanban', pull: true, put: true }"
          @end="onDragEnd(color)"
        >
          <div v-for="Card in module.Cards" :key="Card.id">
            <div class="card kanban-card mb-2">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-outline-dark me-2">{{ Card.BadgeOne }}</span>
                    <span
                      class="badge-xs d-flex align-items-center justify-content-center"
                      :class="Card.BadgeClass"
                    >
                      <i class="fas fa-circle fs-6 me-1"></i>{{ Card.BadgeTwo }}
                    </span>
                  </div>
                  <div class="dropdown">
                    <a
                      href="javascript:void(0);"
                      class="d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_task"
                          ><i class="ti ti-edit me-2"></i>Edit</a
                        >
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                          ><i class="ti ti-trash me-2"></i>Delete</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mb-2">
                  <h6 class="d-flex align-items-center">{{ Card.Title }}</h6>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <div
                    class="progress progress-sm flex-fill"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="progress-bar"
                      :class="Card.ProgressClass"
                      :style="{ width: Card.Width }"
                    ></div>
                  </div>
                  <span class="d-block ms-2 text-gray-9 fw-medium">{{ Card.Width }}</span>
                </div>
                <p class="fw-medium mb-0">
                  Due on : <span class="text-gray-9"> {{ Card.DueOn }}</span>
                </p>
                <div
                  class="d-flex align-items-center justify-content-between border-top pt-2 mt-2"
                >
                  <div class="avatar-list-stacked avatar-group-sm me-3">
                    <span class="avatar avatar-rounded">
                      <img
                        class="border border-white"
                        :src="getImageUrl(Card.Img)"
                        alt="img"
                      />
                    </span>
                    <span class="avatar avatar-rounded">
                      <img
                        class="border border-white"
                        :src="getImageUrl(Card.Img1)"
                        alt="img"
                      />
                    </span>
                    <span class="avatar avatar-rounded">
                      <img
                        class="border border-white"
                        :src="getImageUrl(Card.Img2)"
                        alt="img"
                      />
                    </span>
                    <span class="avatar avatar-rounded">
                      <img
                        class="border border-white"
                        :src="getImageUrl(Card.Img3)"
                        alt="img"
                      />
                    </span>
                    <span class="avatar avatar-rounded">
                      <img
                        class="border border-white"
                        :src="getImageUrl(Card.Img4)"
                        alt="img"
                      />
                    </span>
                    <span class="avatar avatar-rounded bg-primary fs-12"> 1+ </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center text-dark me-2"
                      ><i class="ti ti-message-circle text-gray me-1"></i>14</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center text-dark"
                      ><i class="ti ti-paperclip text-gray me-1"></i>14</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="pt-2">
        <a
          href="javascript:void(0);"
          class="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
          data-bs-toggle="modal"
          data-bs-target="#add_task"
        >
          <i class="ti ti-plus me-2"></i>
          New Task
        </a>
      </div>
    </div>
  </div>
</template>
