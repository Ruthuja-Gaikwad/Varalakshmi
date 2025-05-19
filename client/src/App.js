import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './tailwind.css';

// Public Components
import WelcomePage from './components/WelcomePage';  // Import the Landing Page
import Homepage from './components/HomePage';
import CustomOrderPage from './components/CustomOrderPage';
import ProductPage from './components/ProductPage';
import AboutUs from './components/AboutUs';
import ContactPage from './components/ContactPage';

// Admin Components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import AddProduct from './components/admin/AddProduct';
import Orders from './components/admin/Orders';
import EnquiriesPage from './components/admin/EnquiriesPage';
import EditProduct from './components/admin/EditProduct';

// Product Context
import { ProductProvider } from './components/ProductContext';

// ProtectedRoute Component
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<WelcomePage />} /> {/* This will be the first page the user sees */}

          {/* Public Pages */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/custom" element={<CustomOrderPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedRoute><EnquiriesPage /></ProtectedRoute>} />
          
          {/* Corrected edit-product route */}
          <Route path="/admin/edit-product/:productId" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
