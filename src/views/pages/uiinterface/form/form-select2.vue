<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <!-- ========================
			Start Page Content
		========================= -->

  <div class="page-wrapper">
    <!-- Start Content -->
    <div class="content">
      <!-- Page Header -->
      <div class="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div class="flex-grow-1">
          <h5 class="fw-bold mb-0">Form Select</h5>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-divide p-0 mb-0">
            <li class="breadcrumb-item d-flex align-items-center"><router-link to="/dashboard/"><i
                  class="ti ti-home me-1"></i>Home</router-link></li>
            <li class="breadcrumb-item d-flex align-items-center"><a href="javascript:void(0);">Forms</a></li>
            <li class="breadcrumb-item active" aria-current="page">Form Select</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Header -->

      <!-- start row -->
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Basic Select2</h5>
            </div>
            <div class="card-body">
              <vue3-select v-model="selected" :options="SelectOne" placeholder="Selection-1" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Multiple Select</h5>
            </div>
            <div class="card-body">
              <vue3-select v-model="selectedOne" :options="SelectTwo" placeholder="" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Single Select With Placeholder</h5>
            </div>
            <div class="card-body">
              <vue3-select v-model="selectedTwo" :options="SelectThree" placeholder="Texas" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Multiple Select With Placeholder</h5>
            </div>
            <div class="card-body">
              <vue3-select v-model="selectedThree" :options="SelectFour" placeholder="Select" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Multiple Select With Placeholder</h5>
            </div>
            <div class="card-body">
              <vue3-select v-model="selectedFour" :options="SelectFive" placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- Basic -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Basic</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    Use select2() function on select element to convert it to Select 2.
                  </p>
                  <vue3-select v-model="selectedFive" :options="SelectSix" placeholder="Orange" />
                </div>
              </div>
            </div>
          </div>
          <!-- /Basic -->

          <!-- Nested -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Nested</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Add options inside the optgroups to for group options.</p>
                  <select class="form-control nested">
                    <optgroup label="Group1">
                      <option selected="selected">orange</option>
                      <option>white</option>
                      <option>purple</option>
                    </optgroup>
                    <optgroup label="Group2">
                      <option>purple</option>
                      <option>orange</option>
                      <option>white</option>
                    </optgroup>
                    <optgroup label="Group3">
                      <option>white</option>
                      <option>purple</option>
                      <option>orange</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- /Nested -->

          <!-- Placeholder -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Placeholder</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Apply Placeholder by setting option placeholder option.</p>
                  <vue3-select v-model="selectedSix" :options="SelectSeven" placeholder="Choose" />
                </div>
              </div>
            </div>
          </div>
          <!-- /Placeholder -->

          <!-- Tagging with multi-value -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Tagging with multi-value select boxes</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Set tags: true to convert select 2 in Tag mode.</p>
                  <select class="form-control tagging" multiple="multiple">
                    <option>orange</option>
                    <option>white</option>
                    <option>purple</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- /Tagging with multi-value -->
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Small Select2</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Use data('select2') function to get container of select2.</p>
                  <vue3-select v-model="selectedSeven" :options="SelectEight" placeholder="Orange" />
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Disabling options</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Disable Select using disabled attribute.</p>
                  <vue3-select v-model="selectedEight" :options="SelectNine" placeholder="Choose" />
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Limiting the number of Tagging</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    Set maximumSelectionLength: 2 with tags: true to limit selectin in Tag
                    mode.
                  </p>
                  <select class="form-control tagging" multiple="multiple">
                    <option>orange</option>
                    <option>white</option>
                    <option>purple</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>
    <!-- End Content -->

    <!-- Footer Start -->
    <div class="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
      <p class="mb-0">2014 - {{ new Date().getFullYear() }} &copy; SmartHR.</p>
      <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
    </div>
    <!-- Footer End -->
  </div>

  <!-- ========================
End Page Content
========================= -->
</template>

<script>
export default {
  data() {
    return {
      title: "Form Select2",
      text: "Dashboard",
      text1: "Form Select2",
      selected: null,
      selectedOne: null,
      selectedTwo: null,
      selectedThree: null,
      selectedFour: null,
      selectedFive: null,
      selectedSix: null,
      selectedSeven: null,
      selectedEight: null,
      SelectOne: [
        { label: "Selection-1", value: "Selection-1" },
        { label: "Selection-2", value: "Selection-2" },
        { label: "Selection-3", value: "Selection-3" },
        { label: "Selection-4", value: "Selection-4" },
        { label: "Selection-5", value: "Selection-5" },
      ],
      SelectTwo: [{ label: "Multiple-1", value: "Multiple-1" }, { label: "Multiple-2", value: "Multiple-2" }, { label: "Multiple-3", value: "Multiple-3" }, { label: "Multiple-4", value: "Multiple-4" }, { label: "Multiple-5", value: "Multiple-5" }],
      SelectThree: [{ label: "Texas", value: "Texas" }, { label: "Georgia", value: "Georgia" }, { label: "California", value: "California" }, { label: "Washington D.C", value: "Washington D.C" }, { label: "Virginia", value: "Virginia" }],
      SelectFour: [{ label: "Apple", value: "Apple" }, { label: "Mango", value: "Mango" }, { label: "Orange", value: "Orange" }, { label: "Guava", value: "Guava" }, { label: "Pineapple", value: "Pineapple" }],
      SelectFive: [{ label: "Apple", value: "Apple" }, { label: "Mango", value: "Mango" }, { label: "Orange", value: "Orange" }, { label: "Guava", value: "Guava" }, { label: "Pineapple", value: "Pineapple" }],
      SelectSix: [{ label: "Orange", value: "Orange" }, { label: "White", value: "White" }, { label: "Purple", value: "Purple" }],
      SelectSeven: [{ label: "First", value: "First" }, { label: "Second", value: "Second" }, { label: "Third", value: "Third" }, { label: "Fourth", value: "Fourth" }, { label: "Fifth", value: "Fifth" }],
      SelectEight: [{ label: "Orange", value: "Orange" }, { label: "White", value: "White" }, { label: "Purple", value: "Purple" }],
      SelectNine: [{ label: "First", value: "First" }, { label: "Second", value: "Second" }, { label: "Third", value: "Third" }],
    };
  },
};
</script
