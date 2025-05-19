import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    image: null,
    weight: '',
    designCode: '',
    category: '',
    price: ''
  });
  const [formError, setFormError] = useState('');
  const { productId } = useParams(); // Get the product ID from the URL params
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  useEffect(() => {
    // Fetch the product data to be edited
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setFormError('Failed to fetch product. Please try again later.');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const { name, image, weight, designCode, category, price } = product;
    if (!name || !image || !weight || !designCode || !category || !price) {
      setFormError('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product updated successfully!');
      navigate('/admin/products'); // Use navigate instead of history.push
    } catch (err) {
      setFormError('Failed to update product. Please try again.');
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Edit Product</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            name="weight"
            placeholder="Weight"
            value={product.weight}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            name="designCode"
            placeholder="Design Code"
            value={product.designCode}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border p-3 rounded-md"
          />
          {formError && <p className="text-red-500 col-span-full">{formError}</p>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded col-span-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
