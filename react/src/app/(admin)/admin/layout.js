"use client";

import "../../globals-admin.css";
import { useSidebar, SidebarProvider } from "@/context/sidebarContext";
import { ThemeProvider } from "@/components/theme-provider";
import AppHeader from "@/layout/admin/AppHeader";
import AppSidebar from "@/layout/admin/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import Backdrop from "@/layout/admin/Backdrop";
import React from "react";

function AdminLayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      <Toaster />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
