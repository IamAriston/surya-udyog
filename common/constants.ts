import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const links = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Workers",
      icon: IconUsers,
      items: [
        {
          title: "Workers List",
          url: "/workers/worker-list",
        },
        {
          title: "Salary",
          url: "/workers/salary-calc",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
  ],
};
