export function redirectAfterLogin(role) {
  switch (role) {
    case "superadmin":
      return "/superadmin";
    case "admin":
      return "/dashboard";
    case "hr":
      return "/hrm";
    default:
      return "/dashboard";
  }
}
