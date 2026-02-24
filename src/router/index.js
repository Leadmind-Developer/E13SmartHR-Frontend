import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/stores/auth.store";
import { redirectAfterLogin } from "@/utils/auth-redirect";
import { TokenService } from "@/services/token.service";

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login-index',
    component: () => import('@/views/pages/authentication/login-index.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/login-2',
    name: 'login-two',
    component: () => import('@/views/pages/authentication/login-two.vue'),
  },
  {
    path: '/login-3',
    name: 'login-three',
    component: () => import('@/views/pages/authentication/login-three.vue'),
  },
  {
    path: '/register',
    name: 'register-index',
    component: () => import('@/views/pages/authentication/register-index.vue'),
  },
  {
    path: '/register-2',
    name: 'register-two',
    component: () => import('@/views/pages/authentication/register-two.vue'),
  },
  {
    path: '/register-3',
    name: 'register-three',
    component: () => import('@/views/pages/authentication/register-three.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/pages/authentication/forgot-password.vue'),
  },
  {
    path: '/forgot-password-2',
    name: 'forgot-password-two',
    component: () => import('@/views/pages/authentication/forgot-password-two.vue'),
  },
  {
    path: '/forgot-password-3',
    name: 'forgot-password-three',
    component: () => import('@/views/pages/authentication/forgot-password-three.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/pages/authentication/reset-password.vue'),
  },
  {
    path: '/reset-password-2',
    name: 'reset-password-two',
    component: () => import('@/views/pages/authentication/reset-password-two.vue'),
  },
  {
    path: '/reset-password-3',
    name: 'reset-password-three',
    component: () => import('@/views/pages/authentication/reset-password-three.vue'),
  },
  {
    path: '/email-verification',
    name: 'email-verification',
    component: () => import('@/views/pages/authentication/email-verification.vue'),
  },
  {
    path: '/email-verification-2',
    name: 'email-verification-two',
    component: () => import('@/views/pages/authentication/email-verification-two.vue'),
  },
  {
    path: '/email-verification-3',
    name: 'email-verification-three',
    component: () => import('@/views/pages/authentication/email-verification-three.vue'),
  },
  {
    path: '/two-step-verification',
    name: 'two-step-verification',
    component: () => import('@/views/pages/authentication/two-step-verification.vue'),
  },
  {
    path: '/two-step-verification-2',
    name: 'two-step-verification-two',
    component: () => import('@/views/pages/authentication/two-step-verification-two.vue'),
  },
  {
    path: '/two-step-verification-3',
    name: 'two-step-verification-three',
    component: () => import('@/views/pages/authentication/two-step-verification-three.vue'),
  },
  {
    path: '/lock-screen',
    name: 'lock-screen',
    component: () => import('@/views/pages/authentication/lock-screen.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/pages/authentication/error-404.vue'),
  },
  {
    path: '/error-500',
    name: 'error-500',
    component: () => import('@/views/pages/authentication/error-500.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/pages/dashboard/dashboard-index.vue'),
    meta: { requiresAuth: true, role: "admin" },
    children: [
      { path: '', redirect: '/dashboard/admin-dashboard' },
      { path: "admin-dashboard", component: () => import('@/views/pages/dashboard/admin-dashboard/admin-dashboard.vue'), },
      { path: "employee-dashboard", component: () => import('@/views/pages/dashboard/employee-dashboard/employee-dashboard.vue'), },
      { path: "deals-dashboard", component: () => import('@/views/pages/dashboard/deals-dashboard/deals-dashboard.vue'), },
      { path: "leads-dashboard", component: () => import('@/views/pages/dashboard/leads-dashboard/leads-dashboard.vue'), },
      { path: "hr-dashboard", component: () => import('@/views/pages/dashboard/hr-dashboard/hr-dashboard.vue'), },
      { path: "payroll-dashboard", component: () => import('@/views/pages/dashboard/payroll-dashboard/payroll-dashboard.vue'), },
      { path: "recruitment-dashboard", component: () => import('@/views/pages/dashboard/recruitment-dashboard/recruitment-dashboard.vue'), },
      { path: "attendance-dashboard", component: () => import('@/views/pages/dashboard/attendance-dashboard/attendance-dashboard.vue'), },
      { path: "finance-dashboard", component: () => import('@/views/pages/dashboard/finance-dashboard/finance-dashboard.vue'), },
      { path: "it-admin-dashboard", component: () => import('@/views/pages/dashboard/it-admin-dashboard/it-admin-dashboard.vue'), },
      { path: "asset-dashboard", component: () => import('@/views/pages/dashboard/asset-dashboard/asset-dashboard.vue'), },
      { path: "help-desk-dashboard", component: () => import('@/views/pages/dashboard/help-desk-dashboard/help-desk-dashboard.vue'), },
    ]
  },
  {
    path: '/applications',
    component: () => import('@/views/pages/applications/application-index.vue'),
    children: [
      { path: '', redirect: '/applications/chat' },
      { path: "chat", component: () => import('@/views/pages/applications/chat-index.vue'), },
      { path: "events", component: () => import('@/views/pages/applications/calendar-index.vue'), },
      { path: "email", component: () => import('@/views/pages/applications/email-index.vue'), },
      { path: "email-reply", component: () => import('@/views/pages/applications/email-reply.vue'), },
      { path: "todo", component: () => import('@/views/pages/applications/todo-index.vue'), },
      { path: "todo-list", component: () => import('@/views/pages/applications/todo-list.vue'), },
      { path: "notes", component: () => import('@/views/pages/applications/notes-index.vue'), },
      { path: "social-feed", component: () => import('@/views/pages/applications/social-feed.vue'), },
      { path: "invoices", component: () => import('@/views/pages/applications/invoices-app.vue'), },
      { path: "add-invoices", component: () => import('@/views/pages/applications/add-invoices.vue'), },
      { path: "edit-invoices", component: () => import('@/views/pages/applications/edit-invoices.vue'), },
      { path: "invoice-details", component: () => import('@/views/pages/applications/invoice-details.vue'), },
      { path: "kanban-view", component: () => import('@/views/pages/applications/kanban-view/kanban-view.vue'), },
      { path: "file-manager", component: () => import('@/views/pages/applications/file-manager/file-manager.vue'), },
    ]
  },
  {
    path: "/calls",
    component: () => import('@/views/pages/applications/calls/calls-index.vue'),
    children: [
      { path: "", redirect: "/calls/voice-call" },
      { path: "voice-call", component: () => import('@/views/pages/applications/calls/voice-call.vue'), },
      { path: "video-call", component: () => import('@/views/pages/applications/calls/video-call.vue'), },
      { path: "outgoing-call", component: () => import('@/views/pages/applications/calls/outgoing-call.vue'), },
      { path: "incoming-call", component: () => import('@/views/pages/applications/calls/incoming-call.vue'), },
      { path: "call-history", component: () => import('@/views/pages/applications/calls/call-history.vue'), },
    ],
  },
  {
    path: '/super-admin',
    component: () => import('@/views/pages/superadmin/super-admin.vue'),
    meta: { requiresAuth: true, role: "superadmin" },
    children: [
      { path: '', redirect: '/super-admin/dashboard' },
      { path: "dashboard", component: () => import('@/views/pages/superadmin/super-dashboard/super-dashboard.vue'), },
      { path: "companies", component: () => import('@/views/pages/superadmin/companies/companies-list.vue'), },
      { path: "subscription", component: () => import('@/views/pages/superadmin/super-subscription.vue'), },
      { path: "packages", component: () => import('@/views/pages/superadmin/packages/packages-list.vue'), },
      { path: "packages-grid", component: () => import('@/views/pages/superadmin/packages/packages-grid.vue'), },
      { path: "domain", component: () => import('@/views/pages/superadmin/domain/domain-list.vue'), },
      { path: "purchase-transaction", component: () => import('@/views/pages/superadmin/purchase/purchase-transaction.vue'), },
      { path: "tenant-usage-metrics", component: () => import('@/views/pages/superadmin/tenant-usage-metrics/tenant-usage-metrics.vue'), },
      { path: "tenant-support-tickets", component: () => import('@/views/pages/superadmin/tenant-support-tickets/tenant-support-tickets.vue'), },
      { path: "tenant-ticket-details", component: () => import('@/views/pages/superadmin/tenant-support-tickets/tenant-ticket-details.vue'), },
    ]
  },
  {
    path: '/superadmin-tickets',
    component: () => import('@/views/pages/superadmin/tickets/tickets-index.vue'),
    meta: { requiresAuth: true, role: "superadmin" },
    children: [
      { path: '', redirect: '/superadmin-tickets/agents' },
      { path: "agents", component: () => import('@/views/pages/superadmin/tickets/agents.vue'), },
      { path: "sla-policies", component: () => import('@/views/pages/superadmin/tickets/sla-policies.vue'), },
      { path: "escalation-rules", component: () => import('@/views/pages/superadmin/tickets/escalation-rules.vue'), },
    ]
  },
  {
    path: '/layouts',
    component: () => import('@/views/pages/layout/layout-index.vue'),
    children: [
      { path: '', redirect: '/layouts/layout-horizontal' },
      { path: "layout-horizontal", component: () => import('@/views/pages/layout/layout-horizontal.vue'), },
      { path: "layout-detached", component: () => import('@/views/pages/layout/layout-detached.vue'), },
      { path: "layout-modern", component: () => import('@/views/pages/layout/layout-modern.vue'), },
      { path: "layout-two-column", component: () => import('@/views/pages/layout/layout-two-column.vue'), },
      { path: "layout-hovered", component: () => import('@/views/pages/layout/layout-hovered.vue'), },
      { path: "layout-box", component: () => import('@/views/pages/layout/layout-box.vue'), },
      { path: "layout-horizontal-single", component: () => import('@/views/pages/layout/layout-horizontal-single.vue'), },
      { path: "layout-horizontal-overlay", component: () => import('@/views/pages/layout/layout-horizontal-overlay.vue'), },
      { path: "layout-horizontal-box", component: () => import('@/views/pages/layout/layout-horizontal-box.vue'), },
      { path: "layout-horizontal-sidemenu", component: () => import('@/views/pages/layout/layout-horizontal-sidemenu.vue'), },
      { path: "layout-vertical-transparent", component: () => import('@/views/pages/layout/layout-vertical-transparent.vue'), },
      { path: "layout-without-header", component: () => import('@/views/pages/layout/layout-without-header.vue'), },
      { path: "layout-rtl", component: () => import('@/views/pages/layout/layout-rtl/layout-rtl.vue'), },
      { path: "layout-dark", component: () => import('@/views/pages/layout/layout-dark.vue'), },
    ]
  },
  {
    path: '/projects',
    component: () => import('@/views/pages/projects/projects-index.vue'),
    children: [
      { path: '', redirect: '/projects/clients-grid' },
      { path: "clients-grid", component: () => import('@/views/pages/projects/clients/clients-grid.vue'), },
      { path: "clients", component: () => import('@/views/pages/projects/clients/clients-list.vue'), },
      { path: "clients-details", component: () => import('@/views/pages/projects/clients/clients-details.vue'), },
      { path: "projects-grid", component: () => import('@/views/pages/projects/project/project-grid.vue'), },
      { path: "projects-list", component: () => import('@/views/pages/projects/project/project-list.vue'), },
      { path: "projects-details", component: () => import('@/views/pages/projects/project/project-details.vue'), },
      { path: "tasks", component: () => import('@/views/pages/projects/project/project-details.vue'), },
      { path: "task-board", component: () => import('@/views/pages/projects/task/task-board.vue'), },
      { path: "task-details", component: () => import('@/views/pages/projects/task/task-details.vue'), },
    ]
  },
  {
    path: '/crm',
    component: () => import('@/views/pages/crm/crm-index.vue'),
    children: [
      { path: '', redirect: '/crm/deals-grid' },
      { path: "deals-grid", component: () => import('@/views/pages/crm/deals/deals-grid.vue'), },
      { path: "deals-list", component: () => import('@/views/pages/crm/deals/deals-list.vue'), },
      { path: "deals-details", component: () => import('@/views/pages/crm/deals/deals-details.vue'), },
      { path: "leads-grid", component: () => import('@/views/pages/crm/leads/leads-grid.vue'), },
      { path: "leads-list", component: () => import('@/views/pages/crm/leads/leads-list.vue'), },
      { path: "leads-details", component: () => import('@/views/pages/crm/leads/leads-details.vue'), },
      { path: "contacts-grid", component: () => import('@/views/pages/crm/contacts/contacts-grid.vue'), },
      { path: "contacts", component: () => import('@/views/pages/crm/contacts/contacts-list.vue'), },
      { path: "contact-details", component: () => import('@/views/pages/crm/contacts/contact-details.vue'), },
      { path: "companies-grid", component: () => import('@/views/pages/crm/companies/companies-grid.vue'), },
      { path: "companies-crm", component: () => import('@/views/pages/superadmin/companies/companies-crm.vue'), },
      { path: "companies-details", component: () => import('@/views/pages/crm/contacts/contact-details.vue'), },
      { path: "pipeline", component: () => import('@/views/pages/crm/pipeline/pipeline-list.vue'), },
      { path: "analytics", component: () => import('@/views/pages/crm/analytics/analytics-list.vue'), },
      { path: "activity", component: () => import('@/views/pages/crm/activity/activity-list.vue'), },
    ]
  },
  {
    path: '/hrm',
    component: () => import('@/views/pages/hrm/hrm-index.vue'),
    meta: { requiresAuth: true, role: "hr" },
    children: [
      { path: '', redirect: '/hrm/holidays' },
      { path: "holidays", component: () => import('@/views/pages/hrm/holidays/holidays-list.vue'), },
      { path: "promotion", component: () => import('@/views/pages/hrm/promotion/promotion-list.vue'), },
      { path: "resignation", component: () => import('@/views/pages/hrm/resignation/resignation-list.vue'), },
      { path: "termination", component: () => import('@/views/pages/hrm/termination/termination-list.vue'), },
      { path: "probation-management", component: () => import('@/views/pages/hrm/probation-management.vue'), },
      { path: "notice-period-tracker", component: () => import('@/views/pages/hrm/notice-period-tracker.vue'), },
    ]
  },
  {
    path: '/training',
    component: () => import('@/views/pages/hrm/attendance/training/training-index.vue'),
    children: [
      { path: '', redirect: '/training/training-list' },
      { path: "training-list", component: () => import('@/views/pages/hrm/attendance/training/training-list.vue'), },
      { path: "trainers", component: () => import('@/views/pages/hrm/attendance/training/trainers-list.vue'), },
      { path: "training-type", component: () => import('@/views/pages/hrm/attendance/training/training-type.vue'), },
      { path: "certification-tracking", component: () => import('@/views/pages/hrm/attendance/training/certification-tracking.vue'), },
      { path: "learning-analytics", component: () => import('@/views/pages/hrm/attendance/training/learning-analytics.vue'), },
    ]
  },
  {
    path: '/performance',
    component: () => import('@/views/pages/hrm/attendance/performance/performance-index.vue'),
    children: [
      { path: '', redirect: '/performance/performance-indicator' },
      { path: "performance-indicator", component: () => import('@/views/pages/hrm/attendance/performance/performance-indicator.vue'), },
      { path: "performance-review", component: () => import('@/views/pages/hrm/attendance/performance/performance-review.vue'), },
      { path: "performance-appraisal", component: () => import('@/views/pages/hrm/attendance/performance/performance-appraisal.vue'), },
      { path: "goal-tracking", component: () => import('@/views/pages/hrm/attendance/performance/goal-tracking.vue'), },
      { path: "goal-type", component: () => import('@/views/pages/hrm/attendance/performance/goal-type.vue'), },
    ]
  },
  {
    path: '/attendance',
    component: () => import('@/views/pages/hrm/attendance/attendance-index.vue'),
    children: [
      { path: '', redirect: '/attendance/attendance-admin' },
      { path: "attendance-admin", component: () => import('@/views/pages/hrm/attendance/attendance-admin.vue'), },
      { path: "attendance-employee", component: () => import('@/views/pages/hrm/attendance/attendance-employee.vue'), },
      { path: "timesheets", component: () => import('@/views/pages/hrm/attendance/timesheets-list.vue'), },
      { path: "schedule-timing", component: () => import('@/views/pages/hrm/attendance/schedule-timing.vue'), },
      { path: "overtime", component: () => import('@/views/pages/hrm/attendance/overtime-list.vue'), },
      { path: "shift-swap-requests", component: () => import('@/views/pages/hrm/attendance/shift-swap-requests.vue'), },
      { path: "work-from-home", component: () => import('@/views/pages/hrm/attendance/work-from-home.vue'), },
      { path: "holiday-calendar", component: () => import('@/views/pages/hrm/attendance/holiday-calendar.vue'), },
    ]
  },
  {
    path: '/leave',
    component: () => import('@/views/pages/hrm/attendance/leaves/leave-index.vue'),
    children: [
      { path: '', redirect: '/leave/leaves-admin' },
      { path: "leaves-admin", component: () => import('@/views/pages/hrm/attendance/leaves/leaves-admin.vue'), },
      { path: "leaves-employee", component: () => import('@/views/pages/hrm/attendance/leaves/leaves-employee.vue'), },
      { path: "leave-settings", component: () => import('@/views/pages/hrm/attendance/leaves/leave-settings.vue'), },
    ]
  },
  {
    path: '/tickets',
    component: () => import('@/views/pages/hrm/tickets/tickets-index.vue'),
    children: [
      { path: '', redirect: '/tickets/ticket' },
      { path: "ticket", component: () => import('@/views/pages/hrm/tickets/tickets-list.vue'), },
      { path: "tickets-grid", component: () => import('@/views/pages/hrm/tickets/tickets-grid.vue'), },
      { path: "tickets-details", component: () => import('@/views/pages/hrm/tickets/tickets-details.vue'), },
      { path: "ticket-reports", component: () => import('@/views/pages/hrm/tickets/ticket-reports.vue'), },
      { path: "ticket-automation", component: () => import('@/views/pages/hrm/tickets/ticket-automation.vue'), },
    ]
  },
  {
    path: '/employee',
    component: () => import('@/views/pages/hrm/employees/employees-index.vue'),
    children: [
      { path: '', redirect: '/employee/employee-list' },
      { path: "employee-list", component: () => import('@/views/pages/hrm/employees/employees-list.vue'), },
      { path: "employee-grid", component: () => import('@/views/pages/hrm/employees/employees-grid.vue'), },
      { path: "employee-details", component: () => import('@/views/pages/hrm/employees/employee-details.vue'), },
      { path: "departments", component: () => import('@/views/pages/hrm/employees/employee-department.vue'), },
      { path: "designations", component: () => import('@/views/pages/hrm/employees/employee-designations.vue'), },
      { path: "policy", component: () => import('@/views/pages/hrm/employees/employee-policy.vue'), },
    ]
  },
  {
    path: '/recuritment',
    component: () => import('@/views/pages/recruitment/recuritment-index.vue'),
    children: [
      { path: '', redirect: '/recuritment/job-grid' },
      { path: "job-grid", component: () => import('@/views/pages/recruitment/jobs/job-grid.vue'), },
      { path: "job-list", component: () => import('@/views/pages/recruitment/jobs/job-list.vue'), },
      { path: "candidates-grid", component: () => import('@/views/pages/recruitment/candidates/candidates-grid.vue'), },
      { path: "candidates", component: () => import('@/views/pages/recruitment/candidates/candidates-list.vue'), },
      { path: "candidates-kanban", component: () => import('@/views/pages/recruitment/candidates/candidates-kanban.vue'), },
      { path: "refferals", component: () => import('@/views/pages/recruitment/refferals/refferals-list.vue'), },
      { path: "resume-parsing", component: () => import('@/views/pages/recruitment/resume-parsing.vue'), },
      { path: "campus-hiring", component: () => import('@/views/pages/recruitment/campus-hiring.vue'), },
    ]
  },
  {
    path: '/accounting',
    component: () => import('@/views/pages/finance-accounts/accounting/accounting-index.vue'),
    children: [
      { path: '', redirect: '/accounting/budgets' },
      { path: "budgets", component: () => import('@/views/pages/finance-accounts/accounting/budgets-index.vue'), },
      { path: "budget-expenses", component: () => import('@/views/pages/finance-accounts/accounting/budgets-expenses.vue'), },
      { path: "budget-revenues", component: () => import('@/views/pages/finance-accounts/accounting/budgets-revenues.vue'), },
      { path: "categories", component: () => import('@/views/pages/finance-accounts/accounting/categories-list.vue'), },
    ]
  },
  {
    path: '/payroll',
    component: () => import('@/views/pages/finance-accounts/payroll/payroll-index.vue'),
    children: [
      { path: '', redirect: '/payroll/employee-salary' },
      { path: "employee-salary", component: () => import('@/views/pages/finance-accounts/payroll/employee-salary.vue'), },
      { path: "payslip", component: () => import('@/views/pages/finance-accounts/payroll/payslip-index.vue'), },
      { path: "payroll-additions", component: () => import('@/views/pages/finance-accounts/payroll/payroll-additions.vue'), },
      { path: "payroll-overtime", component: () => import('@/views/pages/finance-accounts/payroll/payroll-overtime.vue'), },
      { path: "payroll-deduction", component: () => import('@/views/pages/finance-accounts/payroll/payroll-deduction.vue'), },
    ]
  },
  {
    path: '/sales',
    component: () => import('@/views/pages/finance-accounts/sales/sales-index.vue'),
    children: [
      { path: '', redirect: '/sales/estimates' },
      { path: "estimates", component: () => import('@/views/pages/finance-accounts/sales/estimates-list.vue'), },
      { path: "invoices", component: () => import('@/views/pages/finance-accounts/sales/invoices-list.vue'), },
      { path: "add-invoices", component: () => import('@/views/pages/finance-accounts/sales/add-invoices.vue'), },
      { path: "edit-invoices", component: () => import('@/views/pages/finance-accounts/sales/edit-invoices.vue'), },
      { path: "invoice-details", component: () => import('@/views/pages/finance-accounts/sales/invoice-details.vue'), },
      { path: "payments", component: () => import('@/views/pages/finance-accounts/sales/payments-list.vue'), },
      { path: "expenses", component: () => import('@/views/pages/finance-accounts/sales/expenses-list.vue'), },
      { path: "provident-fund", component: () => import('@/views/pages/finance-accounts/sales/provident-fund.vue'), },
      { path: "taxes", component: () => import('@/views/pages/finance-accounts/sales/taxes-list.vue'), },
    ]
  },
  {
    path: '/asset',
    component: () => import('@/views/pages/finance-accounts/sales/sales-index.vue'),
    children: [
      { path: '', redirect: '/asset/assets' },
      { path: "assets", component: () => import('@/views/pages/administration/assets/assets-list.vue'), },
      { path: "asset-categories", component: () => import('@/views/pages/administration/assets/assets-categories.vue'), },
    ]
  },
  {
    path: '/supports',
    component: () => import('@/views/pages/administration/supports/help-supports.vue'),
    children: [
      { path: '', redirect: '/supports/knowledgebase' },
      { path: "knowledgebase", component: () => import('@/views/pages/administration/supports/knowledgebase-index.vue'), },
      { path: "knowledgebase-view", component: () => import('@/views/pages/administration/supports/knowledgebase-view.vue'), },
      { path: "knowledgebase-details", component: () => import('@/views/pages/administration/supports/knowledgebase-details.vue'), },
    ]
  },
  {
    path: '/user-management',
    component: () => import('@/views/pages/administration/user-management/user-management.vue'),
    children: [
      { path: '', redirect: '/user-management/users' },
      { path: "users", component: () => import('@/views/pages/administration/user-management/user-list.vue'), },
      { path: "roles-permissions", component: () => import('@/views/pages/administration/user-management/roles-permission.vue'), },
      { path: "permission", component: () => import('@/views/pages/administration/user-management/permission-index.vue'), },
    ]
  },
  {
    path: '/website-settings',
    component: () => import('@/views/pages/administration/settings/website-settings/website-settings.vue'),
    children: [
      { path: '', redirect: '/website-settings/business-settings' },
      { path: "business-settings", component: () => import('@/views/pages/administration/settings/website-settings/business-settings.vue'), },
      { path: "seo-settings", component: () => import('@/views/pages/administration/settings/website-settings/seo-settings.vue'), },
      { path: "localization-settings", component: () => import('@/views/pages/administration/settings/website-settings/localization-settings.vue'), },
      { path: "prefixes", component: () => import('@/views/pages/administration/settings/website-settings/prefixes-settings.vue'), },
      { path: "preferences", component: () => import('@/views/pages/administration/settings/website-settings/preferences-settings.vue'), },
      { path: "appearance", component: () => import('@/views/pages/administration/settings/website-settings/appearance-settings.vue'), },
      { path: "language", component: () => import('@/views/pages/administration/settings/website-settings/language-settings.vue'), },
      { path: "add-language", component: () => import('@/views/pages/administration/settings/website-settings/add-language.vue'), },
      { path: "language-web", component: () => import('@/views/pages/administration/settings/website-settings/language-web.vue'), },
      { path: "authentication-settings", component: () => import('@/views/pages/administration/settings/website-settings/authentication-settings.vue'), },
      { path: "ai-settings", component: () => import('@/views/pages/administration/settings/website-settings/ai-settings.vue'), },
    ]
  },
  {
    path: '/others-settings',
    component: () => import('@/views/pages/administration/settings/others-settings/others-settings.vue'),
    children: [
      { path: '', redirect: '/others-settings/custom-css' },
      { path: "custom-css", component: () => import('@/views/pages/administration/settings/others-settings/custom-css.vue'), },
      { path: "custom-js", component: () => import('@/views/pages/administration/settings/others-settings/custom-js.vue'), },
      { path: "cronjob", component: () => import('@/views/pages/administration/settings/others-settings/cronjob-settings.vue'), },
      { path: "cronjob-schedule", component: () => import('@/views/pages/administration/settings/others-settings/cronjob-schedule.vue'), },
      { path: "storage-settings", component: () => import('@/views/pages/administration/settings/others-settings/storage-setings.vue'), },
      { path: "ban-ip-address", component: () => import('@/views/pages/administration/settings/others-settings/ban-ip-address.vue'), },
      { path: "backup", component: () => import('@/views/pages/administration/settings/others-settings/backup-settings.vue'), },
      { path: "clear-cache", component: () => import('@/views/pages/administration/settings/others-settings/clear-cache.vue'), },
    ]
  },
  {
    path: '/financial-settings',
    component: () => import('@/views/pages/administration/settings/financial-settings/financial-settings.vue'),
    children: [
      { path: '', redirect: '/financial-settings/payment-gateways' },
      { path: "payment-gateways", component: () => import('@/views/pages/administration/settings/financial-settings/payment-gateway.vue'), },
      { path: "tax-rates", component: () => import('@/views/pages/administration/settings/financial-settings/tax-rates.vue'), },
      { path: "currencies", component: () => import('@/views/pages/administration/settings/financial-settings/currencies-settings.vue'), },
    ]
  },
  {
    path: '/system-settings',
    component: () => import('@/views/pages/administration/settings/system-settings/system-settings.vue'),
    children: [
      { path: '', redirect: '/system-settings/email-settings' },
      { path: "otp-settings", component: () => import('@/views/pages/administration/settings/system-settings/otp-settings.vue'), },
      { path: "email-settings", component: () => import('@/views/pages/administration/settings/system-settings/email-settings.vue'), },
      { path: "email-template", component: () => import('@/views/pages/administration/settings/system-settings/email-template.vue'), },
      { path: "sms-settings", component: () => import('@/views/pages/administration/settings/system-settings/sms-settings.vue'), },
      { path: "sms-template", component: () => import('@/views/pages/administration/settings/system-settings/sms-template.vue'), },
      { path: "gdpr", component: () => import('@/views/pages/administration/settings/system-settings/gdpr-settings.vue'), },
      { path: "maintenance-mode", component: () => import('@/views/pages/administration/settings/system-settings/maintenance-mode.vue'), },
    ]
  },
  {
    path: '/app-settings',
    component: () => import('@/views/pages/administration/settings/app-settings/app-settings.vue'),
    children: [
      { path: '', redirect: '/app-settings/salary-settings' },
      { path: "salary-settings", component: () => import('@/views/pages/administration/settings/app-settings/salary-settings.vue'), },
      { path: "leave-type", component: () => import('@/views/pages/administration/settings/app-settings/leave-type.vue'), },
      { path: "approval-settings", component: () => import('@/views/pages/administration/settings/app-settings/approval-settings.vue'), },
      { path: "invoice-settings", component: () => import('@/views/pages/administration/settings/app-settings/invoice-settings.vue'), },
      { path: "custom-fields", component: () => import('@/views/pages/administration/settings/app-settings/custom-fields.vue'), },
    ]
  },
  {
    path: '/general-settings',
    component: () => import('@/views/pages/administration/settings/general-settings/general-settings.vue'),
    children: [
      { path: '', redirect: '/general-settings/profile-settings' },
      { path: "profile-settings", component: () => import('@/views/pages/administration/settings/general-settings/profile-settings.vue'), },
      { path: "security-settings", component: () => import('@/views/pages/administration/settings/general-settings/security-settings.vue'), },
      { path: "notification-settings", component: () => import('@/views/pages/administration/settings/general-settings/notification-settings.vue'), },
      { path: "connected-apps", component: () => import('@/views/pages/administration/settings/general-settings/connected-apps.vue'), },
    ]
  },
  {
    path: '/reports',
    component: () => import('@/views/pages/administration/reports/reports-index.vue'),
    children: [
      { path: '', redirect: '/reports/expenses-report' },
      { path: "expenses-report", component: () => import('@/views/pages/administration/reports/expenses-report.vue'), },
      { path: "invoice-report", component: () => import('@/views/pages/administration/reports/invoice-report.vue'), },
      { path: "payment-report", component: () => import('@/views/pages/administration/reports/payment-report.vue'), },
      { path: "project-report", component: () => import('@/views/pages/administration/reports/project-report.vue'), },
      { path: "task-report", component: () => import('@/views/pages/administration/reports/task-report.vue'), },
      { path: "user-report", component: () => import('@/views/pages/administration/reports/user-report.vue'), },
      { path: "employee-report", component: () => import('@/views/pages/administration/reports/employee-report.vue'), },
      { path: "payslip-report", component: () => import('@/views/pages/administration/reports/payslip-report.vue'), },
      { path: "attendance-report", component: () => import('@/views/pages/administration/reports/attendance-report.vue'), },
      { path: "leave-report", component: () => import('@/views/pages/administration/reports/leave-report.vue'), },
      { path: "daily-report", component: () => import('@/views/pages/administration/reports/daily-report.vue'), },
    ]
  },
  {
    path: '/pages',
    component: () => import('@/views/pages/pages/pages-index.vue'),
    children: [
      { path: '', redirect: '/pages/starter' },
      { path: "starter", component: () => import('@/views/pages/pages/starter-index.vue'), },
      { path: "profile", component: () => import('@/views/pages/pages/profile-index.vue'), },
      { path: "gallery", component: () => import('@/views/pages/pages/gallery-index.vue'), },
      { path: "search-result", component: () => import('@/views/pages/pages/search-result.vue'), },
      { path: "timeline", component: () => import('@/views/pages/pages/timeline-index.vue'), },
      { path: "pricing", component: () => import('@/views/pages/pages/pricing-index.vue'), },
      { path: "coming-soon", component: () => import('@/views/pages/pages/coming-soon.vue'), },
      { path: "under-maintenance", component: () => import('@/views/pages/pages/under-maintenance.vue'), },
      { path: "under-construction", component: () => import('@/views/pages/pages/under-construction.vue'), },
      { path: "api-keys", component: () => import('@/views/pages/pages/api-keys.vue'), },
      { path: "terms-condition", component: () => import('@/views/pages/pages/terms-condition.vue'), },
      { path: "privacy-policy", component: () => import('@/views/pages/pages/privacy-policy.vue'), },
    ]
  },
  {
    path: '/content',
    component: () => import('@/views/pages/content/content-index.vue'),
    children: [
      { path: '', redirect: '/content/pages' },
      { path: "pages", component: () => import('@/views/pages/content/pages-list.vue'), },
      { path: "testimonials", component: () => import('@/views/pages/content/testimonials-list.vue'), },
      { path: "faq", component: () => import('@/views/pages/content/faq-list.vue'), },
    ]
  },
  {
    path: '/location',
    component: () => import('@/views/pages/content/location/location-index.vue'),
    children: [
      { path: '', redirect: '/location/countries' },
      { path: "countries", component: () => import('@/views/pages/content/location/countries-list.vue'), },
      { path: "states", component: () => import('@/views/pages/content/location/states-list.vue'), },
      { path: "cities", component: () => import('@/views/pages/content/location/cities-list.vue'), },
    ]
  },
  {
    path: '/blog',
    component: () => import('@/views/pages/content/blogs/blogs-index.vue'),
    children: [
      { path: '', redirect: '/blog/blogs' },
      { path: "blogs", component: () => import('@/views/pages/content/blogs/blogs-grid.vue'), },
      { path: "blog-categories", component: () => import('@/views/pages/content/blogs/blog-categories.vue'), },
      { path: "blog-comments", component: () => import('@/views/pages/content/blogs/blog-comments.vue'), },
      { path: "blog-tags", component: () => import('@/views/pages/content/blogs/blog-tags.vue'), },
    ]
  },
  {
    path: "/baseui",
    component: () => import('@/views/pages/uiinterface/baseui/baseui-index.vue'),
    children: [
      { path: "", redirect: "/baseui/ui-accordion" },
      { path: "ui-accordion", component: () => import('@/views/pages/uiinterface/baseui/ui-accordion.vue') },
      { path: "ui-alerts", component: () => import('@/views/pages/uiinterface/baseui/ui-alerts.vue') },
      { path: "ui-avatar", component: () => import('@/views/pages/uiinterface/baseui/ui-avatar.vue') },
      { path: "ui-badges", component: () => import('@/views/pages/uiinterface/baseui/ui-badges.vue') },
      { path: "ui-breadcrumb", component: () => import('@/views/pages/uiinterface/baseui/ui-breadcrumb.vue') },
      { path: "ui-borders", component: () => import('@/views/pages/uiinterface/baseui/ui-borders.vue') },
      { path: "ui-buttons", component: () => import('@/views/pages/uiinterface/baseui/ui-buttons.vue') },
      { path: "ui-buttons-group", component: () => import('@/views/pages/uiinterface/baseui/ui-buttons-group.vue') },
      { path: "ui-cards", component: () => import('@/views/pages/uiinterface/baseui/ui-cards.vue') },
      { path: "ui-carousel", component: () => import('@/views/pages/uiinterface/baseui/ui-carousel.vue') },
      { path: "ui-colors", component: () => import('@/views/pages/uiinterface/baseui/ui-colors.vue') },
      { path: "ui-collapse", component: () => import('@/views/pages/uiinterface/baseui/ui-collapse.vue') },
      { path: "ui-dropdowns", component: () => import('@/views/pages/uiinterface/baseui/ui-dropdowns.vue') },
      { path: "ui-ratio", component: () => import('@/views/pages/uiinterface/baseui/ui-ratio.vue') },
      { path: "ui-grid", component: () => import('@/views/pages/uiinterface/baseui/ui-grid.vue') },
      { path: "ui-images", component: () => import('@/views/pages/uiinterface/baseui/ui-images.vue') },
      { path: "ui-links", component: () => import('@/views/pages/uiinterface/baseui/ui-links.vue') },
      { path: "ui-list-group", component: () => import('@/views/pages/uiinterface/baseui/ui-list-group.vue') },
      { path: "ui-modals", component: () => import('@/views/pages/uiinterface/baseui/ui-modals.vue') },
      { path: "ui-offcanvas", component: () => import('@/views/pages/uiinterface/baseui/ui-offcanvas.vue') },
      { path: "ui-pagination", component: () => import('@/views/pages/uiinterface/baseui/ui-pagination.vue') },
      { path: "ui-placeholders", component: () => import('@/views/pages/uiinterface/baseui/ui-placeholders.vue') },
      { path: "ui-popovers", component: () => import('@/views/pages/uiinterface/baseui/ui-popovers.vue') },
      { path: "ui-progress", component: () => import('@/views/pages/uiinterface/baseui/ui-progress.vue') },
      { path: "ui-scrollspy", component: () => import('@/views/pages/uiinterface/baseui/ui-scrollspy.vue') },
      { path: "ui-spinner", component: () => import('@/views/pages/uiinterface/baseui/ui-spinner.vue') },
      { path: "ui-nav-tabs", component: () => import('@/views/pages/uiinterface/baseui/ui-nav-tabs.vue') },
      { path: "ui-notifications", component: () => import('@/views/pages/uiinterface/baseui/ui-notifications.vue') },
      { path: "ui-toasts", component: () => import('@/views/pages/uiinterface/baseui/ui-toasts.vue') },
      { path: "ui-tooltips", component: () => import('@/views/pages/uiinterface/baseui/ui-tooltips.vue') },
      { path: "ui-typography", component: () => import('@/views/pages/uiinterface/baseui/ui-typography.vue') },
    ],
  },
  {
    path: '/advancedui',
    component: () => import('@/views/pages/uiinterface/advancedUI/advancedui-index.vue'),
    children: [
      { path: '', redirect: '/advancedui/ui-ribbon' },
      { path: "ui-ribbon", component: () => import('@/views/pages/uiinterface/advancedUI/ui-ribbon.vue') },
      { path: "ui-clipboard", component: () => import('@/views/pages/uiinterface/advancedUI/ui-clipboard.vue') },
      { path: "ui-text-editor", component: () => import('@/views/pages/uiinterface/advancedUI/ui-text-editor.vue') },
      { path: "ui-counter", component: () => import('@/views/pages/uiinterface/advancedUI/ui-counter.vue') },
      { path: "ui-scrollbar", component: () => import('@/views/pages/uiinterface/advancedUI/ui-scrollbar.vue') },
      { path: "ui-rating", component: () => import('@/views/pages/uiinterface/advancedUI/ui-rating.vue') },
      { path: "ui-stickynote", component: () => import('@/views/pages/uiinterface/advancedUI/ui-stickynote.vue') },
      { path: "ui-rangeslider", component: () => import('@/views/pages/uiinterface/advancedUI/ui-rangeslider.vue') },
      { path: "ui-timeline", component: () => import('@/views/pages/uiinterface/advancedUI/ui-rangeslider.vue') },
    ]
  },

  {
    path: "/form-elements",
    component: () => import('@/views/pages/uiinterface/form/form-elements/form-elements.vue'),
    children: [
      { path: "", redirect: "/form-elements/form-basic-inputs" },
      { path: "form-basic-inputs", component: () => import('@/views/pages/uiinterface/form/form-elements/form-basic-inputs.vue') },
      { path: "form-checkbox-radios", component: () => import('@/views/pages/uiinterface/form/form-elements/form-checkbox-radios.vue') },
      { path: "form-input-groups", component: () => import('@/views/pages/uiinterface/form/form-elements/form-input-groups.vue') },
      { path: "form-grid-gutters", component: () => import('@/views/pages/uiinterface/form/form-elements/form-grid-gutters.vue') },
      { path: "form-mask", component: () => import('@/views/pages/uiinterface/form/form-elements/form-mask.vue') },
      { path: "form-fileupload", component: () => import('@/views/pages/uiinterface/form/form-elements/form-fileupload.vue') },
    ],
  },
  {
    path: "/form-layouts",
    component: () => import('@/views/pages/uiinterface/form/form-layouts/form-layouts.vue'),
    children: [
      { path: "", redirect: "/form-layouts/form-horizontal" },
      { path: "form-horizontal", component: () => import('@/views/pages/uiinterface/form/form-layouts/form-horizontal.vue') },
      { path: "form-vertical", component: () => import('@/views/pages/uiinterface/form/form-layouts/form-vertical.vue') },
      { path: "form-floating-labels", component: () => import('@/views/pages/uiinterface/form/form-layouts/form-floating-labels.vue') },
    ],
  },
  {
    path: "/forms",
    component: () => import('@/views/pages/uiinterface/form/form-index.vue'),
    children: [
      { path: "", redirect: "/form/form-validation" },
      { path: "form-validation", component: () => import('@/views/pages/uiinterface/form/form-validation.vue') },
      { path: "form-select2", component: () => import('@/views/pages/uiinterface/form/form-select2.vue') },
      { path: "form-wizard", component: () => import('@/views/pages/uiinterface/form/form-wizard.vue') },
    ],
  },
  {
    path: "/tables",
    component: () => import('@/views/pages/uiinterface/tables/tables-index.vue'),
    children: [
      { path: "", redirect: "/tables/tables-basic" },
      { path: "tables-basic", component: () => import('@/views/pages/uiinterface/tables/tables-basic.vue') },
      { path: "data-tables", component: () => import('@/views/pages/uiinterface/tables/data-tables.vue') },
    ],
  },
  {
    path: "/charts",
    component: () => import('@/views/pages/uiinterface/charts/charts-index.vue'),
    children: [
      { path: "", redirect: "/charts/chart-apex" },
      { path: "chart-apex", component: () => import('@/views/pages/uiinterface/charts/apex/chart-apex.vue') },
      { path: "chart-c3", component: () => import('@/views/pages/uiinterface/charts/c3/chart-c3.vue') },
      { path: "chart-js", component: () => import('@/views/pages/uiinterface/charts/js/chart-js.vue') },
      { path: "chart-flot", component: () => import('@/views/pages/uiinterface/charts/flot/chart-flot.vue') },
      { path: "chart-morris", component: () => import('@/views/pages/uiinterface/charts/morris/chart-morris.vue') },
    ],
  },
  {
    path: "/icons",
    component: () => import('@/views/pages/uiinterface/icons/icons-index.vue'),
    children: [
      { path: "", redirect: "/icons/icon-fontawesome" },
      { path: "icon-fontawesome", component: () => import('@/views/pages/uiinterface/icons/icon-fontawesome.vue') },
      { path: "icon-tabler", component: () => import('@/views/pages/uiinterface/icons/icon-tabler.vue') },
      { path: "icon-bootstrap", component: () => import('@/views/pages/uiinterface/icons/icon-bootstrap.vue') },
      { path: "icon-remix", component: () => import('@/views/pages/uiinterface/icons/icon-remix.vue') },
      { path: "icon-ionic", component: () => import('@/views/pages/uiinterface/icons/icon-ionic.vue') },
      { path: "icon-material", component: () => import('@/views/pages/uiinterface/icons/icon-material.vue') },
      { path: "icon-feather", component: () => import('@/views/pages/uiinterface/icons/icon-feather.vue') },
      { path: "icon-pe7", component: () => import('@/views/pages/uiinterface/icons/icon-pe7.vue') },
      { path: "icon-weather", component: () => import('@/views/pages/uiinterface/icons/icon-weather.vue') },
      { path: "icon-typicon", component: () => import('@/views/pages/uiinterface/icons/icon-typicon.vue') },
      { path: "icon-flag", component: () => import('@/views/pages/uiinterface/icons/icon-flag.vue') },
    ],
  },
  {
    path: "/maps",
    component: () => import('@/views/pages/uiinterface/maps/map-index.vue'),
    children: [
      { path: "", redirect: "/maps/maps-vector" },
      { path: "maps-leaflet", component: () => import('@/views/pages/uiinterface/maps/maps-leaflet.vue') },
      { path: "maps-vector", component: () => import('@/views/pages/uiinterface/maps/maps-vector.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
];
export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});


router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Restore session on refresh
  if (!auth.user) {
    await auth.fetchUser();
  }

  // 🔐 Protected route
  if (to.meta.requiresAuth && !auth.user) {
    return "/login";
  }

  // 🧭 Role enforcement
  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return redirectAfterLogin(auth.user.role);
  }

  // 🚪 Logged-in user visiting login
  if (to.meta.guestOnly && auth.user) {
    return redirectAfterLogin(auth.user.role);
  }
});

export default router;