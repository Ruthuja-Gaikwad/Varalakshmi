import React, { useState } from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/solid';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-white to-yellow-50 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-[#B8860B] mb-12 drop-shadow-md">📞 Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-6 text-[#B8860B]">Send us a message</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] bg-gray-50"
              ></textarea>
            </div>
            <div className="mb-4 text-sm text-gray-500 italic">[CAPTCHA placeholder]</div>
            <button
              type="submit"
              className="w-full bg-[#B8860B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-200"
            >
              Send Message
            </button>
            {status && <p className="mt-4 text-sm text-center text-green-600">{status}</p>}
          </form>

          {/* Contact Info and Map */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-100">
              <h2 className="text-2xl font-semibold mb-4 text-[#B8860B]">Our Info</h2>
              <div className="flex items-center space-x-3 mb-3">
                <PhoneIcon className="h-5 w-5 text-[#B8860B]" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <MailIcon className="h-5 w-5 text-[#B8860B]" />
                <span className="text-gray-700">contact@varalakshmiworkshop.com</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <LocationMarkerIcon className="h-5 w-5 text-[#B8860B]" />
                <span className="text-gray-700">123 Artisan Lane, Hyderabad, Telangana</span>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Message on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-yellow-100">
              <iframe
                title="Workshop Location"
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="border-0 w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
