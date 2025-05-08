import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your custom design request has been submitted!');
    // TODO: Add backend form handling here
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
        Craft Your Custom Design
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5"
        encType="multipart/form-data"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-4 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone or Email</label>
          <input
            type="text"
            name="contact"
            className="w-full border px-4 py-2 rounded"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Product Type</label>
          <select
            name="type"
            className="w-full border px-4 py-2 rounded"
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

        <div>
          <label className="block mb-1 font-medium">Design Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full border px-4 py-2 rounded"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your custom design idea..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Design Sketch / Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
