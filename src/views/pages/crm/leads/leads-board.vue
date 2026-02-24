<template>
  <div class="d-flex overflow-x-auto align-items-start mb-4">
    <div
      class="kanban-list-items bg-white"
      v-for="(element, color) in modules"
      :key="color"
    >
      <div class="card mb-0">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h4 class="fw-semibold d-flex align-items-center mb-1">
                <i :class="element.DotClass"></i>{{ element.title }}
              </h4>
              <span class="fw-medium text-default"
                >{{ element.leadsCount }} Leads - {{ element.revenue }}</span
              >
            </div>
            <div class="d-flex align-items-center">
              <div class="action-icon d-inline-flex">
                <a href="javascript:void(0);"><i class="ti ti-circle-plus"></i></a>
                <a
                  href="javascript:void(0);"
                  class=""
                  data-bs-toggle="modal"
                  data-bs-target="#edit_leads"
                  ><i class="ti ti-edit"></i
                ></a>
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_modal"
                  ><i class="ti ti-trash"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kanban-drag-wrap pt-4">
        <draggable
          :list="element.cards"
          :group="{ name: 'kanban', pull: true, put: true }"
          @end="onDragEnd(color)"
        >
          <div v-for="element in element.cards" :key="element.id">
            <div class="card kanban-card">
              <div class="card-body">
                <div class="d-block">
                  <div :class="element.colorclass"></div>
                  <div class="d-flex align-items-center mb-3">
                    <router-link
                      to="/crm/leads-details"
                      class="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                      ><span class="avatar-title text-dark">{{
                        element.initials
                      }}</span></router-link
                    >
                    <h6 class="fw-medium">
                      <router-link to="/crm/leads-details">{{
                        element.name
                      }}</router-link>
                    </h6>
                  </div>
                </div>
                <div class="mb-3 d-flex flex-column">
                  <p class="text-default d-inline-flex align-items-center mb-2">
                    <i class="ti ti-report-money text-dark me-1"></i>
                    {{ element.revenue }}
                  </p>
                  <p class="text-default d-inline-flex align-items-center mb-2">
                    <i class="ti ti-mail text-dark me-1"></i>
                    {{ element.email }}
                  </p>
                  <p class="text-default d-inline-flex align-items-center mb-2">
                    <i class="ti ti-phone text-dark me-1"></i>
                    {{ element.phone }}
                  </p>
                  <p class="text-default d-inline-flex align-items-center">
                    <i class="ti ti-map-pin-pin text-dark me-1"></i>
                    {{ element.location }}
                  </p>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between border-top pt-3 mt-3"
                >
                  <a
                    href="javascript:void(0);"
                    class="avatar avatar-sm avatar-rounded flex-shrink-0 me-2"
                  >
                    <img
                    :src="getImageUrl(element.companyLogo)"
                      alt="image"
                    />
                  </a>
                  <div class="icons-social d-flex align-items-center">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center justify-content-center me-2"
                      ><i class="ti ti-phone-call"></i
                    ></a>
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center justify-content-center me-2"
                      ><i class="ti ti-brand-hipchat"></i
                    ></a>
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center justify-content-center"
                      ><i class="ti ti-color-swatch"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      modules: {
        Qualify: {
          DotClass: "ti ti-circle-filled fs-8 text-warning me-2",
          title: "Contacted",
          leadsCount: "20",
          revenue: "$7,50,000",
          cards: [
            {
              initials: "SM",
              name: "Linda White",
              revenue: "$03,50,000",
              colorclass: "border-warning border border-2 mb-3",
              email: "linda@gmail.com",
              phone: "(193) 7839  748",
              location: "Austin,United States",
              companyLogo: "company-04.svg",
            },
            {
              initials: "CJ",
              name: "Chris Johnson",
              revenue: "$3,50,000",
              colorclass: "border-warning border border-2 mb-3",
              email: "chris@gmail.com",
              phone: "(162) 8920 713",
              location: "Atlanta, United States",
              companyLogo: "company-07.svg",
            },
          ],
        },
        Contact: {
          DotClass: "ti ti-circle-filled fs-8 text-purple me-2",
          title: "Not Contacted",
          leadsCount: "02",
          revenue: "$7,60,000",
          cards: [
            {
              initials: "EJ",
              name: "Emily Johnson",
              revenue: "$3,50,000",
              colorclass: "border-purple border border-2 mb-3",
              email: "emily@gmail.com",
              phone: "(179) 7382 829",
              location: "Newyork, United States",
              companyLogo: "company-06.svg",
            },
            {
              initials: "MG",
              name: "Maria Garcia",
              revenue: "$4,10,000",
              colorclass: "border-purple border border-2 mb-3",
              email: "maria@gmail.com",
              phone: "(120) 3728 039",
              location: "Derver, United States",
              companyLogo: "company-05.svg",
            },
          ],
        },
        Presentation: {
          DotClass: "ti ti-circle-filled fs-8 text-success me-2",
          title: "Closed",
          leadsCount: 45,
          revenue: "$15,44,540",
          cards: [
            {
              initials: "JS",
              name: "John Smith",
              revenue: "$3,20,000",
              colorclass: "border-success border border-2 mb-3",
              email: "john@gmail.com",
              phone: "(123) 4567 890",
              location: "Chester, United Kingdom",
              companyLogo: "company-01.svg",
            },
            {
              initials: "DL",
              name: "David Lee",
              revenue: "$3,10,000",
              colorclass: "border-success border border-2 mb-3",
              email: "david@gmail.com",
              phone: "(183) 9302 890",
              location: "Charlotte, United States",
              companyLogo: "company-08.svg",
            },
            {
              initials: "RM",
              name: "Hansen",
              revenue: "$4,50,000",
              colorclass: "border-success border border-2 mb-3",
              email: "robert@gmail.com",
              phone: "(163) 2459 315",
              location: "Bristol, United Kingdom",
              companyLogo: "company-09.svg",
            },
          ],
        },
        Proposal: {
          DotClass: "ti ti-circle-filled fs-8 text-danger me-2",
          title: "Lost",
          leadsCount: 15,
          revenue: "$14,89,543",
          cards: [
            {
              initials: "MB",
              name: "Michael Brown",
              revenue: "$4,10,000",
              colorclass: "border-danger border border-2 mb-3",
              email: "micael@gmail.com",
              phone: "(184) 2719 738",
              location: "London, United Kingdom",
              companyLogo: "company-03.svg",
            },
            {
              initials: "KD",
              name: "Karen Davis",
              revenue: "$08,81,389",
              colorclass: "border-danger border border-2 mb-3",
              email: "darleeo@gmail.com",
              phone: "(163) 2459 315",
              location: "Detroit, United States",
              companyLogo: "company-02.svg",
            },
            {
              initials: "AY",
              name: "James Anderson",
              revenue: "$3,40,000",
              colorclass: "border-danger border border-2 mb-3",
              email: "james@gmail.com",
              phone: "(168) 8392 823",
              location: "Manchester, United Kingdom",
              companyLogo: "company-03.svg",
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
      return new URL(`/src/assets/img/company/${imageName}`, import.meta.url)
        .href;
    },
  },
};
</script>
