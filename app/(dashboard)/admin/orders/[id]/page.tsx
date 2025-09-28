// In app/(dashboard)/admin/orders/[id]/page.tsx

"use client";
import { DashboardSidebar } from "@/components";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// This interface now matches the LandingOrder model in schema.prisma
interface LandingOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string | null;
  state: string;
  deliveryAddress: string;
  package: string;
  concerns: string[];
  status: string;
  ip: string | null;
  userAgent: string | null;
}

const AdminSingleOrderPage = () => {
  const [order, setOrder] = useState<LandingOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!params?.id) return;

    const fetchOrderData = async () => {
      setIsLoading(true);
      try {
        // Use the Next.js API route for consistency and security
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data.order); // The backend wraps the order in an 'order' property
      } catch (error) {
        toast.error("Failed to fetch order details.");
        router.push('/admin/orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [params?.id, router]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      // Your backend has a dedicated route for updating status, which is great!
      const response = await fetch(`/api/orders/${order.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update status');
      }

      // Update local state to reflect the change immediately
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success("Order status updated successfully!");

    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!order || !window.confirm("Are you sure you want to delete this order? This cannot be undone.")) {
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      
      toast.success("Order deleted successfully");
      router.push("/admin/orders");

    } catch (error: any) {
      toast.error(error.message);
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 text-center">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 text-center">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col gap-y-5 p-4 sm:p-6 md:p-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Order Details</h1>
          <p className="text-sm text-slate-500 mt-1">Order ID: {order.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer & Address Info */}
          <div className="md:col-span-2 bg-slate-50 p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Customer Information</h2>
            <InfoItem label="Full Name" value={order.fullName} />
            <InfoItem label="Phone Number" value={order.phoneNumber} />
            <InfoItem label="WhatsApp Number" value={order.whatsappNumber} />
            <InfoItem label="Delivery Address" value={order.deliveryAddress} />
            <InfoItem label="State" value={order.state} />
            <InfoItem label="Customer IP" value={order.ip} />
            <InfoItem label="User Agent" value={order.userAgent} />
          </div>

          {/* Order Details & Actions */}
          <div className="md:col-span-1 bg-slate-50 p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
            <InfoItem label="Package" value={order.package} />
            <div>
              <p className="text-sm font-medium text-slate-500">Health Concerns</p>
              <p className="text-base font-semibold text-slate-800">
                {order.concerns?.join(', ') || 'Not specified'}
              </p>
            </div>
            <div className="pt-4">
              <label className="block text-sm font-medium text-slate-500 mb-1">Order Status</label>
              <select
                className="w-full p-2 border rounded-md bg-white"
                value={order.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={isUpdating}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="pt-6 space-y-3">
              <button
                type="button"
                className="w-full bg-red-600 px-4 py-3 text-base font-bold text-white rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                onClick={handleDeleteOrder}
                disabled={isUpdating}
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying info items
const InfoItem = ({ label, value }: { label: string, value: string | null | undefined }) => (
  <div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="text-base font-semibold text-slate-800">{value || 'N/A'}</p>
  </div>
);

export default AdminSingleOrderPage;