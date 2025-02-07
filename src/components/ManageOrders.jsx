"use client"
import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { HashLoader, PulseLoader } from "react-spinners"


const ManageOrders = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/orders`, { credentials: 'include' });
        if (!response.ok) {
          const { error } = await response.json()
          if (response.status === 403) {
            dispatch(logout())
            router.replace('/auth/login')
            toast.error(error)
            return
          }
          toast.error(error)
          return
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteOrder = () => {
    console.log('deleting...')
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-black">
      <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>

      {
        isLoading ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh]`}>
            <PulseLoader color="#36d7b7" size={30} margin={5} />
            <p className="mt-4 text-lg font-medium text-black">Loading Orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Payment Status</th>
                  <th className="p-3 text-left">Order Status</th>
                  <th className="p-3 text-left">actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.totalAmount} className="border-b">
                      <td className="p-3">${order.totalAmount}</td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="p-3">{order.paymentStatus}</td>
                      <td className="p-3">{order.orderStatus}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 text-center text-gray-500" colSpan="4">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default ManageOrders;
