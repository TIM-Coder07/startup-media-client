"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const role = session?.user?.role?.toLowerCase();

  const roleNames: Record<string, string> = {
    user: "User",
    investor: "Investor",
    founder: "Founder",
    admin: "Admin",
  };

  const menus: Record<
    string,
    {
      name: string;
      path: string;
    }[]
  > = {
    user: [
      {
        name: "Dashboard",
        path: "/dashboard/user/overview",
      },
      {
        name: "My Applications",
        path: "/dashboard/user/applications",
      },
      {
        name: "Saved Startups",
        path: "/dashboard/user/saved-startups",
      },
    ],

    investor: [
      {
        name: "Dashboard",
        path: "/dashboard/investor/overview",
      },
      {
        name: "Investment Requests",
        path: "/dashboard/investor/investment-request",
      },
      {
        name: "Notifications",
        path: "/dashboard/investor/notifications",
      },
      {
        name: "Profile",
        path: "/dashboard/investor/profile",
      },
    ],
    founder: [
      {
        name: "Dashboard",
        path: "/dashboard/founder/overview",
      },
      {
        name: "Investor Requests",
        path: "/dashboard/founder/investor-requests",
      },
      {
        name: "Notifications",
        path: "/dashboard/founder/notifications",
      },
      {
        name: "Profile",
        path: "/dashboard/founder/profile",
      },
    ],

    admin: [
      {
        name: "Dashboard",
        path: "/dashboard/admin",
      },
      {
        name: "Manage Users",
        path: "/dashboard/admin/users",
      },
      {
        name: "Manage Startups",
        path: "/dashboard/admin/startups",
      },
      {
        name: "Manage Founders",
        path: "/dashboard/admin/founders",
      },
      {
        name: "Requests",
        path: "/dashboard/admin/requests",
      },
      // {
      //   name: "Reports",
      //   path: "/dashboard/admin/reports",
      // },
      // {
      //   name: "Settings",
      //   path: "/dashboard/admin/settings",
      // },
    ],
  };

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const navItems = menus[role ?? ""] || [];

  const SidebarContent = (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="mt-2 text-sm text-blue-400">
          Role: {roleNames[role ?? ""] ?? "Unknown"}
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 font-medium transition-all duration-200 ${isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {item.name}

              {isActive && (
                <span className="h-2 w-2 rounded-full bg-white"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Button */}
      <div className="p-4 md:hidden">
        <Button
          isIconOnly
          color="primary"
          onPress={() => setOpen(true)}
        >
          <HiMenuAlt3 size={22} />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-72 border-r bg-gray-900 p-6 text-white md:block">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={open}
        onOpenChange={setOpen}
        placement="left"
      >
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Heading>Dashboard</Drawer.Heading>
          </Drawer.Header>

          <Drawer.Body>{SidebarContent}</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </>
  );
}