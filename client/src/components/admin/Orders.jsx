import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Customer Inquiries</h2>
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Product Type</th>
                <th className="p-2">Design Details</th>
                <th className="p-2">Design Image</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{order.name}</td>
                    <td className="p-2">{order.contact}</td>
                    <td className="p-2">{order.type}</td>
                    <td className="p-2">{order.description}</td>
                    <td className="p-2">
                      {order.imageUrl ? (
                        <a
                          href={`http://localhost:5000${order.imageUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Image
                        </a>
                      ) : (
                        'No image'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
