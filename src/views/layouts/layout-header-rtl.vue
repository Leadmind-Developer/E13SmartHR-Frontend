<template>
    <!-- Header -->
    <div class="header">
        <div class="main-header">

            <div class="header-left">
                <router-link to="/dashboard" class="logo">
                    <img src="@/assets/img/logo.jpeg" alt="Logo">
                </router-link>
                <router-link to="/dashboard" class="dark-logo">
                    <img src="@/assets/img/logo-white.png" alt="Logo">
                </router-link>
            </div>

            <a id="mobile_btn" class="mobile_btn" @click="toggleSidebar1" href="#sidebar">
                <span class="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </a>

            <div class="header-user">
                <div class="nav user-menu nav-list">

                    <div class="ms-auto d-flex align-items-center" id="header-search">
                        <a id="toggle_btn" href="javascript:void(0);" @click="toggleSidebar"
                            class="btn btn-menubar ms-2">
                            <i class="ti ti-arrow-bar-to-left"></i>
                        </a>
                        <!-- Search -->
                        <div class="input-group input-group-flat d-inline-flex ms-2">
                            <input type="text" class="form-control" placeholder="Search in HRMS">
                            <span class="input-group-text">
                                <kbd>CTRL + / </kbd>
                            </span>
                        </div>
                        <!-- /Search -->
                        <div class="dropdown crm-dropdown">
                            <a href="#" class="btn btn-menubar ms-2" data-bs-toggle="dropdown">
                                <i class="ti ti-layout-grid"></i>
                            </a>
                            <div class="dropdown-menu dropdown-lg dropdown-menu-start">
                                <div class="card mb-0 border-0 shadow-none">
                                    <div class="card-header">
                                        <h4>CRM</h4>
                                    </div>
                                    <div class="card-body pb-1">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <router-link to="/crm/contacts"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i class="ti ti-user-shield text-default me-2"></i>Contacts
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                                <router-link to="/crm/deals-grid"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i class="ti ti-heart-handshake text-default me-2"></i>Deals
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                                <router-link to="/crm/pipeline"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i
                                                            class="ti ti-timeline-event-text text-default me-2"></i>Pipeline
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                            </div>
                                            <div class="col-sm-6">
                                                <router-link to="/crm/companies-grid"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i class="ti ti-building text-default me-2"></i>Companies
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                                <router-link to="/crm/leads-grid"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i class="ti ti-user-check text-default me-2"></i>Leads
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                                <router-link to="/crm/activity"
                                                    class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                                    <span class="d-flex align-items-center me-3">
                                                        <i class="ti ti-activity text-default me-2"></i>Activities
                                                    </span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <router-link to="/general-settings/profile-settings" class="btn btn-menubar">
                            <i class="ti ti-settings-cog"></i>
                        </router-link>
                    </div>

                    <!-- Horizontal Single -->
                    <div class="sidebar sidebar-horizontal" id="horizontal-single">
                        <div class="sidebar-menu">
                            <div class="main-menu">
                                <ul class="nav-menu">
                                    <template v-for="item in sideBarData" :key="item.tittle">
                                        <template v-for="menu in item.menu" :key="menu.menuValue">
                                            <li v-if="!menu.hasSubRoute && !menu.hasSubRouteTwo">
                                                <router-link v-if="menu.route" :to="menu.route">
                                                    <i :class="'ti ti-' + menu.icon"></i>
                                                    <span>{{ menu.menuValue }}</span>
                                                </router-link>
                                            </li>
                                            <li class="submenu" v-else @click="expandSubMenus(menu)">
                                                <a href="javascript:void(0)"
                                                    :class="{ subdrop: menu.showSubRoute, 'active': isActive(menu) }">
                                                    <i :class="'ti ti-' + menu.icon"></i>
                                                    <span>{{ menu.menuValue }}</span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <ul
                                                    :class="{ 'd-block': menu.showSubRoute, 'd-none': !menu.showSubRoute }">
                                                    <template v-for="subMenu in menu.subMenus" :key="subMenu.menuValue">
                                                        <li
                                                            :class="{ 'submenu submenu-two': subMenu.customSubmenuTwo }">
                                                            <template v-if="!subMenu.customSubmenuTwo">
                                                                <router-link v-if="subMenu.route" :to="subMenu.route">{{
                                                                    subMenu.menuValue
                                                                }}</router-link>
                                                            </template>
                                                            <template v-else-if="subMenu.customSubmenuTwo">
                                                                <a href="javascript:void(0);"
                                                                    @click="openSubmenuOne(subMenu)"
                                                                    :class="{ subdrop: openSubmenuOneItem === subMenu || isSubActive(subMenu), 'active': isSubActive(subMenu) }">{{
                                                                        subMenu.menuValue }}<span
                                                                        class="menu-arrow inside-submenu"></span></a>
                                                                <ul
                                                                    :class="{ 'd-block': openSubmenuOneItem === subMenu, 'd-none': openSubmenuOneItem !== subMenu, }">
                                                                    <li v-for="subMenuTwo in subMenu.subMenusTwo"
                                                                        :key="subMenuTwo.menuValue">
                                                                        <router-link v-if="subMenuTwo.route"
                                                                            :to="subMenuTwo.route">{{
                                                                                subMenuTwo.menuValue
                                                                            }}</router-link>
                                                                    </li>
                                                                </ul>
                                                            </template>
                                                        </li>
                                                    </template>
                                                </ul>
                                            </li>
                                        </template>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /Horizontal Single -->

                    <div class="d-flex align-items-center">
                        <div class="ms-2">
                            <a href="#" class="btn btn-menubar btnFullscreen">
                                <i class="ti ti-maximize"></i>
                            </a>
                        </div>
                        <div class="dropdown ms-2">
                            <a href="#" class="btn btn-menubar" data-bs-toggle="dropdown">
                                <i class="ti ti-layout-grid-remove"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <div class="card mb-0 border-0 shadow-none">
                                    <div class="card-header">
                                        <h4>Applications</h4>
                                    </div>
                                    <div class="card-body">
                                        <router-link to="/applications/events" class="d-block pb-2">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-calendar text-gray-9"></i></span>Calendar
                                        </router-link>
                                        <router-link to="/applications/todo" class="d-block py-2">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-subtask text-gray-9"></i></span>To Do
                                        </router-link>
                                        <router-link to="/applications/notes" class="d-block py-2">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-notes text-gray-9"></i></span>Notes
                                        </router-link>
                                        <router-link to="/applications/file-manager" class="d-block py-2">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-folder text-gray-9"></i></span>File Manager
                                        </router-link>
                                        <router-link to="/applications/kanban-view" class="d-block py-2">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-layout-kanban text-gray-9"></i></span>Kanban
                                        </router-link>
                                        <router-link to="/applications/invoices" class="d-block py-2 pb-0">
                                            <span class="avatar avatar-md bg-transparent-dark me-2"><i
                                                    class="ti ti-file-invoice text-gray-9"></i></span>Invoices
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ms-2">
                            <router-link to="/applications/chat" class="btn btn-menubar position-relative">
                                <i class="ti ti-message"></i>
                                <span class="msg-status-dot"></span>
                            </router-link>
                        </div>
                        <div class="ms-2">
                            <router-link to="/applications/email" class="btn btn-menubar">
                                <i class="ti ti-mail"></i>
                            </router-link>
                        </div>
                        <div class="ms-2 notification_item">
                            <a href="#" class="btn btn-menubar position-relative ms-1" id="notification_popup"
                                data-bs-toggle="dropdown">
                                <i class="ti ti-bell"></i>
                                <span class="notification-status-dot"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                                <div
                                    class="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                                    <h4 class="notification-title">Notifications (2)</h4>
                                    <div class="d-flex align-items-center">
                                        <a href="#" class="text-primary fs-15 me-3 lh-1">Mark all as read</a>
                                        <div class="dropdown">
                                            <a href="javascript:void(0);" class="bg-white dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="ti ti-calendar-due me-1"></i>Today
                                            </a>
                                            <ul class="dropdown-menu mt-2 p-3">
                                                <li>
                                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                        This Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                        Last Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" class="dropdown-item rounded-1">
                                                        Last Month
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="noti-content">
                                    <div class="d-flex flex-column">
                                        <div class="border-bottom mb-3 pb-3">
                                            <router-link to="/crm/activity">
                                                <div class="d-flex">
                                                    <span class="avatar avatar-lg me-2 flex-shrink-0">
                                                        <img src="@/assets/img/profiles/avatar-27.jpg" alt="Profile">
                                                    </span>
                                                    <div class="flex-grow-1">
                                                        <p class="mb-1"><span class="text-dark fw-semibold">Shawn</span>
                                                            performance in Math is below the threshold.</p>
                                                        <span>Just Now</span>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="border-bottom mb-3 pb-3">
                                            <router-link to="/crm/activity" class="pb-0">
                                                <div class="d-flex">
                                                    <span class="avatar avatar-lg me-2 flex-shrink-0">
                                                        <img src="@/assets/img/profiles/avatar-23.jpg" alt="Profile">
                                                    </span>
                                                    <div class="flex-grow-1">
                                                        <p class="mb-1"><span
                                                                class="text-dark fw-semibold">Sylvia</span> added
                                                            appointment on 02:00 PM</p>
                                                        <span>10 mins ago</span>
                                                        <div
                                                            class="d-flex justify-content-start align-items-center mt-1">
                                                            <span class="btn btn-light btn-sm me-2">Deny</span>
                                                            <span class="btn btn-primary btn-sm">Approve</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="border-bottom mb-3 pb-3">
                                            <router-link to="/crm/activity">
                                                <div class="d-flex">
                                                    <span class="avatar avatar-lg me-2 flex-shrink-0">
                                                        <img src="@/assets/img/profiles/avatar-25.jpg" alt="Profile">
                                                    </span>
                                                    <div class="flex-grow-1">
                                                        <p class="mb-1">New student record <span
                                                                class="text-dark fw-semibold">
                                                                George</span> is created
                                                            by <span class="text-dark fw-semibold">Teressa</span></p>
                                                        <span>2 hrs ago</span>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="border-0 mb-3 pb-0">
                                            <router-link to="/crm/activity">
                                                <div class="d-flex">
                                                    <span class="avatar avatar-lg me-2 flex-shrink-0">
                                                        <img src="@/assets/img/profiles/avatar-01.jpg" alt="Profile">
                                                    </span>
                                                    <div class="flex-grow-1">
                                                        <p class="mb-1">A new teacher record for <span
                                                                class="text-dark fw-semibold">Elisa</span> </p>
                                                        <span>09:45 AM</span>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex p-0">
                                    <a href="#" class="btn btn-light w-100 me-2">Cancel</a>
                                    <router-link to="/crm/activity" class="btn btn-primary w-100">View All</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown profile-dropdown">
                            <a href="javascript:void(0);" class="dropdown-toggle d-flex align-items-center"
                                data-bs-toggle="dropdown">
                                <span class="avatar avatar-md online">
                                    <img src="@/assets/img/profiles/avatar-12.jpg" alt="Img"
                                        class="img-fluid rounded-circle">
                                </span>
                            </a>
                            <div class="dropdown-menu shadow-none">
                                <div class="card mb-0">
                                    <div class="card-header">
                                        <div class="d-flex align-items-center">
                                            <span class="avatar avatar-lg me-2 avatar-rounded">
                                                <img src="@/assets/img/profiles/avatar-12.jpg" alt="img">
                                            </span>
                                            <div>
                                                <h5 class="mb-0">Kevin Larry</h5>
                                                <p class="fs-12 fw-medium mb-0">warren@example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                            to="/pages/profile">
                                            <i class="ti ti-user-circle me-1"></i>My Profile
                                        </router-link>
                                        <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                            to="/website-settings/business-settings">
                                            <i class="ti ti-settings me-1"></i>Settings
                                        </router-link>

                                        <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                            to="/general-settings/profile-settings">
                                            <i class="ti ti-circle-arrow-up me-1"></i>My Account
                                        </router-link>
                                        <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                            to="/supports/knowledgebase">
                                            <i class="ti ti-question-mark me-1"></i>Knowledge Base
                                        </router-link>
                                    </div>
                                    <div class="card-footer">
                                        <router-link class="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                            to="/login">
                                            <i class="ti ti-login me-2"></i>Logout
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="dropdown mobile-user-menu">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-end">
                    <router-link class="dropdown-item" to="/pages/profile">My Profile</router-link>
                    <router-link class="dropdown-item" to="/general-settings/profile-settings">Settings</router-link>
                    <router-link class="dropdown-item" to="/login">Logout</router-link>
                </div>
            </div>
            <!-- /Mobile Menu -->

        </div>
    </div>
    <!-- /Header -->
    <theme-settings v-if="!shouldHideThemeSettings"></theme-settings>
</template>
<script>
import sideBarData from "@/assets/json/sidebar-menuone.json";

export default {
    data() {
        return {
            notificationClass: "pe-1",
            sideBarData: sideBarData,
            openMenuItem: null,
            openSubmenuOneItem: null,
            route_array: [],
        };
    },
    computed: {
        shouldHideThemeSettings() {
            const hiddenLayouts = [
                "/layouts/layout-horizontal",
                "/layouts/layout-detached",
                "/layouts/layout-modern",
                "/layouts/layout-two-column",
                "/layouts/layout-hovered",
                "/layouts/layout-box",
                "/layouts/layout-horizontal-overlay",
                "/layouts/layout-horizontal-box",
                "/layouts/layout-horizontal-sidemenu",
                "/layouts/layout-vertical-transparent",
                "/layouts/layout-without-header",
                "/layouts/layout-dark",
                "/layouts/layout-rtl"
            ];
            return hiddenLayouts.includes(this.$route.path);
        },
        isActive() {
            return (menu) => {
                let result = this.$route.path.split('/').filter(part => part);
                let base = result[0];
                return base === menu.active_link || base === menu.active_link1
            }
        },
        isSubActive() {
            return (menu) => {
                let result = this.$route.path.split('/').filter(part => part);
                let base = result[0];
                return base === menu.active_link
            }
        }
    },
    mounted() {
        this.initMouseoverListener();
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    },
    methods: {
        handleClick(event) {
            event.stopPropagation();

            if (this.notificationClass === "pe-1 notification-item-show") {
                // If the class is already present, remove it
                this.notificationClass = "";
                document.removeEventListener("click", this.handleOutsideClick);
            } else {
                // If the class is not present, add it
                this.notificationClass = "pe-1 notification-item-show";
                document.addEventListener("click", this.handleOutsideClick);
            }
        },
        handleOutsideClick(event) {
            // Check if the click was outside the notification item
            const notificationItem = event.target.closest(".notification-item");
            if (!notificationItem) {
                this.notificationClass = "";
                // Remove the event listener
                document.removeEventListener("click", this.handleOutsideClick);
            }
        },
        toggleSidebar1() {
            const body = document.body;
            body.classList.toggle("slide-nav");
        },
        toggleSidebar() {
            const body = document.body;
            body.classList.toggle("mini-sidebar");
        },

        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },

        initMouseoverListener() {
            document.addEventListener("mouseover", this.handleMouseover);
        },
        handleMouseover(e) {
            e.stopPropagation();

            const body = document.body;
            const toggleBtn = document.getElementById("toggle_btn");

            if (body.classList.contains("mini-sidebar") && this.isElementVisible(toggleBtn)) {
                const target = e.target.closest(".sidebar, .header-left");

                if (target) {
                    body.classList.add("expand-menu");
                    this.slideDownSubmenu();
                } else {
                    body.classList.remove("expand-menu");
                    this.slideUpSubmenu();
                }

                e.preventDefault();
            }
        },
        isElementVisible(element) {
            return element.offsetWidth > 0 || element.offsetHeight > 0;
        },
        slideDownSubmenu() {
            // Force show all submenus when expanding in mini-sidebar mode
            const subdropElements = document.querySelectorAll(".subdrop");
            subdropElements.forEach(element => {
                const submenu = element.nextElementSibling;
                if (submenu && submenu.tagName.toLowerCase() === "ul") {
                    submenu.style.display = "block";
                    submenu.classList.remove("d-none");
                    submenu.classList.add("d-block");
                }
            });
        },
        slideUpSubmenu() {
            // Hide all submenus when collapsing in mini-sidebar mode
            const subdropElements = document.querySelectorAll(".subdrop");
            subdropElements.forEach(element => {
                const submenu = element.nextElementSibling;
                if (submenu && submenu.tagName.toLowerCase() === "ul") {
                    submenu.style.display = "none";
                    submenu.classList.remove("d-block");
                    submenu.classList.add("d-none");
                }
            });
        },
        expandSubMenus(menu) {
            this.sideBarData.forEach((item) => {
                item.menu.forEach((subMenu) => {
                    if (subMenu !== menu) {
                        subMenu.showSubRoute = false;
                    }
                });
            });
            menu.showSubRoute = !menu.showSubRoute;
        },
        openMenu(menu) {
            this.openMenuItem = this.openMenuItem === menu ? null : menu;
        },
        openSubmenuOne(subMenus) {
            this.openSubmenuOneItem = this.openSubmenuOneItem === subMenus ? null : subMenus;
        },
    },
    beforeUnmount() {
        document.removeEventListener("mouseover", this.handleMouseover);
        document.removeEventListener("click", this.handleOutsideClick);
    },
};
</script>