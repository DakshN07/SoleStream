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
                  src="https://image.pollinations.ai/prompt/premium_slipper_sandal_floating_in_void_dark_aesthetic?width=1000&height=1000&seed=991&nologo=true" 
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
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
              {mode === 'slippers' ? 'Featured Slides' : 'New Arrivals'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {mode === 'slippers' ? 'Premium comfort for indoor and outdoor living.' : 'Fresh off the line. Grab them before they\'re gone.'}
            </p>
          </div>
          <Link to="/gallery" className="hidden md:block text-primary font-bold uppercase tracking-widest text-sm hover:underline">
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

      {/* Secret Extra Section for Slippers ONLY */}
      {mode === 'slippers' && (
        <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase">The Slide <br/><span className="text-primary italic">Collection</span></h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Elevating the art of lounging. Our exclusive collection of slides and slippers combines architectural silhouettes with cloud-like comfort. Designed for the discerning teacher, traveler, and trendsetter.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1">
                      <span className="text-primary font-bold text-2xl">08+</span>
                      <p className="text-sm text-gray-500 uppercase tracking-tighter mt-1">Local Icons</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1">
                      <span className="text-primary font-bold text-2xl">24/7</span>
                      <p className="text-sm text-gray-500 uppercase tracking-tighter mt-1">Soft Support</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img src="/images/slippers/slp3.jpg" alt="Collection detail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-white font-medium italic">"Architecture you can wear on your feet."</p>
                  </div>
                </motion.div>
             </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;
