// "use client";



// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const response = await fetch("http://localhost:3001/api/orders");
//       const data = await response.json();
//       setOrders(data);
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div className="xl:ml-5 w-full max-xl:mt-5 ">
//       <h1 className="text-3xl font-semibold text-center mb-5">All orders</h1>
//       <div className="overflow-x-auto">
//         <table className="table table-md table-pin-cols">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>
//                 <label>
//                   <input type="checkbox" className="checkbox" />
//                 </label>
//               </th>
//               <th>Order ID</th>
//               <th>Name and country</th>
//               <th>Status</th>
//               <th>Subtotal</th>
//               <th>Date</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* row 1 */}
//             {orders &&
//               orders.map((order) => (
//                 <tr key={order?.id}>
//                   <th>
//                     <label>
//                       <input type="checkbox" className="checkbox" />
//                     </label>
//                   </th>

//                   <td>
//                     <div>
//                       <p className="font-bold">#{order?.id}</p>
//                     </div>
//                   </td>

//                   <td>
//                     <div className="flex items-center gap-5">
//                       <div>
//                         <div className="font-bold">{order?.name}</div>
//                         <div className="text-sm opacity-50">{order?.country}</div>
//                       </div>
//                     </div>
//                   </td>

//                   <td>
//                     <span className="badge badge-success text-white badge-sm">
//                       {order?.status}
//                     </span>
//                   </td>

//                   <td>
//                     <p>${order?.total}</p>
//                   </td>

//                   <td>{ new Date(Date.parse(order?.dateTime)).toDateString() }</td>
//                   <th>
//                     <Link
//                       href={`/admin/orders/${order?.id}`}
//                       className="btn btn-ghost btn-xs"
//                     >
//                       details
//                     </Link>
//                   </th>
//                 </tr>
//               ))}
//           </tbody>
//           {/* foot */}
//           <tfoot>
//             <tr>
//               <th></th>
//               <th>Order ID</th>
//               <th>Name and country</th>
//               <th>Status</th>
//               <th>Subtotal</th>
//               <th>Date</th>
//               <th></th>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;


// In components/AdminOrders.tsx

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Define the type for a single order to match our backend data
interface LandingOrder {
  id: string;
  createdAt: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  package: string;
  status: string;
}

// Define the structure of the API response
interface ApiResponse {
  success: boolean;
  orders: LandingOrder[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

const AdminOrders = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use the Next.js API route, not the direct backend URL
        const response = await fetch(`/api/orders?page=${page}&limit=20`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
        toast.error('Could not load orders.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  if (isLoading) {
    return <div className="w-full p-10 text-center">Loading orders...</div>;
  }

  if (error) {
    return <div className="w-full p-10 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Landing Page Orders</h1>
        <span className="text-slate-500 font-medium">Total: {data?.pagination.total || 0}</span>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">State</th>
              <th scope="col" className="px-6 py-3">Package</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders.map((order) => (
              <tr key={order.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold">{order.fullName}</div>
                  <div className="text-slate-500">{order.phoneNumber}</div>
                </td>
                <td className="px-6 py-4">{order.state}</td>
                <td className="px-6 py-4">{order.package}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border rounded-lg hover:bg-slate-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-slate-700">
          Page {data?.pagination.page} of {data?.pagination.pages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(data?.pagination.pages || 1, p + 1))}
          disabled={page === data?.pagination.pages}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border rounded-lg hover:bg-slate-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
