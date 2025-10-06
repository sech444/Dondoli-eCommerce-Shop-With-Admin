// Dondoli-eCommerce-Shop-With-Admin/app/(dashboard)/admin/orders/page.tsx

"use client";
import { DashboardSidebar } from "@/components";
import AdminOrders from "@/components/AdminOrders";
import React from "react";

const AdminOrdersPage = () => {
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;
