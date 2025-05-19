import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Helper to get auth headers
  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token
      ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      : {};
  };

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('/api/enquiries', {
        headers: authHeaders(),
      });
      setEnquiries(response.data);
    } catch (err) {
      console.error('Failed to fetch enquiries', err);
      if (err.response?.status === 401) {
        // Unauthorized — redirect to login
        navigate('/admin/login', { replace: true });
      } else {
        setError('Failed to fetch enquiries');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteEnquiry = async (id) => {
    try {
      await axios.delete(`/api/enquiries/${id}`, {
        headers: authHeaders(),
      });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Failed to delete enquiry', err);
      if (err.response?.status === 401) {
        navigate('/admin/login', { replace: true });
      } else {
        setError('Failed to delete enquiry');
      }
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = () => {
    setError('');
    setLoading(true);
    fetchEnquiries();
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow-sm">
        Enquiries & Orders
      </h1>

      {loading && <p className="text-center text-blue-800">Loading...</p>}

      {error && (
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-md transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && enquiries.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No enquiries found.</p>
      )}

      {!loading && !error && enquiries.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-blue-100 rounded-xl shadow-lg">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="py-3 px-4 text-left border-b">Name</th>
                <th className="py-3 px-4 text-left border-b">Email</th>
                <th className="py-3 px-4 text-left border-b">Type</th>
                <th className="py-3 px-4 text-left border-b">Message / Quantity</th>
                <th className="py-3 px-4 text-left border-b">Product</th>
                <th className="py-3 px-4 text-left border-b">Date</th>
                <th className="py-3 px-4 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr
                  key={enquiry._id || index}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4 border-b">{enquiry.name}</td>
                  <td className="py-3 px-4 border-b">{enquiry.email}</td>
                  <td className="py-3 px-4 border-b">
                    {enquiry.isOrder ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Order
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Enquiry
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {enquiry.isOrder
                      ? `Qty: ${enquiry.quantity}`
                      : enquiry.message}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {enquiry.product?.name || 'N/A'}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-600">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      onClick={() => deleteEnquiry(enquiry._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquiriesPage;
