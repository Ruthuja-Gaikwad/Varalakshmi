import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaImage, FaPen } from 'react-icons/fa';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('contact', formData.contact);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('file', formData.file);

    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not logged in. Please log in to submit an order.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit order');
      }

      const result = await response.json();
      alert('Your custom design request has been submitted!');
      console.log('Order saved:', result);

      setFormData({
        name: '',
        contact: '',
        type: '',
        description: '',
        file: null,
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(error.message || 'There was a problem submitting your request.');
    }
  };

  return (
    <div
      className="max-w-full lg:max-w-lg xl:max-w-xl mx-auto px-3 py-4 font-sans bg-cover bg-center bg-no-repeat rounded-xl shadow-lg relative"
      style={{
        backgroundImage:
          "url('https://www.toptal.com/designers/subtlepatterns/patterns/sand.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 rounded-xl"></div>

      <h1 className="text-2xl font-bold text-yellow-700 mb-3 text-center relative z-10">
        Craft Your Custom Design
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-5 rounded-xl shadow-lg space-y-4"
        encType="multipart/form-data"
      >
        <div className="space-y-1">
          <label className="block text-md font-semibold text-gray-700 flex items-center">
            <FaUser className="mr-2 text-yellow-600" />
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-md font-semibold text-gray-700 flex items-center">
            <FaPhoneAlt className="mr-2 text-yellow-600" />
            Phone or Email
          </label>
          <input
            type="text"
            name="contact"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-md font-semibold text-gray-700">Product Type</label>
          <select
            name="type"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="Earrings">Earrings</option>
            <option value="Chains">Chains</option>
            <option value="Rings">Rings</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-md font-semibold text-gray-700 flex items-center">
            <FaPen className="mr-2 text-yellow-600" />
            Design Description
          </label>
          <textarea
            name="description"
            rows="3"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your custom design idea..."
            required
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="block text-md font-semibold text-gray-700 flex items-center">
            <FaImage className="mr-2 text-yellow-600" />
            Upload Design Sketch / Image
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={handleChange}
            required
          />
          {formData.file && (
            <img
              src={URL.createObjectURL(formData.file)}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded-lg border"
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-xl shadow-lg transition duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
