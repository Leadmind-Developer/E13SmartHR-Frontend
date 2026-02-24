<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>

  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content pb-0">
      <!-- Page Header -->
      <div class="mb-4">
        <h4 class="mb-1">Form Wizard</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
            <li class="breadcrumb-item"><a href="#">Base UI</a></li>
            <li class="breadcrumb-item active" aria-current="page">Form Wizard</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <!-- start row -->
      <div class="row">
        <!-- Basic Wizard -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <h4 class="header-title">A Basic Wizard</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div id="basicwizard">
                  <ul class="nav nav-pills nav-justified form-wizard-header mb-4">
                    <li v-for="(step, index) in steps" :key="index" class="nav-item">
                      <a href="javascript:void(0)" class="nav-link rounded-0 py-2" :class="{
                        'active': currentStep === index
                      }">
                        <i :class="[
                          'fs-18 align-middle me-1',
                          index === 0 ? '' :
                            index === 1 ? '' : ''
                        ]"></i>
                        <span class="d-none d-sm-inline">{{ step }}</span>
                      </a>
                    </li>
                  </ul>

                  <!-- Step 1: Account -->
                  <div v-show="currentStep === 0" class="tab-pane">
                    <div class="row">
                      <div class="col-12">
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="userName">User Name</label>
                          <div class="col-md-9">
                            <input type="text" class="form-control" id="userName" v-model="formData.userName" required>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="password">Password</label>
                          <div class="col-md-9">
                            <input type="password" id="password" class="form-control" v-model="formData.password"
                              required>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="confirm">Confirm Password</label>
                          <div class="col-md-9">
                            <input type="password" id="confirm" class="form-control" v-model="formData.confirm"
                              required>
                            <small v-if="!isPasswordMatch && formData.confirm" class="text-danger">
                              Passwords do not match
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Step 2: Profile -->
                  <div v-show="currentStep === 1" class="tab-pane">
                    <div class="row">
                      <div class="col-12">
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="name">First Name</label>
                          <div class="col-md-9">
                            <input type="text" id="name" class="form-control" v-model="formData.name" required>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="surname">Last Name</label>
                          <div class="col-md-9">
                            <input type="text" id="surname" class="form-control" v-model="formData.surname" required>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label class="col-md-3 col-form-label" for="email">Email</label>
                          <div class="col-md-9">
                            <input type="email" id="email" class="form-control" v-model="formData.email" required>
                            <small v-if="!isStep2Valid && formData.email" class="text-danger">
                              Please enter a valid email address
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Step 3: Finish -->
                  <div v-show="currentStep === 2" class="tab-pane">
                    <div class="row">
                      <div class="col-12">
                        <div class="text-center">
                          <h2 class="mt-0"><i class="bi bi-check-circle text-success"></i></h2>
                          <h3 class="mt-0">Thank you!</h3>
                          <p class="w-75 mb-2 mx-auto">You are about to submit the form.</p>
                          <div class="mb-3">
                            <div class="form-check d-inline-block">
                              <input type="checkbox" class="form-check-input fs-15" id="customCheck1"
                                v-model="formData.agreeTerms" required>
                              <label class="form-check-label" for="customCheck1">I agree with the Terms and
                                Conditions</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Navigation Buttons -->
                  <div class="d-flex justify-content-between pt-3">
                    <button type="button" class="btn btn-primary" @click="prevStep" :disabled="currentStep === 0">
                      <i class="bi bi-arrow-left me-1"></i> Previous
                    </button>

                    <button v-if="currentStep < steps.length - 1" type="button" class="btn btn-primary"
                      @click="nextStep"
                      :disabled="(currentStep === 0 && !isStep1Valid) || (currentStep === 1 && !isStep2Valid)">
                      Next <i class="bi bi-arrow-right ms-1"></i>
                    </button>

                    <button v-else type="submit" class="btn btn-primary" :disabled="!formData.agreeTerms">
                      <i class="bi bi-check2-circle me-1"></i> Submit
                    </button>
                  </div>
                </div>
              </form>
            </div> <!-- end card-body -->
          </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-lg-6">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <h4 class="header-title">Wizard With Progress Bar</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitProgressForm">
                <!-- Progress Bar Wizard Steps -->
                <ul class="nav nav-pills nav-justified form-wizard-header mb-3">
                  <li v-for="(step, index) in progressSteps" :key="'progress-' + index" class="nav-item">
                    <a href="javascript:void(0)" class="nav-link rounded-0 py-2"
                      :class="{ 'active': currentProgressStep === index }" @click="goToProgressStep(index)">
                      <i :class="[
                        'fs-18 align-middle me-1',
                        index === 0 ? '' :
                          index === 1 ? '' :
                            ''
                      ]"></i>
                      <span class="d-none d-sm-inline">{{ step }}</span>
                    </a>
                  </li>
                </ul>

                <!-- Progress Bar -->
                <div class="progress mb-3" style="height: 7px;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    :style="{ width: progressPercentage + '%' }"></div>
                </div>

                <!-- Step 1: Account -->
                <div v-show="currentProgressStep === 0" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="userName1">User Name</label>
                        <div class="col-md-9">
                          <input type="text" class="form-control" id="userName1" v-model="progressFormData.userName"
                            required>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="password1"> Password</label>
                        <div class="col-md-9">
                          <input type="password" id="password1" class="form-control" v-model="progressFormData.password"
                            required>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="confirm1">Re Password</label>
                        <div class="col-md-9">
                          <input type="password" id="confirm1" class="form-control" v-model="progressFormData.confirm"
                            required>
                          <small v-if="!isProgressPasswordMatch && progressFormData.confirm" class="text-danger">
                            Passwords do not match
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Profile -->
                <div v-show="currentProgressStep === 1" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="name1">First Name</label>
                        <div class="col-md-9">
                          <input type="text" id="name1" class="form-control" v-model="progressFormData.name" required>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="surname1">Last Name</label>
                        <div class="col-md-9">
                          <input type="text" id="surname1" class="form-control" v-model="progressFormData.surname"
                            required>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="email1">Email</label>
                        <div class="col-md-9">
                          <input type="email" id="email1" class="form-control" v-model="progressFormData.email"
                            required>
                          <small v-if="!isProgressStep2Valid && progressFormData.email" class="text-danger">
                            Please enter a valid email address
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 3: Finish -->
                <div v-show="currentProgressStep === 2" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="text-center">
                        <h2 class="mt-0"><i class="bi bi-check-circle text-success"></i></h2>
                        <h3 class="mt-0">Thank you!</h3>
                        <p class="w-75 mb-2 mx-auto">You are about to submit the form with a progress bar.</p>
                        <div class="mb-3">
                          <div class="form-check d-inline-block">
                            <input type="checkbox" class="form-check-input fs-15" id="customCheck3"
                              v-model="progressFormData.agreeTerms" required>
                            <label class="form-check-label" for="customCheck3">I agree with the Terms and
                              Conditions</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                  <div class="first">
                    <a href="javascript:void(0);" class="btn btn-primary" @click.prevent="goToProgressStep(0)"
                      :class="{ disabled: currentProgressStep === 0 }">
                      First
                    </a>
                  </div>
                  <div class="d-flex flex-wrap gap-2">
                    <div class="previous">
                      <a href="javascript:void(0);" class="btn btn-primary" @click.prevent="prevProgressStep"
                        :class="{ disabled: currentProgressStep === 0 }">
                        <i class="bx bx-left-arrow-alt me-2"></i>Back To Previous
                      </a>
                    </div>
                    <div class="next" v-if="currentProgressStep < progressSteps.length - 1">
                      <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0"
                        @click.prevent="nextProgressStep"
                        :class="{ disabled: (currentProgressStep === 0 && !isProgressStep1Valid) || (currentProgressStep === 1 && !isProgressStep2Valid) }">
                        Next Step<i class="bx bx-right-arrow-alt ms-2"></i>
                      </a>
                    </div>
                    <div class="last" v-else>
                      <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0"
                        @click.prevent="submitProgressForm" :class="{ disabled: !progressFormData.agreeTerms }">
                        Finish
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div> <!-- end card-body -->
          </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-lg-6">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <h4 class="header-title">Wizard With Form Validation</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submitValidationForm">
                <!-- Validation Wizard Steps -->
                <ul class="nav nav-pills nav-justified form-wizard-header mb-3">
                  <li v-for="(step, index) in validationSteps" :key="'validation-' + index" class="nav-item">
                    <a href="javascript:void(0)" class="nav-link rounded-0 py-2"
                      :class="{ 'active': currentValidationStep === index }" @click="goToValidationStep(index)">
                      <i :class="[
                        'fs-18 align-middle me-1',
                        index === 0 ? '' :
                          index === 1 ? '' :
                            ''
                      ]"></i>
                      <span class="d-none d-sm-inline">{{ step }}</span>
                    </a>
                  </li>
                </ul>

                <!-- Step 1: Account -->
                <div v-show="currentValidationStep === 0" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="userName3">User Name</label>
                        <div class="col-md-9">
                          <input type="text" class="form-control" id="userName3" v-model="validationFormData.userName"
                            required>
                          <div
                            v-if="currentValidationStep === 0 && !validationFormData.userName && validationTouched.userName"
                            class="text-danger">
                            Username is required
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="password3">Password</label>
                        <div class="col-md-9">
                          <input type="password" id="password3" class="form-control"
                            v-model="validationFormData.password" required>
                          <div
                            v-if="currentValidationStep === 0 && !validationFormData.password && validationTouched.password"
                            class="text-danger">
                            Password is required
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="confirm3">Confirm Password</label>
                        <div class="col-md-9">
                          <input type="password" id="confirm3" class="form-control" v-model="validationFormData.confirm"
                            @blur="validationTouched.confirm = true" required>
                          <div v-if="!isValidationPasswordMatch && validationFormData.confirm" class="text-danger">
                            Passwords do not match
                          </div>
                          <div
                            v-else-if="currentValidationStep === 0 && !validationFormData.confirm && validationTouched.confirm"
                            class="text-danger">
                            Please confirm your password
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Profile -->
                <div v-show="currentValidationStep === 1" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="name3">First Name</label>
                        <div class="col-md-9">
                          <input type="text" id="name3" class="form-control" v-model="validationFormData.name"
                            @blur="validationTouched.name = true" required>
                          <div v-if="currentValidationStep === 1 && !validationFormData.name && validationTouched.name"
                            class="text-danger">
                            First name is required
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="surname3">Last Name</label>
                        <div class="col-md-9">
                          <input type="text" id="surname3" class="form-control" v-model="validationFormData.surname"
                            @blur="validationTouched.surname = true" required>
                          <div
                            v-if="currentValidationStep === 1 && !validationFormData.surname && validationTouched.surname"
                            class="text-danger">
                            Last name is required
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-md-3 col-form-label" for="email3">Email</label>
                        <div class="col-md-9">
                          <input type="email" id="email3" class="form-control" v-model="validationFormData.email"
                            @blur="validationTouched.email = true" required>
                          <div v-if="!isValidationEmailValid && validationFormData.email" class="text-danger">
                            Please enter a valid email address
                          </div>
                          <div
                            v-else-if="currentValidationStep === 1 && !validationFormData.email && validationTouched.email"
                            class="text-danger">
                            Email is required
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 3: Finish -->
                <div v-show="currentValidationStep === 2" class="tab-pane">
                  <div class="row">
                    <div class="col-12">
                      <div class="text-center">
                        <h2 class="mt-0"><i class="bi bi-check-circle text-success"></i></h2>
                        <h3 class="mt-0">Thank you!</h3>
                        <p class="w-75 mb-2 mx-auto">
                          Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                          dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis dictum aliquet.
                        </p>
                        <div class="mb-3">
                          <div class="form-check d-inline-block">
                            <input type="checkbox" class="form-check-input fs-15" id="agreeTerms3"
                              v-model="validationFormData.agreeTerms" @change="validationTouched.agreeTerms = true"
                              required>
                            <label class="form-check-label" for="agreeTerms3">I agree with the Terms and
                              Conditions</label>
                            <div
                              v-if="currentValidationStep === 2 && !validationFormData.agreeTerms && validationTouched.agreeTerms"
                              class="text-danger mt-2">
                              You must agree to the terms and conditions
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                  <div class="first">
                    <a href="javascript:void(0);" class="btn btn-primary" @click.prevent="goToFirstStep"
                      :class="{ disabled: currentValidationStep === 0 }">
                      First
                    </a>
                  </div>
                  <div class="d-flex flex-wrap gap-2">
                    <div class="previous">
                      <a href="javascript:void(0);" class="btn btn-primary" @click.prevent="prevValidationStep"
                        :class="{ disabled: currentValidationStep === 0 }">
                        <i class="bx bx-left-arrow-alt me-2"></i>Back To Previous
                      </a>
                    </div>
                    <div class="next" v-if="currentValidationStep < validationSteps.length - 1">
                      <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0"
                        @click.prevent="nextValidationStep" :class="{ disabled: isNextButtonDisabled }">
                        Next Step<i class="bx bx-right-arrow-alt ms-2"></i>
                      </a>
                    </div>
                  </div>
                  <div class="last" v-if="currentValidationStep === validationSteps.length - 1">
                    <a href="javascript:void(0);" class="btn btn-primary mt-3 mt-md-0"
                      @click.prevent="submitValidationForm" :class="{ disabled: !validationFormData.agreeTerms }">
                      Finish
                    </a>
                  </div>
                </div>
              </form>

            </div> <!-- end card-body -->
          </div> <!-- end card -->
        </div> <!-- end col -->

      </div>
      <!-- end row -->

    </div>
    <!-- End Content -->

    <!-- Start Footer -->
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
    <!-- End Footer -->

  </div>

  <!-- ========================
End Page Content
========================= -->
</template>
<script>
import { ref, computed } from 'vue';

export default {
  name: 'FormWizard',
  setup() {
    // Basic Wizard
    const currentStep = ref(0);
    const steps = ['Account', 'Profile', 'Finish'];

    const formData = ref({
      userName: 'johne',
      password: '123456789',
      confirm: '123456789',
      name: 'Francis',
      surname: 'Brinkman',
      email: 'cory1979@example.com',
      agreeTerms: false
    });

    // Progress Bar Wizard
    const currentProgressStep = ref(0);
    const progressSteps = ['Account', 'Profile', 'Finish'];

    const progressFormData = ref({
      userName: 'johne',
      password: '123456789',
      confirm: '123456789',
      name: 'Francis',
      surname: 'Brinkman',
      email: 'cory1979@example.com',
      agreeTerms: false
    });

    // Validation Wizard
    const currentValidationStep = ref(0);
    const validationSteps = ['Account', 'Profile', 'Finish'];

    const validationFormData = ref({
      userName: '',
      password: '',
      confirm: '',
      name: '',
      surname: '',
      email: '',
      agreeTerms: false
    });

    const validationTouched = ref({
      userName: false,
      password: false,
      confirm: false,
      name: false,
      surname: false,
      email: false,
      agreeTerms: false
    });

    // Reset touch state when changing steps
    const resetTouched = () => {
      Object.keys(validationTouched.value).forEach(key => {
        validationTouched.value[key] = false;
      });
    };

    // Validation Wizard Computed Properties
    const isValidationPasswordMatch = computed(() => {
      return validationFormData.value.password === validationFormData.value.confirm;
    });

    const isValidationEmailValid = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(validationFormData.value.email);
    });

    const isValidationStep1Valid = computed(() => {
      return (
        validationFormData.value.userName &&
        validationFormData.value.password &&
        validationFormData.value.confirm &&
        isValidationPasswordMatch.value
      );
    });

    const isValidationStep2Valid = computed(() => {
      return (
        validationFormData.value.name &&
        validationFormData.value.surname &&
        isValidationEmailValid.value
      );
    });

    // Validation Wizard Methods
    const nextValidationStep = () => {
      // Mark all fields in current step as touched
      if (currentValidationStep.value === 0) {
        validationTouched.value.userName = true;
        validationTouched.value.password = true;
        validationTouched.value.confirm = true;

        // Only proceed if step 1 is valid
        if (!isValidationStep1Valid.value) return;
      } else if (currentValidationStep.value === 1) {
        validationTouched.value.name = true;
        validationTouched.value.surname = true;
        validationTouched.value.email = true;

        // Only proceed if step 2 is valid
        if (!isValidationStep2Valid.value) return;
      }

      // Go to next step if not on last step
      if (currentValidationStep.value < validationSteps.length - 1) {
        currentValidationStep.value++;
        resetTouched();
      }
    };

    const prevValidationStep = () => {
      if (currentValidationStep.value > 0) {
        currentValidationStep.value--;
        resetTouched();
      }
    };

    const goToValidationStep = (step) => {
      if (step >= 0 && step < validationSteps.length) {
        // Only allow going to a step if all previous steps are valid
        if (step < currentValidationStep.value) {
          currentValidationStep.value = step;
          resetTouched();
        } else if (step > currentValidationStep.value) {
          // If trying to go forward, validate current step first
          if (currentValidationStep.value === 0 && !isValidationStep1Valid.value) return;
          if (currentValidationStep.value === 1 && !isValidationStep2Valid.value) return;

          currentValidationStep.value = step;
          resetTouched();
        }
      }
    };

    const goToFirstStep = () => {
      currentValidationStep.value = 0;
      resetTouched();
    };

    const isNextButtonDisabled = computed(() => {
      if (currentValidationStep.value === 0) return !isValidationStep1Valid.value;
      if (currentValidationStep.value === 1) return !isValidationStep2Valid.value;
      return false;
    });

    const submitValidationForm = () => {
      // Mark all fields as touched before validation
      Object.keys(validationTouched.value).forEach(key => {
        validationTouched.value[key] = true;
      });

      if (isValidationStep1Valid.value && isValidationStep2Valid.value && validationFormData.value.agreeTerms) {
        console.log('Validation form submitted:', validationFormData.value);

        // Show success message
        alert('Form submitted successfully!');

        // Reset form
        validationFormData.value = {
          userName: '',
          password: '',
          confirm: '',
          name: '',
          surname: '',
          email: '',
          agreeTerms: false
        };

        // Reset to first step
        currentValidationStep.value = 0;
        resetTouched();
      } else {
        // If validation fails, go to the first step with errors
        if (!isValidationStep1Valid.value) {
          currentValidationStep.value = 0;
        } else if (!isValidationStep2Valid.value) {
          currentValidationStep.value = 1;
        } else if (!validationFormData.value.agreeTerms) {
          currentValidationStep.value = 2;
        }
        alert('Please fill in all required fields correctly');
      }
    };

    // Progress bar percentage
    const progressPercentage = computed(() => {
      return ((currentProgressStep.value + 1) / progressSteps.length) * 100;
    });

    // Computed properties for basic wizard validation
    const isPasswordMatch = computed(() => {
      return formData.value.password === formData.value.confirm;
    });

    const isStep1Valid = computed(() => {
      return (
        formData.value.userName &&
        formData.value.password &&
        formData.value.confirm &&
        isPasswordMatch.value
      );
    });

    const isStep2Valid = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        formData.value.name &&
        formData.value.surname &&
        emailRegex.test(formData.value.email)
      );
    });

    // Computed properties for progress wizard validation
    const isProgressPasswordMatch = computed(() => {
      return progressFormData.value.password === progressFormData.value.confirm;
    });

    const isProgressStep1Valid = computed(() => {
      return (
        progressFormData.value.userName &&
        progressFormData.value.password &&
        progressFormData.value.confirm &&
        isProgressPasswordMatch.value
      );
    });

    const isProgressStep2Valid = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        progressFormData.value.name &&
        progressFormData.value.surname &&
        emailRegex.test(progressFormData.value.email)
      );
    });

    // Navigation methods for basic wizard
    const nextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    const goToStep = (step) => {
      if (step >= 0 && step < steps.length) {
        currentStep.value = step;
      }
    };

    const submitForm = () => {
      if (isStep1Valid.value && isStep2Valid.value && formData.value.agreeTerms) {
        // Form submission logic here
        console.log('Basic form submitted:', formData.value);
        alert('Basic form submitted successfully!');
      } else {
        alert('Please fill in all required fields correctly');
      }
    };

    // Navigation methods for progress wizard
    const nextProgressStep = () => {
      if (currentProgressStep.value < progressSteps.length - 1) {
        currentProgressStep.value++;
      }
    };

    const prevProgressStep = () => {
      if (currentProgressStep.value > 0) {
        currentProgressStep.value--;
      }
    };

    const goToProgressStep = (step) => {
      if (step >= 0 && step < progressSteps.length) {
        currentProgressStep.value = step;
      }
    };

    const submitProgressForm = () => {
      if (isProgressStep1Valid.value && isProgressStep2Valid.value && progressFormData.value.agreeTerms) {
        // Form submission logic here
        console.log('Progress form submitted:', progressFormData.value);
        alert('Progress form submitted successfully!');
      } else {
        alert('Please fill in all required fields correctly');
      }
    };

    return {
      // Basic Wizard
      currentStep,
      steps,
      formData,
      isPasswordMatch,
      isStep1Valid,
      isStep2Valid,
      nextStep,
      prevStep,
      goToStep,
      submitForm,

      // Progress Bar Wizard
      currentProgressStep,
      progressSteps,
      progressFormData,
      progressPercentage,
      isProgressPasswordMatch,
      isProgressStep1Valid,
      isProgressStep2Valid,
      nextProgressStep,
      prevProgressStep,
      goToProgressStep,
      submitProgressForm,

      // Validation Wizard
      currentValidationStep,
      validationSteps,
      validationFormData,
      validationTouched,
      isValidationPasswordMatch,
      isValidationEmailValid,
      isValidationStep1Valid,
      isValidationStep2Valid,
      isNextButtonDisabled,
      nextValidationStep,
      prevValidationStep,
      goToValidationStep,
      goToFirstStep,
      submitValidationForm,
    };
  },
};
</script>
