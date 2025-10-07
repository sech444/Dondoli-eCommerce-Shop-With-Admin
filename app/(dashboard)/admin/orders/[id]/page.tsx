// Dondoli-eCommerce-Shop-With-Admin/app/(dashboard)/admin/orders/[id]/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardSidebar } from "@/components";
import toast from 'react-hot-toast';

interface Order {
  id: string;
  createdAt: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  state: string;
  deliveryAddress: string;
  package: string;
  status: string;
  concerns?: string[];
  ip?: string;
  userAgent?: string;
}

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Call backend API directly
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const result = await response.json();
        if (result.success) {
          setOrder(result.order);
        } else {
          throw new Error(result.message || 'Failed to fetch order');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Could not load order details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      // Call backend API directly
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const result = await response.json();
      if (result.success) {
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
        toast.success('Order status updated successfully');
      } else {
        throw new Error(result.message || 'Failed to update status');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
        <DashboardSidebar />
        <div className="flex-1 p-8 text-center">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="text-center text-red-500 mb-4">Error: {error || 'Order not found'}</div>
          <button
            onClick={() => router.push('/admin/orders')}
            className="mx-auto block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin/orders')}
            className="text-blue-600 hover:underline mb-4"
          >
            ← Back to Orders
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Order Details</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-500">Full Name</label>
                  <p className="text-slate-900 font-medium">{order.fullName}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Phone Number</label>
                  <p className="text-slate-900">{order.phoneNumber}</p>
                </div>
                {order.whatsappNumber && (
                  <div>
                    <label className="text-sm text-slate-500">WhatsApp Number</label>
                    <p className="text-slate-900">{order.whatsappNumber}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-500">State</label>
                  <p className="text-slate-900">{order.state}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Delivery Address</label>
                  <p className="text-slate-900">{order.deliveryAddress}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-500">Order ID</label>
                  <p className="text-slate-900 font-mono text-sm">{order.id}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Package</label>
                  <p className="text-slate-900 font-medium">{order.package}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Order Date</label>
                  <p className="text-slate-900">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500 block mb-2">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(e.target.value)}
                    disabled={isUpdating}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Concerns */}
          {order.concerns && order.concerns.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Health Concerns</h2>
              <ul className="list-disc list-inside space-y-1">
                {order.concerns.map((concern, index) => (
                  <li key={index} className="text-slate-700">{concern}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Info */}
          {(order.ip || order.userAgent) && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Technical Information</h2>
              <div className="space-y-2 text-sm">
                {order.ip && (
                  <div>
                    <label className="text-slate-500">IP Address:</label>
                    <span className="ml-2 text-slate-700 font-mono">{order.ip}</span>
                  </div>
                )}
                {order.userAgent && (
                  <div>
                    <label className="text-slate-500">User Agent:</label>
                    <p className="text-slate-700 font-mono text-xs break-all">{order.userAgent}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
