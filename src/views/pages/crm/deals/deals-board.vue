<template>
  <div class="d-flex overflow-x-auto align-items-start mb-4">
    <div
      class="kanban-list-items bg-white"
      v-for="(module, color) in modules"
      :key="color"
    >
      <div class="card mb-0">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h4 class="fw-medium d-flex align-items-center mb-1">
                <i :class="module.DotClass"></i>
                {{ module.Title }}
              </h4>
              <span class="fw-normal text-default">{{ module.Count }}</span>
            </div>
            <div class="d-flex align-items-center">
              <div class="action-icon d-inline-flex">
                <a href="javascript:void(0);"
                  ><i class="ti ti-circle-plus"></i
                ></a>
                <a
                  href="javascript:void(0);"
                  class=""
                  data-bs-toggle="modal"
                  data-bs-target="#edit_deals"
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
          :list="module.Cards"
          :group="{ name: 'kanban', pull: true, put: true }"
          @end="onDragEnd(color)"
        >
          <div v-for="Card in module.Cards" :key="Card.id">
            <div>
              <div class="card kanban-card">
                <div class="card-body">
                  <div class="d-block">
                    <div :class="Card.CardClass"></div>
                    <div class="d-flex align-items-center mb-3">
                      <router-link
                        to="/crm/deals-details"
                        class="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                        ><span class="avatar-title text-dark">{{
                          Card.Logo
                        }}</span></router-link
                      >
                      <h6 class="fw-medium">
                        <router-link to="/crm/deals-details">{{
                          Card.CompanyName
                        }}</router-link>
                      </h6>
                    </div>
                  </div>
                  <div class="mb-3 d-flex flex-column">
                    <p
                      class="text-default d-inline-flex align-items-center mb-2"
                    >
                      <i class="ti ti-currency-dollar text-dark me-2"></i>
                      {{ Card.Amount }}
                    </p>
                    <p
                      class="text-default d-inline-flex align-items-center mb-2"
                    >
                      <i class="ti ti-mail text-dark me-2"></i>
                      {{ Card.Email }}
                    </p>
                    <p
                      class="text-default d-inline-flex align-items-center mb-2"
                    >
                      <i class="ti ti-phone text-dark me-2"></i>
                      {{ Card.MobileNo }}
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-2 text-dark me-2"></i>
                      {{ Card.Location }}
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center">
                      <a
                        href="javascript:void(0);"
                        class="avatar avatar-md avatar-rounded flex-shrink-0 me-2"
                        ><img :src="getImageUrl(Card.Image)" alt="image"
                      /></a>
                      <a href="javascript:void(0);" class="text-dark">
                        {{ Card.Name }}
                      </a>
                    </div>
                    <span class="badge badge-sm badge-info-transparent"
                      ><i class="ti ti-progress me-1"></i
                      >{{ Card.Percentage }}</span
                    >
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between border-top pt-3 mt-3"
                  >
                    <span class="text-dark"
                      ><i class="ti ti-calendar-due text-gray-5"></i
                      >{{ Card.Date }}</span
                    >
                    <div class="d-flex align-items-center">
                      <a
                        href="javascript:void(0);"
                        class="d-flex align-items-center justify-content-center me-2"
                        ><i class="ti ti-phone-check"></i
                      ></a>
                      <a
                        href="javascript:void(0);"
                        class="d-flex align-items-center justify-content-center me-2"
                        ><i class="ti ti-message-circle-2"></i
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
          DotClass: "ti ti-circle-filled fs-8 text-purple me-2",
          Title: "New",
          Count: "03 Deals - $16,90,000",
          Cards: [
            {
              CardClass: "border-purple border border-2 mb-3",
              Logo: "WR",
              CompanyName: "Website Redesign",
              Amount: "$4,50,000",
              Email: "darleeo@gmail.com",
              MobileNo: "(163) 2459 315",
              Location: "Newyork, United States",
              Image: "avatar-20.jpg",
              Name: "Sharon Roy",
              Percentage: "85%",
              Date: "10 Jan 2024",
            },
            {
              CardClass: "border-purple border border-2 mb-3",
              Logo: "CB",
              CompanyName: "Cloud Backup",
              Amount: "$5,00,000",
              Email: "sheron@example.com",
              MobileNo: "(146) 1249 296",
              Location: "Exeter, United States",
              Image: "avatar-20.jpg",
              Name: "Darlee Robertson",
              Percentage: "15%",
              Date: "12 Jan 2024",
            },
            {
              CardClass: "border-purple border border-2 mb-3",
              Logo: "EM",
              CompanyName: "Email Marketing",
              Amount: "$7,40,000",
              Email: "vaughan@example.com",
              MobileNo: "(135) 3489 516",
              Location: "Phoenix, United States",
              Image: "avatar-21.jpg",
              Name: "Vaughan Lewis",
              Percentage: "95%",
              Date: "10 Jan 2024",
            },
          ],
        },
        Contact: {
          DotClass: "ti ti-circle-filled fs-8 text-skyblue me-2",
          Title: "Prospect",
          Count: "30 Leads - $19,94,938",
          Cards: [
            {
              CardClass: "border-skyblue border border-2 mb-3",
              Logo: "AP",
              CompanyName: "App Development",
              Amount: "$3,15,000",
              Email: "jessica@gmail.com",
              MobileNo: "(158) 3459 596",
              Location: "Chester, United Kingdom",
              Image: "avatar-01.jpg",
              Name: "Jessica Louise",
              Percentage: "95%",
              Date: "10 Jan 2024",
            },
            {
              CardClass: "border-skyblue border border-2 mb-3",
              Logo: "SL",
              CompanyName: "SaaS Licensing",
              Amount: "$6,20,000",
              Email: "rachel@gmail.com",
              MobileNo: "(154) 6481 075",
              Location: "Bristol, United Kingdom",
              Image: "avatar-23.jpg",
              Name: "Rachel Hampton",
              Percentage: "15%",
              Date: "12 Jan 2024",
            },
            {
              CardClass: "border-skyblue border border-2 mb-3",
              Logo: "MA",
              CompanyName: "Mobile App Design",
              Amount: "$5,50,000",
              Email: "dawn@gmail.com",
              MobileNo: "(163) 6498 256",
              Location: "Charlotte, United States",
              Image: "avatar-22.jpg",
              Name: "Dawn Mercha",
              Percentage: "65%",
              Date: "10 Jan 2024",
            },
          ],
        },
        Presentation: {
          DotClass: "ti ti-circle-filled fs-8 text-warning me-2",
          Title: "Proposal",
          Count: "30 Leads - $19,94,938",
          Cards: [
            {
              CardClass: "border-warning border border-2 mb-3",
              Logo: "SS",
              CompanyName: "SEO Services",
              Amount: "$8,40,000",
              Email: "jonelle@gmail.com",
              MobileNo: "(184) 6348 195",
              Location: "Coventry, United Kingdom",
              Image: "avatar-24.jpg",
              Name: "Jonelle Curtiss",
              Percentage: "60%",
              Date: "10 Jan 2024",
            },
            {
              CardClass: "border-warning border border-2 mb-3",
              Logo: "UI",
              CompanyName: "UX/UI Design",
              Amount: "$4,50,000",
              Email: "carol@gmail.com",
              MobileNo: "(196) 4862 196",
              Location: "Manchester, United Kingdom",
              Image: "avatar-16.jpg",
              Name: "Carol Thomas",
              Percentage: "15%",
              Date: "12 Jan 2024",
            },
          ],
        },
        Proposal: {
          DotClass: "ti ti-circle-filled fs-8 text-success me-2",
          Title: "Won",
          Count: "30 Leads - $19,94,938",
          Cards: [
            {
              CardClass: "border-success border border-2 mb-3",
              Logo: "CM",
              CompanyName: "Cloud Migration",
              Amount: "$2,45,000",
              Email: "jonathan@gmail.com",
              MobileNo: "(163) 2459 315",
              Location: "London, United Kingdom",
              Image: "avatar-10.jpg",
              Name: "Jonathan Smith",
              Percentage: "85%",
              Date: "10 Jan 2024",
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
      return new URL(`/src/assets/img/profiles/${imageName}`, import.meta.url)
        .href;
    },
  },
};
</script>
