import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, Sparkles } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import useModeStore from '../store/modeStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, toggleCart } = useCartStore();
  const { userInfo, logout } = useAuthStore();
  const { mode, toggleMode } = useModeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition flex items-center gap-2 dark:text-gray-100">
            {mode === 'slippers' ? 'Sole' : 'Sole'}<span className="text-primary">{mode === 'slippers' ? 'Slide' : 'Stream'}</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest dark:text-gray-200">
            <Link to="/gallery" className="hover:text-primary transition">Shop {mode === 'slippers' ? 'Slides' : 'Kicks'}</Link>
            <Link to="/gallery?sort=Newest" className="hover:text-primary transition">New Arrivals</Link>
            <Link to="/studio" className="hover:text-primary transition flex items-center gap-1"><Sparkles size={14} className="text-primary"/> Studio</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6 dark:text-gray-200">
            <button className="hover:text-primary transition"><Search size={20} strokeWidth={1.5} /></button>
            
            <div className="relative group">
              <button 
                className="hover:text-primary transition flex items-center cursor-pointer"
                onClick={() => { if(!userInfo) navigate('/login') }}
                onDoubleClick={() => toggleMode()} /* THE HIDDEN SECRET TOGGLE */
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              {userInfo && (
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-900 dark:border-gray-800 border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {userInfo.role === 'admin' && (
                     <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Admin Dashboard</Link>
                  )}
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">My Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
                </div>
              )}
            </div>

            <button onClick={toggleCart} className="relative hover:text-primary transition">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </button>

            <button className="md:hidden"><Menu size={20} strokeWidth={1.5} /></button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
