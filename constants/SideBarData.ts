import { NavItem } from "../types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Account",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "laptop",
    isActive: true,

    items: [
      {
        title: "Profile",
        url: "/account/profile",
        icon: "userPen",
      },
    ],
  },
];
