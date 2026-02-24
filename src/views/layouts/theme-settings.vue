<template>
    <div class="sidebar-contact ">
        <div class="toggle-theme" data-bs-toggle="offcanvas" data-bs-target="#theme-setting"><i
                class="fa fa-cog fa-w-16 fa-spin"></i></div>
    </div>
    <div class="sidebar-themesettings offcanvas offcanvas-end" id="theme-setting">
        <div class="offcanvas-header d-flex align-items-center justify-content-between bg-dark">
            <div>
                <h3 class="mb-1 text-white">Theme Customizer</h3>
                <p class="text-light">Choose your themes & layouts etc.</p>
            </div>
            <a href="javascript:void(0);"
                class="custom-btn-close d-flex align-items-center justify-content-center text-white"
                data-bs-dismiss="offcanvas"><i class="ti ti-x"></i></a>
        </div>
        <div class="themesettings-inner offcanvas-body">
            <div class="accordion accordion-customicon1 accordions-items-seperate" id="settingtheme">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#layoutsetting" aria-expanded="true" aria-controls="collapsecustomicon1One">
                            Select Layouts
                        </button>
                    </h2>
                    <div id="layoutsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="row gx-3">
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-layout', 'default')">
                                        <input type="radio" name="LayoutTheme" id="defaultLayout" value="default"
                                            :checked="themeSettings['data-layout'] === 'default'">
                                        <label for="defaultLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/default.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Default</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-layout', 'mini')">
                                        <input type="radio" name="LayoutTheme" id="miniLayout" value="mini"
                                            :checked="themeSettings['data-layout'] === 'mini'">
                                        <label for="miniLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/mini.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Mini</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'horizontal')">
                                        <input type="radio" name="LayoutTheme" id="horizontalLayout" value="horizontal"
                                            :checked="themeSettings['data-layout'] === 'horizontal'">
                                        <label for="horizontalLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/horizontal.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Horizontal</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'horizontal-single')">
                                        <input type="radio" name="LayoutTheme" id="horizontal-singleLayout"
                                            value="horizontal-single"
                                            :checked="themeSettings['data-layout'] === 'horizontal-single'">
                                        <label for="horizontal-singleLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/horizontal-single.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Horizontal Single</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'detached')">
                                        <input type="radio" name="LayoutTheme" id="detachedLayout" value="detached"
                                            :checked="themeSettings['data-layout'] === 'detached'">
                                        <label for="detachedLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/horizontal-single.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Detached</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'twocolumn')">
                                        <input type="radio" name="LayoutTheme" id="twocolumnLayout" value="twocolumn"
                                            :checked="themeSettings['data-layout'] === 'twocolumn'">
                                        <label for="twocolumnLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/two-column.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Two Column</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'without-header')">
                                        <input type="radio" name="LayoutTheme" id="without-headerLayout"
                                            value="without-header"
                                            :checked="themeSettings['data-layout'] === 'without-header'">
                                        <label for="without-headerLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/without-header.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Without Header</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'horizontal-overlay')">
                                        <input type="radio" name="LayoutTheme" id="horizontal-overlayLayout"
                                            value="horizontal-overlay"
                                            :checked="themeSettings['data-layout'] === 'horizontal-overlay'">
                                        <label for="horizontal-overlayLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/overlay.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Overlay</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'horizontal-sidemenu')">
                                        <input type="radio" name="LayoutTheme" id="horizontal-sidemenuLayout"
                                            value="horizontal-sidemenu"
                                            :checked="themeSettings['data-layout'] === 'horizontal-sidemenu'">
                                        <label for="horizontal-sidemenuLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/menu-aside.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Menu Aside</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-layout', 'stacked')">
                                        <input type="radio" name="LayoutTheme" id="stackedLayout" value="stacked"
                                            :checked="themeSettings['data-layout'] === 'stacked'">
                                        <label for="stackedLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/stacked.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Menu Stacked</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-layout', 'modern')">
                                        <input type="radio" name="LayoutTheme" id="modernLayout" value="modern"
                                            :checked="themeSettings['data-layout'] === 'modern'">
                                        <label for="modernLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/modern.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Modern</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-layout', 'transparent')">
                                        <input type="radio" name="LayoutTheme" id="transparentLayout"
                                            value="transparent"
                                            :checked="themeSettings['data-layout'] === 'transparent'">
                                        <label for="transparentLayout">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/transparent.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Transparent</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div @click="handleRTLNavigation" class="theme-layout mb-3">
                                        <span class="d-block mb-2 layout-img">
                                            <img src="@/assets/img/theme/rtl.svg" alt="img">
                                        </span>
                                        <span class="layout-type">RTL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarsetting" aria-expanded="true">
                            Layout Width
                        </button>
                    </h2>
                    <div id="sidebarsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="d-flex align-items-center">
                                <div class="theme-width m-1 me-2" @click="handleUpdateTheme('data-width', 'fluid')">
                                    <input type="radio" name="width" id="fluidWidth" value="fluid"
                                        :checked="themeSettings['data-width'] === 'fluid'">
                                    <label for="fluidWidth" class="d-block rounded fs-12">
                                        Fluid Layout
                                    </label>
                                </div>
                                <div class="theme-width m-1" @click="handleUpdateTheme('data-width', 'box')">
                                    <input type="radio" name="width" id="boxWidth" value="box"
                                        :checked="themeSettings['data-width'] === 'box'">
                                    <label for="boxWidth" class="d-block rounded fs-12">Boxed Layout
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#cardsetting" aria-expanded="true" aria-controls="collapsecustomicon1One">
                            Card Layout
                        </button>
                    </h2>
                    <div id="cardsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body pb-0">
                            <div class="row gx-3">
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-card', 'bordered')">
                                        <input type="radio" name="card" id="borderedCard" value="bordered"
                                            :checked="themeSettings['data-card'] === 'bordered'">
                                        <label for="borderedCard">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/bordered.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Bordered</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3"
                                        @click="handleUpdateTheme('data-card', 'borderless')">
                                        <input type="radio" name="card" id="borderlessCard" value="borderless"
                                            :checked="themeSettings['data-card'] === 'borderless'">
                                        <label for="borderlessCard">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/borderless.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Borderless</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-card', 'shadow')">
                                        <input type="radio" name="card" id="shadowCard" value="shadow"
                                            :checked="themeSettings['data-card'] === 'shadow'">
                                        <label for="shadowCard">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/shadow.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Only Shadow</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarsetting" aria-expanded="true">
                            Sidebar Color
                        </button>
                    </h2>
                    <div id="sidebarsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="d-flex align-items-center">
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'light')">
                                    <input type="radio" name="sidebar" id="lightSidebar" value="light"
                                        :checked="themeSettings['data-sidebar'] === 'light'">
                                    <label for="lightSidebar" class="d-block rounded mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'darkgreen')">
                                    <input type="radio" name="sidebar" id="darkgreenSidebar" value="darkgreen"
                                        :checked="themeSettings['data-sidebar'] === 'darkgreen'">
                                    <label for="darkgreenSidebar" class="d-block rounded bg-darkgreen mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'nightblue')">
                                    <input type="radio" name="sidebar" id="nightblueSidebar" value="nightblue"
                                        :checked="themeSettings['data-sidebar'] === 'nightblue'">
                                    <label for="nightblueSidebar" class="d-block rounded bg-nightblue mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'darkgray')">
                                    <input type="radio" name="sidebar" id="darkgraySidebar" value="darkgray"
                                        :checked="themeSettings['data-sidebar'] === 'darkgray'">
                                    <label for="darkgraySidebar" class="d-block rounded bg-darkgray mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'royalblue')">
                                    <input type="radio" name="sidebar" id="royalblueSidebar" value="royalblue"
                                        :checked="themeSettings['data-sidebar'] === 'royalblue'">
                                    <label for="royalblueSidebar" class="d-block rounded bg-royalblue mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 me-2"
                                    @click="handleUpdateTheme('data-sidebar', 'indigo')">
                                    <input type="radio" name="sidebar" id="indigoSidebar" value="indigo"
                                        :checked="themeSettings['data-sidebar'] === 'indigo'">
                                    <label for="indigoSidebar" class="d-block rounded bg-indigo mb-2">
                                    </label>
                                </div>
                                <div class="theme-colorselect m-1 mt-0">
                                    <div class="theme-container-background"></div>
                                    <div class="pickr-container-background">
                                        <ColorPicker :value="customSidebarColor"
                                            :checked="themeSettings['data-sidebar'] === 'primary'"
                                            :format="customSidebarFormat" @change="handleSidebarColorChange"
                                            @format-change="handleSidebarFormatChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#modesetting" aria-expanded="true">
                            Color Mode
                        </button>
                    </h2>
                    <div id="modesetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="row gx-3">
                                <div class="col-6">
                                    <div class="theme-mode" @click="handleUpdateTheme('data-theme', 'light')">
                                        <input type="radio" name="theme" id="lightTheme" value="light"
                                            :checked="themeSettings['data-theme'] === 'light'">
                                        <label for="lightTheme" class="p-2 rounded fw-medium w-100">
                                            <span class="avatar avatar-md d-inline-flex rounded me-2"><i
                                                    class="ti ti-sun-filled"></i></span>Light Mode
                                        </label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="theme-mode" @click="handleUpdateTheme('data-theme', 'dark')">
                                        <input type="radio" name="theme" id="darkTheme" value="dark"
                                            :checked="themeSettings['data-theme'] === 'dark'">
                                        <label for="darkTheme" class="p-2 rounded fw-medium w-100">
                                            <span class="avatar avatar-md d-inline-flex rounded me-2"><i
                                                    class="ti ti-moon-filled"></i></span>Dark Mode
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sizesetting" aria-expanded="true" aria-controls="collapsecustomicon1One">
                            Sidebar Size
                        </button>
                    </h2>
                    <div id="sizesetting" class="accordion-collapse collapse show">
                        <div class="accordion-body pb-0">
                            <div class="row gx-3">
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-size', 'default')">
                                        <input type="radio" name="size" id="defaultSize" value="default"
                                            :checked="themeSettings['data-size'] === 'default'">
                                        <label for="defaultSize">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/default.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Default</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-size', 'compact')">
                                        <input type="radio" name="size" id="compactSize" value="compact"
                                            :checked="themeSettings['data-size'] === 'compact'">
                                        <label for="compactSize">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/compact.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Compact</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="theme-layout mb-3" @click="handleUpdateTheme('data-size', 'hoverview')">
                                        <input type="radio" name="size" id="hoverviewSize" value="hoverview"
                                            :checked="themeSettings['data-size'] === 'hoverview'">
                                        <label for="hoverviewSize">
                                            <span class="d-block mb-2 layout-img">
                                                <img src="@/assets/img/theme/hoverview.svg" alt="img">
                                            </span>
                                            <span class="layout-type">Hover View</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#colorsetting" aria-expanded="true">
                            Top Bar Color
                        </button>
                    </h2>
                    <div id="colorsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body pb-1">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'white')">
                                    <input type="radio" name="topbar" id="whiteTopbar" value="white"
                                        :checked="themeSettings['data-topbar'] === 'white'">
                                    <label for="whiteTopbar" class="white-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'darkaqua')">
                                    <input type="radio" name="topbar" id="darkaquaTopbar" value="darkaqua"
                                        :checked="themeSettings['data-topbar'] === 'darkaqua'">
                                    <label for="darkaquaTopbar" class="darkaqua-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'whiterock')">
                                    <input type="radio" name="topbar" id="whiterockTopbar" value="whiterock"
                                        :checked="themeSettings['data-topbar'] === 'whiterock'">
                                    <label for="whiterockTopbar" class="whiterock-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'rockblue')">
                                    <input type="radio" name="topbar" id="rockblueTopbar" value="rockblue"
                                        :checked="themeSettings['data-topbar'] === 'rockblue'">
                                    <label for="rockblueTopbar" class="rockblue-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'bluehaze')">
                                    <input type="radio" name="topbar" id="bluehazeTopbar" value="bluehaze"
                                        :checked="themeSettings['data-topbar'] === 'bluehaze'">
                                    <label for="bluehazeTopbar" class="bluehaze-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'orangegradient')">
                                    <input type="radio" name="topbar" id="orangeGradientTopbar" value="orangegradient"
                                        :checked="themeSettings['data-topbar'] === 'orangegradient'">
                                    <label for="orangeGradientTopbar" class="orange-gradient-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'purplegradient')">
                                    <input type="radio" name="topbar" id="purpleGradientTopbar" value="purplegradient"
                                        :checked="themeSettings['data-topbar'] === 'purplegradient'">
                                    <label for="purpleGradientTopbar" class="purple-gradient-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'bluegradient')">
                                    <input type="radio" name="topbar" id="blueGradientTopbar" value="bluegradient"
                                        :checked="themeSettings['data-topbar'] === 'bluegradient'">
                                    <label for="blueGradientTopbar" class="blue-gradient-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 me-3"
                                    @click="handleUpdateTheme('data-topbar', 'maroongradient')">
                                    <input type="radio" name="topbar" id="maroonGradientTopbar" value="maroongradient"
                                        :checked="themeSettings['data-topbar'] === 'maroongradient'">
                                    <label for="maroonGradientTopbar" class="maroon-gradient-topbar"></label>
                                </div>
                                <div class="theme-colorselect mb-3 mt-0">
                                    <div class="theme-topbar"></div>
                                    <div class="pickr-topbar">
                                        <ColorPicker :value="customTopbarColor"
                                            :checked="themeSettings['data-topbar'] === 'primary'"
                                            :format="customTopbarFormat" @change="handleTopbarColorChange"
                                            @format-change="handleTopbarFormatChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#topcolorsetting" aria-expanded="true">
                            Top Bar Background
                        </button>
                    </h2>
                    <div id="topcolorsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <h6 class="mb-1 fw-medium">Pattern</h6>
                            <!-- <div class="d-flex align-items-center">
                                <div class="theme-topbarbg me-3 mb-2"
                                    @click="handleUpdateTheme('data-topbarbg', 'pattern1')">
                                    <input type="radio" name="topbarbg" id="pattern1" value="pattern1"
                                        :checked="themeSettings['data-topbarbg'] === 'pattern1'">
                                    <label for="pattern1" class="d-block rounded">
                                        <img src="@/assets/img/theme/pattern-01.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-topbarbg me-3 mb-2"
                                    @click="handleUpdateTheme('data-topbarbg', 'pattern2')">
                                    <input type="radio" name="topbarbg" id="pattern2" value="pattern2"
                                        :checked="themeSettings['data-topbarbg'] === 'pattern2'">
                                    <label for="pattern2" class="d-block rounded">
                                        <img src="@/assets/img/theme/pattern-02.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-topbarbg me-3 mb-2"
                                    @click="handleUpdateTheme('data-topbarbg', 'pattern3')">
                                    <input type="radio" name="topbarbg" id="pattern3" value="pattern3"
                                        :checked="themeSettings['data-topbarbg'] === 'pattern3'">
                                    <label for="pattern3" class="d-block rounded">
                                        <img src="@/assets/img/theme/pattern-03.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                            </div> -->
                            <h6 class="mb-1 fw-medium">Colors</h6>
                            <div class="d-flex align-items-center">
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'white')">
                                    <input type="radio" name="topbarcolor" id="whiteTopbarcolor" value="white"
                                        :checked="themeSettings['data-topbarcolor'] === 'white'">
                                    <label for="whiteTopbarcolor" class="white-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'primary')">
                                    <input type="radio" name="topbarcolor" id="primaryTopbarcolor" value="primary"
                                        :checked="themeSettings['data-topbarcolor'] === 'primary'">
                                    <label for="primaryTopbarcolor" class="primary-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'blackpearl')">
                                    <input type="radio" name="topbarcolor" id="blackpearlTopbarcolor" value="blackpearl"
                                        :checked="themeSettings['data-topbarcolor'] === 'blackpearl'">
                                    <label for="blackpearlTopbarcolor" class="blackpearl-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'maroon')">
                                    <input type="radio" name="topbarcolor" id="maroonTopbarcolor" value="maroon"
                                        :checked="themeSettings['data-topbarcolor'] === 'maroon'">
                                    <label for="maroonTopbarcolor" class="maroon-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'bluegem')">
                                    <input type="radio" name="topbarcolor" id="bluegemTopbarcolor" value="bluegem"
                                        :checked="themeSettings['data-topbarcolor'] === 'bluegem'">
                                    <label for="bluegemTopbarcolor" class="bluegem-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 me-3"
                                    @click="handleUpdateTheme('data-topbarcolor', 'firefly')">
                                    <input type="radio" name="topbarcolor" id="fireflyTopbarcolor" value="firefly"
                                        :checked="themeSettings['data-topbarcolor'] === 'firefly'">
                                    <label for="fireflyTopbarcolor" class="firefly-topbar"></label>
                                </div>
                                <div class="theme-colorselect m-1 mt-0">
                                    <div class="theme-topbarcolor"></div>
                                    <div class="pickr-topbarcolor">
                                        <ColorPicker :value="customTopbarColor"
                                            :checked="themeSettings['data-topbarcolor'] === 'primary'"
                                            :format="customTopbarFormat" @change="handleTopbarColorChange"
                                            @format-change="handleTopbarFormatChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarbgsetting" aria-expanded="true">
                            Sidebar Background
                        </button>
                    </h2>
                    <div id="sidebarbgsetting" class="accordion-collapse collapse show">
                        <div class="accordion-body pb-1">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg1')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg1" value="sidebarbg1"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg1'">
                                    <label for="sidebarBg1" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-01.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg2')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg2" value="sidebarbg2"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg2'">
                                    <label for="sidebarBg2" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-02.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg3')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg3" value="sidebarbg3"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg3'">
                                    <label for="sidebarBg3" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-03.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg4')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg4" value="sidebarbg4"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg4'">
                                    <label for="sidebarBg4" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-04.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg5')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg5" value="sidebarbg5"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg5'">
                                    <label for="sidebarBg5" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-05.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                                <div class="theme-sidebarbg me-3 mb-3"
                                    @click="handleUpdateTheme('data-sidebarbg', 'sidebarbg6')">
                                    <input type="radio" name="sidebarbg" id="sidebarBg6" value="sidebarbg6"
                                        :checked="themeSettings['data-sidebarbg'] === 'sidebarbg6'">
                                    <label for="sidebarBg6" class="d-block rounded">
                                        <img src="@/assets/img/theme/sidebar-bg-06.svg" alt="img" class="rounded">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarcolor" aria-expanded="true">
                            Theme Colors
                        </button>
                    </h2>
                    <div id="sidebarcolor" class="accordion-collapse collapse show">
                        <div class="accordion-body pb-2">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'primary')">
                                    <input type="radio" name="color" id="primaryColor" value="primary"
                                        :checked="themeSettings['data-color'] === 'primary'">
                                    <label for="primaryColor" class="primary-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'brightblue')">
                                    <input type="radio" name="color" id="brightblueColor" value="brightblue"
                                        :checked="themeSettings['data-color'] === 'brightblue'">
                                    <label for="brightblueColor" class="brightblue-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'lunargreen')">
                                    <input type="radio" name="color" id="lunargreenColor" value="lunargreen"
                                        :checked="themeSettings['data-color'] === 'lunargreen'">
                                    <label for="lunargreenColor" class="lunargreen-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'lavendar')">
                                    <input type="radio" name="color" id="lavendarColor" value="lavendar"
                                        :checked="themeSettings['data-color'] === 'lavendar'">
                                    <label for="lavendarColor" class="lavendar-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'magenta')">
                                    <input type="radio" name="color" id="magentaColor" value="magenta"
                                        :checked="themeSettings['data-color'] === 'magenta'">
                                    <label for="magentaColor" class="magenta-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'chromeyellow')">
                                    <input type="radio" name="color" id="chromeyellowColor" value="chromeyellow"
                                        :checked="themeSettings['data-color'] === 'chromeyellow'">
                                    <label for="chromeyellowColor" class="chromeyellow-clr"></label>
                                </div>
                                <div class="theme-colorsset me-2 mb-2"
                                    @click="handleUpdateTheme('data-color', 'lavared')">
                                    <input type="radio" name="color" id="lavaredColor" value="lavared"
                                        :checked="themeSettings['data-color'] === 'lavared'">
                                    <label for="lavaredColor" class="lavared-clr"></label>
                                </div>
                                <div class="theme-colorsset mb-2">
                                    <div class="pickr-container-primary" onchange="updateChartColor(this.value)">
                                        <ColorPicker :value="customPrimaryColor"
                                            :checked="themeSettings['data-color'] === 'primary'"
                                            :format="customPrimaryFormat" @change="handlePrimaryColorChange"
                                            @format-change="handlePrimaryFormatChange" />
                                    </div>
                                    <div class="theme-container-primary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button text-dark fs-16" type="button" data-bs-toggle="collapse"
                            data-bs-target="#loadersetting" aria-expanded="true">
                            Preloader
                        </button>
                    </h2>
                    <div id="loadersetting" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="d-flex align-items-center">
                                <div class="theme-width me-2" @click="handleUpdateTheme('data-loader', 'enable')">
                                    <input type="radio" name="loader" id="enableLoader" value="enable"
                                        :checked="themeSettings['data-loader'] === 'enable'">
                                    <label for="enableLoader" class="d-block rounded fs-12">With Preloader
                                    </label>
                                </div>
                                <div class="theme-width" @click="handleUpdateTheme('data-loader', 'disable')">
                                    <input type="radio" name="loader" id="disableLoader" value="disable"
                                        :checked="themeSettings['data-loader'] === 'disable'">
                                    <label for="disableLoader" class="d-block rounded fs-12">Without Preloader
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 pt-0">
            <div class="row gx-3">
                <div class="col-6">
                    <a href="javascript:void(0);" id="resetbutton" class="btn btn-light close-theme w-100"
                        @click.prevent="handleResetTheme"><i class="ti ti-restore me-1"></i>Reset</a>
                </div>
                <div class="col-6">
                    <a href="https://preview.themeforest.net/item/smarthr-bootstrap-admin-panel-template/full_screen_preview/21153150"
                        target="_blank" class="btn btn-primary w-100" data-bs-dismiss="offcanvas"><i
                            class="ti ti-shopping-cart-plus me-1"></i>Buy Product</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
    components: { ColorPicker },

    data() {
        const savedSettings = localStorage.getItem("smarthr_theme_settings");
        const initialSettings = savedSettings ? JSON.parse(savedSettings) : {
            "data-layout": "default",
            "data-width": "fluid",
            "data-sidebar": "light",
            "data-size": "default",
            "data-topbar": "white",
            "data-sidebarbg": "default",
            "data-color": "primary",
            "data-theme": "light",
            "data-card": "bordered",
            "data-loader": "disable",
            "data-topbarbg": "default",
            "data-topbarcolor": "white",
        };

        return {
            themeSettings: initialSettings,

            customPrimaryColor: localStorage.getItem("smarthr_customPrimaryColor") || "rgba(59, 125, 221, 1)",
            customPrimaryFormat: localStorage.getItem("smarthr_customPrimaryFormat") || "rgba",

            customTopbarColor: localStorage.getItem("smarthr_customTopbarColor") || "rgba(59, 125, 221, 1)",
            customTopbarFormat: localStorage.getItem("smarthr_customTopbarFormat") || "rgba",

            customSidebarColor: localStorage.getItem("smarthr_customSidebarColor") || "rgba(59, 125, 221, 1)",
            customSidebarFormat: localStorage.getItem("smarthr_customSidebarFormat") || "rgba",

            miniSidebar: false,
            expandMenu: false,
        };
    },

    mounted() {
        Object.keys(this.themeSettings).forEach((key) => {
            document.documentElement.setAttribute(key, this.themeSettings[key]);
        });

        this.applyPrimaryCustomColor(this.customPrimaryColor);
        this.applySidebarCustomColor(this.customSidebarColor);
        this.applyTopbarCustomColor(this.customTopbarColor);

        this.updateBodyClasses();
    },

    methods: {
        handleUpdateTheme(key, value) {
            this.themeSettings[key] = value;
            document.documentElement.setAttribute(key, value);
            this.updateBodyClasses();
            localStorage.setItem("smarthr_theme_settings", JSON.stringify(this.themeSettings));
        },

        // ----- PRIMARY COLOR -----
        handlePrimaryColorChange(value, rgbaValue) {
            this.customPrimaryColor = value;
            this.applyPrimaryCustomColor(rgbaValue || value);
            this.handleUpdateTheme("data-color", "all");
            localStorage.setItem("smarthr_customPrimaryColor", value);
        },
        handlePrimaryFormatChange(fmt) {
            this.customPrimaryFormat = fmt;
            localStorage.setItem("smarthr_customPrimaryFormat", fmt);
        },
        applyPrimaryCustomColor(colorString) {
            const rgb = this.convertColorToRgbChannels(colorString);
            if (rgb) {
                document.documentElement.style.setProperty("--primary-rgb-picr", rgb);
            }
        },

        // ----- TOPBAR COLOR -----
        handleTopbarColorChange(value, rgbaValue) {
            this.customTopbarColor = value;
            this.applyTopbarCustomColor(rgbaValue || value);
            this.handleUpdateTheme("data-topbar", "all");
            localStorage.setItem("smarthr_customTopbarColor", value);
        },
        handleTopbarFormatChange(fmt) {
            this.customTopbarFormat = fmt;
            localStorage.setItem("smarthr_customTopbarFormat", fmt);
        },
        applyTopbarCustomColor(colorString) {
            const rgb = this.convertColorToRgbChannels(colorString);
            if (rgb) {
                document.documentElement.style.setProperty("--topbar--rgb-picr", rgb);
            }
        },

        // ----- SIDEBAR COLOR -----
        handleSidebarColorChange(value, rgbaValue) {
            this.customSidebarColor = value;
            this.applySidebarCustomColor(rgbaValue || value);
            this.handleUpdateTheme("data-sidebar", "all");
            localStorage.setItem("smarthr_customSidebarColor", value);
        },
        handleSidebarFormatChange(fmt) {
            this.customSidebarFormat = fmt;
            localStorage.setItem("smarthr_customSidebarFormat", fmt);
        },
        applySidebarCustomColor(colorString) {
            const rgb = this.convertColorToRgbChannels(colorString);
            if (rgb) {
                document.documentElement.style.setProperty("--sidebar--rgb-picr", rgb);
            }
        },

        // ----- UTILS -----
        convertColorToRgbChannels(value) {
            if (!value) return null;

            if (value.startsWith("#")) {
                let hex = value.slice(1);
                if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                return `${r}, ${g}, ${b}`;
            }

            const rgba = value.match(/rgba?\(([^)]+)\)/i);
            if (rgba) {
                const [r, g, b] = rgba[1].split(",").map(n => parseFloat(n.trim()));
                return `${r}, ${g}, ${b}`;
            }

            return null;
        },

        updateBodyClasses() {
            const body = document.body;
            body.classList.remove("mini-sidebar", "expand-menu", "layout-box-mode", "menu-horizontal", "layout-mode-rtl");
            if (this.$route.path === "/layouts/layout-rtl") {
                body.classList.add("layout-mode-rtl");
                return;
            }

            if (this.miniSidebar || this.themeSettings["data-layout"] === "mini")
                body.classList.add("mini-sidebar");

            if (this.expandMenu && this.themeSettings["data-layout"] === "mini")
                body.classList.add("expand-menu");

            if (this.themeSettings["data-width"] === "box")
                body.classList.add("layout-box-mode");

            if (this.themeSettings["data-layout"] === "horizontal" || this.themeSettings["data-layout"] === "horizontal-single" || this.themeSettings["data-layout"] === "horizontal-overlay")
                body.classList.add("menu-horizontal");
        },

        handleRTLNavigation() {
            if (this.themeSettings["data-layout"] === "horizontal") {
                this.handleUpdateTheme("data-layout", "default");
            }
            this.$router.push("/layouts/layout-rtl");
        },

        // ----- RESET -----
        handleResetTheme() {
            localStorage.removeItem("smarthr_theme_settings");
            localStorage.removeItem("smarthr_customPrimaryColor");
            localStorage.removeItem("smarthr_customPrimaryFormat");
            localStorage.removeItem("smarthr_customTopbarColor");
            localStorage.removeItem("smarthr_customTopbarFormat");
            localStorage.removeItem("smarthr_customSidebarColor");
            localStorage.removeItem("smarthr_customSidebarFormat");

            this.themeSettings = {
                "data-layout": "default",
                "data-width": "fluid",
                "data-sidebar": "light",
                "data-size": "default",
                "data-topbar": "white",
                "data-sidebarbg": "default",
                "data-color": "primary",
                "data-theme": "light",
                "data-card": "bordered",
                "data-loader": "disable",
                "data-topbarbg": "default",
                "data-topbarcolor": "white",
            };

            this.customPrimaryColor = "rgba(59, 125, 221, 1)";
            this.customPrimaryFormat = "rgba";

            this.customTopbarColor = "rgba(59, 125, 221, 1)";
            this.customTopbarFormat = "rgba";

            this.customSidebarColor = "rgba(59, 125, 221, 1)";
            this.customSidebarFormat = "rgba";

            Object.keys(this.themeSettings).forEach((key) => {
                document.documentElement.setAttribute(key, this.themeSettings[key]);
            });

            this.applyPrimaryCustomColor(this.customPrimaryColor);
            this.applyTopbarCustomColor(this.customTopbarColor);
            this.applySidebarCustomColor(this.customSidebarColor);

            this.miniSidebar = false;
            this.expandMenu = false;

            this.updateBodyClasses();
        }
    }
};
</script>
