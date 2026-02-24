<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper cardhead">
    <!-- Start Content -->
    <div class="content pb-0">
      <div class="mb-4">
        <h4 class="mb-1">Rating</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item"><router-link to="/dashboard/">Home</router-link></li>
            <li class="breadcrumb-item"><a href="#">Advanced UI</a></li>
            <li class="breadcrumb-item active" aria-current="page">Rating</li>
          </ol>
        </nav>
      </div>

      <!-- start row -->
      <div class="row">
        <div class="col-xxl-4 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">Basic Rater</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">
                  Show Some <span class="text-danger">&#10084;</span> with rating :
                </p>
                <star-rating v-bind:star-size="20" v-bind:show-rating="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">5 star rater with steps</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">Dont forget to rate the product :</p>
                <star-rating v-bind:star-size="20" v-bind:rating="3" v-bind:show-rating="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6 col-xl-6 flex">
          <div class="card flex-1 border border-borderColor rounded-[5px] shadow-xs bg-white mb-6">
            <div class="card-header border-b p-4 border-borderColor">
              <div class="card-title">
                5 Star rater with custom isBusyText and simulated backend
              </div>
            </div>
            <div class="card-body p-4">
              <div class="flex flex-wrap items-center justify-between">
                <p class="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                <star-rating v-bind:star-size="20" v-bind:is-busy-text="'Saving rating...'" v-bind:is-busy="isBusy"
                  v-bind:rating="rating" v-bind:show-rating="false" @update:rating="onRatingUpdate" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-12">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">Custom messages</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">
                  Your rating is much appreciated&#128079; :
                </p>
                <star-rating v-bind:star-size="20" v-bind:max-rating="10" v-bind:show-rating="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">Unlimited number of stars readOnly</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                <star-rating v-bind:star-size="20" v-bind:read-only="true" v-bind:rating="3"
                  v-bind:show-rating="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">
                5 Star rater with custom isBusyText and simulated backend
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                <star-rating v-bind:star-size="20" v-bind:increment="0.5" v-bind:rating="3.5"
                  v-bind:show-rating="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">On hover event</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">Please give your valuable rating :</p>
                <div class="d-flex flex-wrap align-items-center">
                  <star-rating v-bind:star-size="20" v-bind:show-rating="false" />
                  <span class="live-rating badge bg-success-transparent ms-3"> 1 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-6">
          <div class="card custom-card">
            <div class="card-header">
              <div class="card-title">Clear/reset rater</div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <p class="fs-14 mb-0 fw-semibold">Thank You so much for your support :</p>
                <div class="d-flex flex-wrap align-items-center">
                  <star-rating v-bind:star-size="20" v-bind:show-rating="false" />
                  <button class="btn btn-icon btn-sm btn-danger-light ms-3" id="rater-reset-button"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reset">
                    <vue-feather type="rotate-cw" class="feather-16"></vue-feather>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>

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
import StarRating from "vue3-star-ratings";
import { RotateCwIcon } from "vue-feather-icons";
export default {
  components: {
    StarRating,
    RotateCwIcon,
  },
  data() {
    return {
      title: "Home",
      text: "Ratings",
      rating: 0,
      isBusy: false,
    };
  },
  methods: {
    onRatingUpdate(newRating) {
      this.isBusy = true;

      // Simulate backend API call
      setTimeout(() => {
        this.rating = newRating;
        this.isBusy = false;

        // Show success message (you can customize this)
        console.log(`Rating saved: ${newRating} stars`);
      }, 2000); // 2 second delay to simulate network request
    },
  },
};
</script>
