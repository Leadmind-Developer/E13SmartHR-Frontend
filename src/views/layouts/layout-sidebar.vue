<template>
	<!-- Sidebar -->
	<div class="sidebar" id="sidebar">
		<!-- Logo -->
		<div class="sidebar-logo">
			<router-link to="/dashboard/" class="logo logo-normal">
				<img src="@/assets/img/logo.jpeg" alt="Logo">
			</router-link>
			<router-link to="/dashboard/" class="logo-small">
				<img src="@/assets/img/logo-small.png" alt="Logo">
			</router-link>
			<router-link to="/dashboard/" class="dark-logo">
				<img src="@/assets/img/logo-white.png" alt="Logo">
			</router-link>
		</div>
		<!-- /Logo -->
		<div class="modern-profile p-3 pb-0">
			<div class="text-center rounded bg-light p-3 mb-4 user-profile">
				<div class="avatar avatar-lg online mb-3">
					<img src="@/assets/img/profiles/avatar-02.jpg" alt="Img" class="img-fluid rounded-circle">
				</div>
				<h6 class="fs-12 fw-normal mb-1">Adrian Herman</h6>
				<p class="fs-10">System Admin</p>
			</div>
			<div class="sidebar-nav mb-3">
				<ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent" role="tablist">
					<li class="nav-item"><a class="nav-link active border-0" href="javascript:void(0);">Menu</a></li>
					<li class="nav-item"><router-link class="nav-link border-0"
							to="/applications/chat">Chats</router-link></li>
					<li class="nav-item"><router-link class="nav-link border-0"
							to="/applications/email">Inbox</router-link></li>
				</ul>
			</div>
		</div>
		<div class="sidebar-header p-3 pb-0 pt-2">
			<div class="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
				<div class="avatar avatar-md onlin">
					<img src="@/assets/img/profiles/avatar-02.jpg" alt="Img" class="img-fluid rounded-circle">
				</div>
				<div class="text-start sidebar-profile-info ms-2">
					<h6 class="fs-12 fw-normal mb-1">Adrian Herman</h6>
					<p class="fs-10">System Admin</p>
				</div>
			</div>
			<div class="input-group input-group-flat d-inline-flex mb-4">
				<span class="input-icon-addon">
					<i class="ti ti-search"></i>
				</span>
				<input type="text" class="form-control" placeholder="Search in HRMS">
				<span class="input-group-text">
					<kbd>CTRL + / </kbd>
				</span>
			</div>
			<div class="d-flex align-items-center justify-content-between menu-item mb-3">
				<div class="me-3">
					<router-link to="/applications/events" class="btn btn-menubar">
						<i class="ti ti-layout-grid-remove"></i>
					</router-link>
				</div>
				<div class="me-3">
					<router-link to="/applications/chat" class="btn btn-menubar position-relative">
						<i class="ti ti-brand-hipchat"></i>
						<span
							class="badge bg-info rounded-pill d-flex align-items-center justify-content-center header-badge">5</span>
					</router-link>
				</div>
				<div class="me-3 notification-item">
					<router-link to="/crm/activity" class="btn btn-menubar position-relative me-1">
						<i class="ti ti-bell"></i>
						<span class="notification-status-dot"></span>
					</router-link>
				</div>
				<div class="me-0">
					<router-link to="/applications/email" class="btn btn-menubar">
						<i class="ti ti-message"></i>
					</router-link>
				</div>
			</div>
		</div>
		<div class="sidebar-inner slimscroll">
			<div id="sidebar-menu" class="sidebar-menu">
				<sidebar-menu></sidebar-menu>
			</div>
		</div>
	</div>
	<!-- /Sidebar -->

	<horizontal-header></horizontal-header>
	<two-sidebar></two-sidebar>
	<stacked-sidebar></stacked-sidebar>
</template>