import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EnquiryModal({ isModalOpen, setIsModalOpen, enquiryProduct }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [message, setMessage]   = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress]   = useState('');
  const [isOrder, setIsOrder]   = useState(false);
  const [error, setError]       = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsModalOpen]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !phone) {
    setError('Name, email, and phone number are required.');
    return;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    setError('Please enter a valid email address.');
    return;
  }
  if (!phone.match(/^\+?\d{7,15}$/)) {
    setError('Please enter a valid phone number.');
    return;
  }
  if (isOrder && (!address || quantity < 1)) {
    setError('Please enter a valid quantity and shipping address.');
    return;
  }
  if (!isOrder && !message) {
    setError('Please enter a message for your enquiry.');
    return;
  }

  const productId = enquiryProduct?._id || enquiryProduct?.id;
  const payload = {
    name,
    email,
    phone,
    product: productId,
    isOrder,
    ...(isOrder ? { quantity, address } : { message }),
  };

  try {
    setSubmitting(true);
    
    // Get JWT token from localStorage (or however you store it)
    const token = localStorage.getItem('token');

    // Send the request with Authorization header
    await axios.post('/api/enquiries', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert('Submitted successfully!');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setQuantity(1);
    setAddress('');
    setIsOrder(false);
    setError('');
    setIsModalOpen(false);
  } catch (err) {
    console.error('Error submitting:', err.response?.data || err.message);
    setError(err.response?.data?.message || 'Failed to submit—please try again later.');
  } finally {
    setSubmitting(false);
  }
};

  if (!isModalOpen || !enquiryProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-2xl shadow-2xl w-full max-w-md p-6 font-sans space-y-4"
      >
        <h2 id="modal-title" className="text-2xl font-serif text-yellow-800 text-center mb-2 drop-shadow-md">
          {isOrder ? `Order ${enquiryProduct?.name || 'Product'}` : `Enquire about ${enquiryProduct?.name || 'Product'}`}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none"
            aria-label="Name"
            required
          />

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none"
            aria-label="Email"
            required
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none"
            aria-label="Phone"
            required
          />

          {!isOrder ? (
            <textarea
              placeholder="Your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full h-24 px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none resize-none"
              aria-label="Message"
              required
            />
          ) : (
            <>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none"
                placeholder="Quantity"
                aria-label="Quantity"
                required
              />
              <textarea
                placeholder="Shipping Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full h-20 px-4 py-2 rounded-lg border-2 border-yellow-500 focus:outline-none resize-none"
                aria-label="Shipping Address"
                required
              />
            </>
          )}

          <button
            type="submit"
            className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-lg shadow-md transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : isOrder ? 'Place Order' : 'Submit Enquiry'}
          </button>
        </form>

        <div className="flex justify-between text-sm text-yellow-800">
          <button onClick={() => setIsModalOpen(false)} className="hover:underline">Cancel</button>
          <button onClick={() => { setIsOrder(!isOrder); setError(''); }} className="hover:underline">
            {isOrder ? 'Switch to Enquiry' : 'Switch to Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
