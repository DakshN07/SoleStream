import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg group-hover:shadow-xl transition-shadow duration-300">
          <img 
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
              Only {product.stock} Left
            </div>
          )}
          {product.stock === 0 && (
             <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
               Sold Out
             </div>
          )}
        </div>
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 group-hover:text-primary transition">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold dark:text-gray-100">₹{product.price}</p>
          <div className="flex items-center gap-1 mt-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs text-gray-500 font-medium ml-1">{product.ratingAvg.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className={`mt-3 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
         <Link to={`/product/${product._id}`} className="w-full block text-center bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-primary text-white tracking-widest uppercase text-sm font-semibold py-3 flex items-center justify-center gap-2 hover:bg-primary transition rounded-sm">
           <ShoppingBag size={16} /> Quick View
         </Link>
      </div>
    </div>
  );
};

export default ProductCard;
