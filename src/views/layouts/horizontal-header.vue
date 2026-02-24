<template>
  <div class="sidebar sidebar-horizontal" id="horizontal-menu">
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
                <a href="javascript:void(0)" :class="{ subdrop: menu.showSubRoute, 'active': isActive(menu) }">
                  <i :class="'ti ti-' + menu.icon"></i>
                  <span>{{ menu.menuValue }}</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :class="{ 'd-block': menu.showSubRoute, 'd-none': !menu.showSubRoute }">
                  <template v-for="subMenu in menu.subMenus" :key="subMenu.menuValue">
                    <li :class="{ 'submenu submenu-two': subMenu.customSubmenuTwo }">
                      <template v-if="!subMenu.customSubmenuTwo">
                        <router-link v-if="subMenu.route" :to="subMenu.route">{{ subMenu.menuValue
                        }}</router-link>
                      </template>
                      <template v-else-if="subMenu.customSubmenuTwo">
                        <a href="javascript:void(0);" @click="openSubmenuOne(subMenu)"
                          :class="{ subdrop: openSubmenuOneItem === subMenu || isSubActive(subMenu), 'active': isSubActive(subMenu) }">{{
                            subMenu.menuValue }}<span class="menu-arrow inside-submenu"></span></a>
                        <ul
                          :class="{ 'd-block': openSubmenuOneItem === subMenu, 'd-none': openSubmenuOneItem !== subMenu, }">
                          <li v-for="subMenuTwo in subMenu.subMenusTwo" :key="subMenuTwo.menuValue">
                            <router-link v-if="subMenuTwo.route" :to="subMenuTwo.route">{{ subMenuTwo.menuValue
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
        <div class="d-xl-flex align-items-center d-none">
          <a href="javascript:void(0);" class="me-3 avatar avatar-sm">
            <img src="@/assets/img/profiles/avatar-07.jpg" alt="profile" class="rounded-circle" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sideBarData from "@/assets/json/sidebar-menuone.json";
export default {
  data() {
    return {
      sideBarData: sideBarData,
      openMenuItem: null,
      openSubmenuOneItem: null,
      route_array: [],
    };
  },
  computed: {
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
  methods: {
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
      this.expandSubMenus(menu);
    },
    openSubmenuOne(subMenus) {
      this.openSubmenuOneItem = this.openSubmenuOneItem === subMenus ? null : subMenus;
    },
  },
};
</script>
