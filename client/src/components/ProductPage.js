import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import EnquiryModal from './EnquiryModal';

export const sampleProducts = [
  {
    id: '000000000000000000000001',
    name: 'Gold Earrings',
    category: 'Earrings',
    weight: '10g',
    code: 'VJ-101',
    image: '/earrings.png',
  },
  {
    id: '000000000000000000000002',
    name: 'Elegant Chain',
    category: 'Chains',
    weight: '15g',
    code: 'VJ-102',
    image: '/chains.png',
  },
  {
    id: '000000000000000000000003',
    name: 'Classic Ring',
    category: 'Rings',
    weight: '8g',
    code: 'VJ-103',
    image: '/rings.png',
  },
];

const socket = io('http://localhost:5000'); // WebSocket server

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [weightRange, setWeightRange] = useState(50);
  const [newProductNotification, setNewProductNotification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const backendProducts = res.data.map((prod, index) => ({
          id: prod._id,
          name: prod.name,
          category: prod.category || 'Misc',
          weight: prod.weight || '0g',
          code: `VJ-${(index + 101).toString().padStart(3, '0')}`, // Automatically set the code
          image: prod.image
            ? `http://localhost:5000/${prod.image.replace(/^\/?uploads\/?/, 'uploads/')}`
            : '/fallback.png',
        }));
        setProducts([...sampleProducts, ...backendProducts]);
      })
      .catch(err => console.error('Error fetching products:', err));

    socket.on('productAdded', (productData) => {
      const newProduct = {
        id: productData._id,
        name: productData.name,
        category: productData.category || 'Misc',
        weight: productData.weight || '0g',
        code: `VJ-${(products.length + 101).toString().padStart(3, '0')}`, // Automatically incremented code
        image: productData.image
          ? `http://localhost:5000/${productData.image.replace(/^\/?uploads\/?/, 'uploads/')}`
          : '/fallback.png',
      };

      setProducts(prev => [...prev, newProduct]);
      setNewProductNotification(`New product added: ${productData.name}`);
      setTimeout(() => setNewProductNotification(''), 5000);
    });

    return () => {
      socket.off('productAdded');
    };
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase());
    const weight = parseInt(product.weight.replace('g', '')) || 0;
    return matchesCategory && matchesSearch && weight <= weightRange;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleImageClick = (product) => {
    setLargeImage(product.image);
    setSelectedCode(product.code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-yellow-700 mb-8 text-center">
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
          className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Earrings</option>
          <option>Chains</option>
          <option>Rings</option>
          <option>Bangels</option>
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
          className="border px-4 py-2 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-contain rounded mb-4 cursor-pointer"
              onClick={() => handleImageClick(product)} // Show larger image on click
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback.png';
              }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">Weight: {product.weight}</p>
            <p className="text-sm text-gray-500">Code: {product.code}</p>
            <button
              onClick={() => openModal(product)}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors"
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
      <EnquiryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        enquiryProduct={selectedProduct}
      />

      {/* Large Image Viewer */}
      {largeImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg">
            <img src={largeImage} alt="Large View" className="max-w-full max-h-screen" />
            <p className="mt-4 text-center text-xl font-semibold text-yellow-600">Product Code: {selectedCode}</p>
            <button
              onClick={() => setLargeImage(null)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
