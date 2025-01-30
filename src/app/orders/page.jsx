"use client";

import { useState } from "react";

export default function MyOrdersPage() {
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2025-01-15",
      status: "Delivered",
      items: [
        { name: "Wireless Mouse", quantity: 1 },
        { name: "Laptop Stand", quantity: 1 },
      ],
      total: "$75",
    },
    {
      id: "ORD002",
      date: "2025-01-20",
      status: "Processing",
      items: [{ name: "Mechanical Keyboard", quantity: 1 }],
      total: "$120",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Order #{order.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Placed on: {order.date}
              </p>
              <ul className="space-y-1 mb-2">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  Total: {order.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
