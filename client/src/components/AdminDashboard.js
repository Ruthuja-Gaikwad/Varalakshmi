import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([
    { id: 1, customer: 'John Doe', email: 'john@example.com', inquiry: 'What is the price of the earrings?' },
    { id: 2, customer: 'Jane Smith', email: 'jane@example.com', inquiry: 'Do you offer discounts on rings?' },
    { id: 3, customer: 'Sam Wilson', email: 'sam@example.com', inquiry: 'Is the chain available in silver?' },
  ]);

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', image: '' });
  const [error, setError] = useState(null); // For error handling

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again later.');
    }
  };

  // Handle editing a product
  const handleEditProduct = (id) => {
    alert('Editing product ' + id);
    // Implement editing logic (e.g., open a modal to edit product details)
  };

  // Handle showing/hiding the Add Product form
  const handleShowAddProductForm = () => {
    setShowAddProductForm(true);
  };

  const handleHideAddProductForm = () => {
    setShowAddProductForm(false);
    setNewProduct({ name: '', image: '' }); // Reset form fields
    setError(null); // Reset any previous error
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.image) {
      setError('Please fill in all the fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, res.data]); // Add the new product to the list
      handleHideAddProductForm(); // Hide form after successful submission
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again later.');
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle deleting customer inquiries
  const handleDeleteInquiry = (id) => {
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-yellow-700 mb-8">Admin Dashboard</h1>

      {/* Product Management Section */}
      <div className="mb-8">
        <button
          onClick={handleShowAddProductForm}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddProductForm && (
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={handleHideAddProductForm}
                className="ml-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  <img src={product.image} alt={product.name} className="h-12" />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="text-yellow-600 hover:underline mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Inquiries Section */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-12">Customer Inquiries</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Inquiry</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-t">
                <td className="border px-4 py-2">{inquiry.customer}</td>
                <td className="border px-4 py-2">{inquiry.email}</td>
                <td className="border px-4 py-2">{inquiry.inquiry}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteInquiry(inquiry.id)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
