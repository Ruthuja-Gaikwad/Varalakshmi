import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Components
import Homepage from './components/HomePage';
import ProductsPage from './components/ProductPage';
import CustomOrderPage from './components/CustomOrderPage';
import AboutPage from './components/AboutPage';

// Admin Components
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/custom" element={<CustomOrderPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/panel" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
