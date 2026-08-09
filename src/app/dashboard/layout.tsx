import DashboardSidebar from "@/Component/Shared/SideBar/DashboardSidebar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="min-h-[calc(100vh-4rem)] rounded-2xl bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}