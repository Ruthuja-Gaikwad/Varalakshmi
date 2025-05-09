import React from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/solid';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-[#B8860B] mb-10">📞 Contact Us</h1>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows="4" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#B8860B]"></textarea>
            </div>
            {/* Placeholder for CAPTCHA */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 italic">[CAPTCHA placeholder]</p>
            </div>
            <button className="bg-[#B8860B] text-white px-6 py-2 rounded hover:bg-yellow-700">Send Message</button>
          </form>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Info</h2>
              <div className="flex items-center space-x-3 mb-2">
                <PhoneIcon className="h-5 w-5 text-[#B8860B]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <MailIcon className="h-5 w-5 text-[#B8860B]" />
                <span>contact@varalakshmiworkshop.com</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <LocationMarkerIcon className="h-5 w-5 text-[#B8860B]" />
                <span>123 Artisan Lane, Hyderabad, Telangana</span>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Message on WhatsApp
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Workshop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0821497713945!2d78.48667181419585!3d17.385044588072204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9736bce2bd0f%3A0x891e8d85e0b62147!2sHyderabad!5e0!3m2!1sen!2sin!4v1629356952696!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
