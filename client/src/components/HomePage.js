import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import {
  FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope, FaPhone,
  FaGem, FaUserFriends, FaPencilRuler
} from 'react-icons/fa';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 

  // Handle modal opening and passing the selected item
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="font-sans">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow z-50 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-700">Varalakshmi Workshop</div>
        <div className="space-x-6 text-gray-700 font-medium">
          <a href="#home">Home</a>
          <a href="#productpage">Product</a>
          <Link to="/custom">Custom Order</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#B8860B] transition duration-300">Contact</Link>
          <Link to="/admin/Login" className="text-yellow-700 hover:underline">Admin Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: 'url(/banner.png)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for better text contrast */}
        <div className="relative z-10 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">Handcrafted Elegance in Every Detail</h1>
          <div className="space-x-4">
            <Link to="/products">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl transition duration-300 transform hover:scale-105">
                Browse Jewellery
              </button>
            </Link>
            <Link to="/custom">
              <button className="bg-white hover:bg-gray-200 text-yellow-700 px-8 py-3 rounded-xl transition duration-300 transform hover:scale-105">
                Custom Order
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productpage" className="py-12 bg-gray-50">
        <h2 className="text-3xl text-center font-semibold text-yellow-700 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {["Earrings", "Rings", "Chains"].map((item) => (
            <div 
              key={item} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 text-center transition duration-300 transform hover:scale-105"
              onClick={() => handleViewDetails(item)} // Trigger modal on product click
            >
              <img
                src={`/${item.toLowerCase()}.png`}
                alt={`${item} - Varalakshmi Workshop`}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800 mb-2">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Product Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">{selectedItem}</h2>
            <p className="text-lg text-gray-700 mb-4">
              Detailed information about {selectedItem}. You can add more details here like description, price, etc.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}  // Close modal
              className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl text-center font-semibold text-yellow-700 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-center">
          <div>
            <FaGem className="mx-auto text-yellow-600 text-4xl mb-4" />
            <h4 className="font-bold text-lg mb-2">Authentic Gold</h4>
            <p>Certified purity and guaranteed quality for every piece.</p>
          </div>
          <div>
            <FaUserFriends className="mx-auto text-yellow-600 text-4xl mb-4" />
            <h4 className="font-bold text-lg mb-2">Skilled Artisans</h4>
            <p>Expert craftsmanship passed down through generations.</p>
          </div>
          <div>
            <FaPencilRuler className="mx-auto text-yellow-600 text-4xl mb-4" />
            <h4 className="font-bold text-lg mb-2">Custom Designs</h4>
            <p>Your dream design brought to life with precision.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gray-50 text-center px-4">
        <h2 className="text-3xl font-semibold text-yellow-700 mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-4">
          For generations, Varalakshmi Workshop has been a symbol of trust and artistry in gold craftsmanship.
        </p>
        <a href="/about" className="text-yellow-700 hover:underline">Read More</a>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-yellow-700 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold mb-2">Visit Us</h4>
            <p>Chowrastha, Warangal, India</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Contact</h4>
            <p><FaPhone className="inline mr-2" />+91 9553504775</p>
            <p><FaEnvelope className="inline mr-2" />varalakshmi-workshop@gmail.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4 text-xl">
              <FaInstagram />
              <FaFacebook />
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/916303557831"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full text-white shadow-lg hover:bg-green-600"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
}
