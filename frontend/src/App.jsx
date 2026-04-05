import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback';
import Auth from './pages/Auth';
import SoleStudio from './pages/SoleStudio';

const App = () => {
  const location = useLocation();

  const isBlankPage = location.pathname.includes('/login') || location.pathname.includes('/register');

  return (
    <div className="flex flex-col min-h-screen">
      {!isBlankPage && <Header />}
      <CartDrawer />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/studio" element={<SoleStudio />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          {/* Note: I didn't create a specific orders page, but added myorders API. A simple fallback: */}
          <Route path="/orders" element={<div className="h-screen flex items-center justify-center font-bold text-2xl tracking-widest text-gray-500 uppercase">My Orders (Coming Soon)</div>} />
        </Routes>
      </main>
      {!isBlankPage && <Footer />}
    </div>
  );
};

export default App;
