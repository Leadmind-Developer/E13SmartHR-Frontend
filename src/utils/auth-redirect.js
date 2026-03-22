export function redirectAfterLogin(role) {
  switch (role) {
    case "superadmin":
      return "/super-admin/dashboard";
    case "admin":
      return "/dashboard";
    case "hr":
      return "/hrm";
    default:
      return "/dashboard";
  }
}
