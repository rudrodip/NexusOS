import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: "billing",
    },
  ],
  workspaceNav: [
    {
      title: "Workspaces",
      href: "/workspaces",
      icon: "post",
    },
    {
      title: "Studio",
      href: "/studio",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/pricing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/workspaces/settings",
      icon: "settings",
    },
  ]
}