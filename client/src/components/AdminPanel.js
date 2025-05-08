import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/custom-order');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-panel p-6">
      <h2 className="text-center text-3xl font-semibold text-yellow-700 my-6">Custom Orders</h2>

      {loading && (
        <div className="text-center text-yellow-600">Loading orders...</div>
      )}

      {error && (
        <div className="text-center text-red-600 mb-4">
          Error fetching orders: {error}
        </div>
      )}

      <table className="min-w-full table-auto border-collapse border border-gray-200 mt-6">
        <thead className="bg-yellow-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Contact</th>
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.contact}</td>
                <td className="border px-4 py-2">{order.type}</td>
                <td className="border px-4 py-2">{order.description}</td>
                <td className="border px-4 py-2">
                  {order.imageUrl && (
                    <img
                      src={`http://localhost:5000${order.imageUrl}`}
                      alt="Custom Design"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
