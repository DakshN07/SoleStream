import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [brands, setBrands] = useState([]);
  const [sort, setSort] = useState('Newest');
  const [color, setColor] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = `/products?sort=${sort}`;
      if (brands.length > 0) query += `&brand=${brands.join(',')}`;
      if (color) query += `&color=${color}`;
      
      const { data } = await api.get(query);
      setProducts(data);
    } catch(err) {
      console.error("Failed to load products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [sort, brands, color]);

  const toggleBrand = (brand) => {
    setBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const colors = ['White', 'Black', 'Red', 'Blue', 'Grey'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-4xl font-black tracking-tighter">Sneakers</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-gray-500">{products.length} Results</span>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="border-none bg-gray-50 py-2 px-4 rounded focus:ring-1 focus:ring-primary outline-none uppercase tracking-widest text-xs font-bold"
          >
            <option value="Newest">Newest</option>
            <option value="Price Low-High">Price Low-High</option>
            <option value="Price High-Low">Price High-Low</option>
            <option value="Best Rated">Best Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          
          <div>
             <h3 className="font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><Filter size={16} /> Brands</h3>
             <div className="space-y-3">
               {['Nike', 'Adidas', 'New Balance', 'Puma'].map(b => (
                 <label key={b} className="flex items-center gap-3 cursor-pointer text-sm">
                   <input type="checkbox" className="form-checkbox text-primary rounded-sm border-gray-300 focus:ring-primary w-4 h-4" checked={brands.includes(b)} onChange={() => toggleBrand(b)} />
                   {b}
                 </label>
               ))}
             </div>
          </div>

          <div>
             <h3 className="font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><SlidersHorizontal size={16} /> Colors</h3>
             <div className="flex flex-wrap gap-2">
               {colors.map(c => (
                 <button 
                   key={c}
                   onClick={() => setColor(color === c ? '' : c)}
                   className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-primary scale-110 shadow-md' : 'border-transparent shadow-sm'}`}
                   style={{ backgroundColor: c.toLowerCase(), borderWidth: color === c ? '2px' : '1px', borderColor: c === 'White' && color !== 'White' ? '#e5e7eb' : '' }}
                   title={c}
                 />
               ))}
             </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="flex-1">
           {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill().map((_, i) => (
                   <div key={i} className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Base Model...</div>
                ))}
             </div>
           ) : products.length === 0 ? (
             <div className="text-center py-20 text-gray-500 font-medium">No sneakers matched your filter. Try adjusting your search.</div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Gallery;
