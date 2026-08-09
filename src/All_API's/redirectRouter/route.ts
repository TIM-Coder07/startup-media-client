export const getDashboardRoute = (role: string) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";

    case "user":
      return "/user/dashboard";

    case "founder":
      return "/founder/dashboard";

    case "co-founder":
      return "/co-founder/dashboard";

    case "investor":
      return "/Dashboard/investor/dashboard";

    default:
      return "/";
  }
};