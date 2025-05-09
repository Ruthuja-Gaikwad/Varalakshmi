import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Sample products array (static data)
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

// Initialize socket connection
const socket = io('http://localhost:5000');

export default function ProductPage() {
  const [products, setProducts] = useState([]); // Initialize with empty state
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [weightRange, setWeightRange] = useState(50);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newProductNotification, setNewProductNotification] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const backendProducts = res.data.map(prod => ({
          id: prod._id, // match the structure
          name: prod.name,
          category: prod.category || 'Misc',
          weight: prod.weight || '0g',
          code: prod.code || 'VJ-XXX',
          image: `http://localhost:5000${prod.image}`, // fix image path
        }));

        // Combine static and dynamic products
        setProducts([...sampleProducts, ...backendProducts]);
      })
      .catch(err => console.error('Error fetching products:', err));

    // Listen for new product notifications via socket
    socket.on('productAdded', (productData) => {
      setProducts((prev) => [...prev, productData]);
      setNewProductNotification(`New product added: ${productData.name}`);
      setTimeout(() => setNewProductNotification(''), 5000); // Clear the notification after 5 seconds
    });

    // Cleanup socket connection on component unmount
    return () => socket.off('productAdded');
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  }, [isModalOpen]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase());
    const weight = parseInt(product.weight.replace('g', ''));
    return matchesCategory && matchesSearch && weight <= weightRange;
  });

  const handleEnquireClick = (product) => {
    setEnquiryProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    alert('Enquiry submitted successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8 text-center">
        Our Gold Jewelry Collection
      </h1>

      {newProductNotification && (
        <div className="mb-4 text-white bg-green-600 p-2 rounded text-center">
          {newProductNotification}
        </div>
      )}

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
          <option>Bangles</option>
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
            {/* Render image from the backend */}
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback.png'; // fallback for broken links
              }}
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
      {isModalOpen && enquiryProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-w-full">
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
              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded"
              >
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
