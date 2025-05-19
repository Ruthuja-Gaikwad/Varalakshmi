import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState('');
  const [apiError, setApiError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: null,
    weight: '',
    designCode: '',
    category: '',
    price: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      setApiError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setApiError('Failed to delete product. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct(prev => ({ ...prev, image: file }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    const { name, image, weight, designCode, category, price } = newProduct;
    if (!name || !image || !weight || !designCode || !category || !price) {
      setFormError('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => formData.append(key, value));

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully!');
      setNewProduct({ name: '', image: null, weight: '', designCode: '', category: '', price: '' });
      fetchProducts();
    } catch (err) {
      setFormError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Add New Product</h2>

        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg"
        >
          <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} className="border p-3 rounded-md" />
          <input name="weight" placeholder="Weight" value={newProduct.weight} onChange={handleInputChange} className="border p-3 rounded-md" />
          <input name="designCode" placeholder="Design Code" value={newProduct.designCode} onChange={handleInputChange} className="border p-3 rounded-md" />
          <input name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} className="border p-3 rounded-md" />
          <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleInputChange} className="border p-3 rounded-md" />
          <input type="file" name="image" onChange={handleImageChange} className="border p-3 rounded-md" />
          {formError && <p className="text-red-500 col-span-full">{formError}</p>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold p-3 rounded col-span-full">
            Add Product
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-700">Manage Products</h2>
        {apiError && <p className="text-red-500">{apiError}</p>}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 rounded-lg bg-white shadow-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Product Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50 transition-all duration-300 ease-in-out"
                    >
                      <td className="px-4 py-3">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg shadow-sm"
                      />

                      </td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">${parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-4">
                          <Link to={`/admin/edit-product/${product._id}`} className="text-blue-600 hover:underline">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No products available
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

export default Products;
