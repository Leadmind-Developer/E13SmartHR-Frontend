<template>
  <div id="primaryBorderFive" class="accordion-collapse collapse border-top" aria-labelledby="headingFive"
    data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <div class="row align-items-center g-3 mb-3">
        <div class="col-sm-4">
          <h6>Total No of Documents : 45</h6>
        </div>
        <div class="col-sm-8">
          <div class="d-flex align-items-center">
            <div class="dropdown me-2">
              <a href="javascript:void(0);" class="dropdown-toggle btn btn-white" data-bs-toggle="dropdown"
                aria-expanded="false">
                Sort By : Docs Type
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Docs</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Pdf</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Image</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Folder</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Xml</a>
                </li>
              </ul>
            </div>
            <div class="position-relative input-icon flex-fill">
              <span class="input-icon-addon">
                <i class="ti ti-search"></i>
              </span>
              <input type="text" class="form-control" placeholder="Search" v-model="searchQuery" />
            </div>
          </div>
        </div>
      </div>
      <div class="custom-datatable-filter table-responsive no-datatable-length border">
        <a-table class="table datatable thead-light" :columns="columns" :data-source="filteredPages"
          :row-selection="rowSelection">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'Name'">
              <div class="d-flex align-items-center file-name-icon">
                <a href="javascript:void(0);" class="avatar avatar-md bg-light" data-bs-toggle="offcanvas"
                  data-bs-target="#preview">
                  <img :src="getImageUrl(record.Image)" class="img-fluid" alt="img" /></a>
                <div class="ms-2">
                  <p class="text-title fw-medium mb-0">
                    <a href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#preview">{{ record.Name
                    }}</a>
                  </p>
                </div>
              </div>
            </template>
            <template v-if="column.key === 'Modified'">
              <p class="text-title mb-0">{{ record.Modified }}</p>
              <span>{{ record.Time }}</span>
            </template>
            <template v-if="column.key === 'Share'">
              <div class="avatar-list-stacked avatar-group-sm">
                <span class="avatar avatar-rounded">
                  <img class="border border-white" :src="getImageUrlOne(record.ImageOne)" alt="img" />
                </span>
                <span class="avatar avatar-rounded">
                  <img class="border border-white" :src="getImageUrlOne(record.ImageTwo)" alt="img" />
                </span>
                <span class="avatar avatar-rounded">
                  <img class="border border-white" :src="getImageUrlOne(record.ImageThree)" alt="img" />
                </span>
                <span class="avatar avatar-rounded">
                  <img class="border border-white" :src="getImageUrlOne(record.ImageFOur)" alt="img" />
                </span>
                <a class="avatar bg-primary avatar-rounded text-fixed-white" href="javascript:void(0);">
                  +1
                </a>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="d-flex align-items-center">
                <div class="rating-select me-2">
                  <a href="javascript:void(0);"><i class="ti ti-star"></i></a>
                </div>
                <div class="dropdown">
                  <a href="javascript:void(0);" class="d-flex align-items-center justify-content-center"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ti ti-dots fs-14"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right p-3">
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);">
                        <i class="ti ti-trash me-2"></i>Permanent Delete
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item rounded-1" href="javascript:void(0);">
                        <i class="ti ti-edit-circle me-2"></i>Restore File
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    sorter: false,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    sorter: {
      compare: (a, b) => {
        a = a.Name.toLowerCase();
        b = b.Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Size",
    dataIndex: "Size",
    sorter: {
      compare: (a, b) => {
        a = a.Size.toLowerCase();
        b = b.Size.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Type",
    dataIndex: "Type",
    sorter: {
      compare: (a, b) => {
        a = a.Type.toLowerCase();
        b = b.Type.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Modified",
    dataIndex: "Modified",
    key: "Modified",
    sorter: {
      compare: (a, b) => {
        a = a.Modified.toLowerCase();
        b = b.Modified.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Share",
    dataIndex: "Share",
    key: "Share",
    sorter: {
      compare: (a, b) => {
        a = a.Share.toLowerCase();
        b = b.Share.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "",
    key: "action",
    sorter: false,
  },
];
const data = [
  {
    key: "1",
    Name: "Secret",
    Size: "7.6 MB",
    Type: "Doc",
    Modified: "Mar 15, 2025",
    Time: "05:00:14 PM",
    Image: "file-01.svg",
    ImageOne: "avatar-27.jpg",
    ImageTwo: "avatar-29.jpg",
    ImageThree: "avatar-12.jpg",
    ImageFOur: "avatar-06.jpg",
  },
  {
    key: "2",
    Name: "Sophie Headrick",
    Size: "7.4 MB",
    Type: "PDF",
    Modified: "Jan 8, 2025",
    Time: "08:20:13 PM",
    Image: "file-02.svg",
    ImageOne: "avatar-15.jpg",
    ImageTwo: "avatar-16.jpg",
    ImageThree: "avatar-05.jpg",
    ImageFOur: "avatar-06.jpg",
  },
  {
    key: "3",
    Name: "Gallery",
    Size: "6.1 MB",
    Type: "Image",
    Modified: "Aug 6, 2025",
    Time: "04:10:12 PM",
    Image: "file-03.svg",
    ImageOne: "avatar-02.jpg",
    ImageTwo: "avatar-03.jpg",
    ImageThree: "avatar-05.jpg",
    ImageFOur: "avatar-06.jpg",
  },
  {
    key: "4",
    Name: "Doris Crowley",
    Size: "5.2 MB",
    Type: "Folder",
    Modified: "Jan 6, 2025",
    Time: "03:40:14 PM",
    Image: "file-04.svg",
    ImageOne: "avatar-06.jpg",
    ImageTwo: "avatar-10.jpg",
    ImageThree: "avatar-15.jpg",
    ImageFOur: "avatar-06.jpg",
  },
  {
    key: "5",
    Name: "Cheat_codez",
    Size: "8 MB",
    Type: "Xml",
    Modified: "Oct 12, 2025",
    Time: "05:00:14 PM",
    Image: "file-05.svg",
    ImageOne: "avatar-28.jpg",
    ImageTwo: "avatar-14.jpg",
    ImageThree: "avatar-15.jpg",
    ImageFOur: "avatar-06.jpg",
  },
];
const rowSelection = {
  onChange: () => { },
  onSelect: () => { },
  onSelectAll: () => { },
};
export default {
  data() {
    return {
      data,
      columns,
      rowSelection,
      searchQuery: '',
    };
  },
  methods: {
    getImageUrl(imageName) {
      return new URL(`/src/assets/img/icons/${imageName}`, import.meta.url).href;
    },
    getImageUrlOne(imageNameOne) {
      return new URL(`/src/assets/img/profiles/${imageNameOne}`, import.meta.url).href;
    }
  },
  computed: {
    filteredPages() {
      const query = this.searchQuery.toLowerCase();
      return this.data.filter((record) => {
        return (
          record.Name.toLowerCase().includes(query) ||
          record.Size.toLowerCase().includes(query) ||
          record.Type.toLowerCase().includes(query) ||
          record.Modified.toLowerCase().includes(query) ||
          record.Time.toLowerCase().includes(query)
        );
      });
    },
  },
};
</script>
