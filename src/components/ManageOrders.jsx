import React from "react";

const ManageOrders = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search orders by ID or customer..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Total</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">#ORD00{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-700">Customer {index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-700">2025-01-28</td>
                <td className="px-4 py-3 text-sm text-gray-700">${(index + 1) * 50}.00</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-lg text-white text-xs ${
                      index % 2 === 0
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {index % 2 === 0 ? "Pending" : "Delivered"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button className="px-3 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs text-white bg-red-500 rounded-lg hover:bg-red-600">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-gray-600">Showing 1-10 of 50 orders</span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            Previous
          </button>
          <button className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
