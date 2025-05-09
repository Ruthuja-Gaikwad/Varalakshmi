import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming Sidebar exists
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: null,
    weight: '',
    designCode: '',
    category: '',
    price: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError('Failed to delete product. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.image || !newProduct.weight || !newProduct.designCode || !newProduct.category || !newProduct.price) {
      setError('Please fill in all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('image', newProduct.image);
    formData.append('weight', newProduct.weight);
    formData.append('designCode', newProduct.designCode);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully!');
      setNewProduct({
        name: '',
        image: null,
        weight: '',
        designCode: '',
        category: '',
        price: ''
      });
      fetchProducts(); // Reload product list
    } catch (err) {
      setError('Failed to add product. Please try again later.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow mb-8">
          <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} className="border p-2 rounded" />
          <input name="weight" placeholder="Weight" value={newProduct.weight} onChange={handleInputChange} className="border p-2 rounded" />
          <input name="designCode" placeholder="Design Code" value={newProduct.designCode} onChange={handleInputChange} className="border p-2 rounded" />
          <input name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} className="border p-2 rounded" />
          <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="file" name="image" onChange={handleImageChange} className="border p-2 rounded" />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2 col-span-full">
            Add Product
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Link to={`/admin/edit-product/${product._id}`} className="text-blue-500 hover:text-blue-700">Edit</Link>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
