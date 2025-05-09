import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
import Homepage from './components/HomePage';
import CustomOrderPage from './components/CustomOrderPage';
import ProductPage from './components/ProductPage';
import AboutUs from './components/AboutUs';
import ContactPage from './components/ContactPage'; // ✅ NEW

// Admin Components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import AddProduct from './components/admin/AddProduct';
import Orders from './components/admin/Orders';

// Product Context
import { ProductProvider } from './components/ProductContext';

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/custom" element={<CustomOrderPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* ✅ NEW ROUTE */}

          {/* Admin Pages */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
