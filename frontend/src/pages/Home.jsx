import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?sort=Newest');
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching homepage products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 opacity-80 md:w-1/2 md:right-0 md:left-auto">
          {/* Main Air Jordan 3D Hero */}
          <ThreeScene color="#4F46E5" modelUrl="/models/nike_air_jordan/scene.gltf" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 pr-12"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-none mb-6">
              Walk <br />
              <span className="text-primary italic">Different.</span>
            </h1>
            <p className="text-xl text-gray-600 font-light mb-10 max-w-lg leading-relaxed">
              Step into the future of footwear. Experience AI-curated custom fits and interact with your sneakers in stunning 3D before they even hit your doorstep.
            </p>
            <Link to="/gallery" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary transition shadow-xl hover:-translate-y-1 transform duration-300 inline-block">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-white py-4 overflow-hidden shadow-inner flex whitespace-nowrap">
        <motion.div
           className="inline-block"
           initial={{ x: "0%" }}
           animate={{ x: "-100%" }}
           transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {Array(10).fill().map((_, i) => (
             <span key={i} className="text-xl font-bold uppercase tracking-[0.2em] px-8">
               Nike • Adidas • Puma • New Balance • Asics • Vans • Converse • 
             </span>
          ))}
        </motion.div>
      </div>

      {/* New Arrivals Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 mt-2 font-medium">Fresh off the line. Grab them before they're gone.</p>
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
               <div key={i} className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Base Model...</div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
