import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import useModeStore from '../store/modeStore';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { mode } = useModeStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products?sort=Newest&department=${mode}`);
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching homepage products", error);
      }
    };
    fetchProducts();
  }, [mode]);

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 w-full h-full z-0 opacity-80 md:w-1/2 md:right-0 md:left-auto">
          {mode === 'shoes' ? (
             <ThreeScene color="#4F46E5" modelUrl="/models/nike_air_jordan/scene.gltf" />
          ) : (
             <motion.div 
               className="w-full h-full flex items-center justify-center p-12"
               animate={{ y: [0, -30, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
             >
                <img 
                  src="https://images.unsplash.com/photo-1698288863690-67a6d9154a43?q=80&w=1000&auto=format&fit=crop" 
                  alt="Floating Slipper" 
                  className="max-w-full h-auto drop-shadow-2xl rounded-full border-4 border-gray-800"
                  style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                />
             </motion.div>
          )}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 pr-12"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-none mb-6">
              {mode === 'slippers' ? 'Slide' : 'Walk'} <br />
              <span className="text-primary italic">Different.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light mb-10 max-w-lg leading-relaxed">
              Step into the future of footwear. Experience AI-curated custom fits and interact with your {mode === 'slippers' ? 'slides' : 'sneakers'} before they even hit your doorstep.
            </p>
            <Link to="/gallery" className="bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary transition shadow-xl hover:-translate-y-1 transform duration-300 inline-block">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="bg-primary text-white py-4 overflow-hidden shadow-inner flex whitespace-nowrap">
        <motion.div
           className="inline-block"
           initial={{ x: "0%" }}
           animate={{ x: "-100%" }}
           transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {Array(10).fill().map((_, i) => (
             <span key={i} className="text-xl font-bold uppercase tracking-[0.2em] px-8">
               {mode === 'slippers' ? 'Birkenstock • Crocs • Yeezy • Gucci • Nike • ' : 'Nike • Adidas • Puma • New Balance • Asics • Vans • Converse • '}
             </span>
          ))}
        </motion.div>
      </div>

      {/* New Arrivals Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">New Arrivals</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Fresh off the line. Grab them before they're gone.</p>
          </div>
          <Link to="/gallery?sort=Newest" className="hidden md:block text-primary font-bold uppercase tracking-widest text-sm hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            Array(4).fill().map((_, i) => (
               <div key={i} className="w-full aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">Loading Models...</div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
