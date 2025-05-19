import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async (token) => {
      try {
        const [productRes, orderRes, contactRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/admin/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/contact', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!productRes.ok || !orderRes.ok || !contactRes.ok) {
          throw new Error('One or more requests failed');
        }

        const [productData, orderData, contactData] = await Promise.all([
          productRes.json(),
          orderRes.json(),
          contactRes.json(),
        ]);

        setTotalProducts(Array.isArray(productData) ? productData.length : 0);
        setPendingOrders(
          Array.isArray(orderData) ? orderData.filter(order => order.status === 'pending').length : 0
        );
        setContacts(
          contactData && Array.isArray(contactData.messages) ? contactData.messages : []
        );
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setError('Failed to load dashboard data. Please try again.');
        localStorage.removeItem('token');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Token invalid or expired');

        const data = await response.json();
        console.log('Verified:', data.message);

        // Fetch data after verification
        fetchDashboardData(token);
      } catch (err) {
        console.error('Token verification failed:', err);
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleDeleteContact = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setContacts(prev => prev.filter(contact => contact._id !== id));
      } else {
        console.error('Failed to delete contact:', await res.text());
      }
    } catch (err) {
      console.error('Delete contact error:', err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      navigate('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-lg font-medium text-gray-700">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-lg font-medium text-gray-700">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-lg font-medium text-gray-700">Total Enquiries</p>
            <p className="text-2xl font-bold text-gray-800">{contacts.length}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Contacts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Email</th>
                  <th className="px-4 py-2 text-left text-gray-600">Message</th>
                  <th className="px-4 py-2 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map(contact => (
                    <tr key={contact._id} className="border-t">
                      <td className="px-4 py-2">{contact.name}</td>
                      <td className="px-4 py-2">{contact.email}</td>
                      <td className="px-4 py-2">{contact.message}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
