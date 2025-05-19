import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      if (!token) {
        setError('Unauthorized: Please log in first.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  // Function to delete the order
  const deleteOrder = async (orderId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Unauthorized: Please log in first.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Remove the deleted order from the state
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Error deleting order. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Customer Inquiries</h2>
        {error ? (
          <div className="text-red-600 mb-4">{error}</div>
        ) : (
          <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Name</th><th className="p-2">Contact</th><th className="p-2">Product Type</th><th className="p-2">Design Details</th><th className="p-2">Design Image</th><th className="p-2">Status</th><th className="p-2">Actions</th>
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
                      <td className="p-2">
                        <span className={`font-medium ${order.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
