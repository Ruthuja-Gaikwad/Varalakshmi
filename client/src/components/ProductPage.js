import React, { useState } from 'react';

const sampleProducts = [
  {
    id: 1,
    name: 'Gold Earrings',
    category: 'Earrings',
    weight: '10g',
    code: 'VJ-101',
    image: '/earrings.png',
  },
  {
    id: 2,
    name: 'Elegant Chain',
    category: 'Chains',
    weight: '15g',
    code: 'VJ-102',
    image: '/chains.png',
  },
  {
    id: 3,
    name: 'Classic Ring',
    category: 'Rings',
    weight: '8g',
    code: 'VJ-103',
    image: '/rings.png',
  },
  // Add more products here
];

export default function ProductPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [weightRange, setWeightRange] = useState(50);
  const [enquiryProduct, setEnquiryProduct] = useState(null); // To track which product the user wants to enquire about
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase());
    const weight = parseInt(product.weight.replace('g', ''));
    const withinWeight = weight <= weightRange;
    return matchesCategory && matchesSearch && withinWeight;
  });

  const handleEnquireClick = (product) => {
    setEnquiryProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    // Handle the enquiry submission logic here (e.g., send the data to a server)
    alert('Enquiry submitted successfully!');
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8 text-center">
        Our Gold Jewelry Collection
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          className="border px-4 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Earrings</option>
          <option>Chains</option>
          <option>Rings</option>
        </select>

        <input
          type="range"
          min="0"
          max="50"
          value={weightRange}
          onChange={(e) => setWeightRange(e.target.value)}
          className="w-48"
        />
        <span className="text-sm text-gray-600">Weight ≤ {weightRange}g</span>

        <input
          type="text"
          placeholder="Search by name or code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">Weight: {product.weight}</p>
            <p className="text-sm text-gray-500">Code: {product.code}</p>
            <button
              onClick={() => handleEnquireClick(product)}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              Enquire
            </button>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
        )}
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Enquire about {enquiryProduct.name}
            </h2>
            <form onSubmit={handleSubmitEnquiry}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded">
                Submit Enquiry
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
