import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import useCartStore from '../store/cartStore';
import useSocketStore from '../store/socketStore';
import useAuthStore from '../store/authStore';
import { ShoppingBag, ArrowLeft, Star, Heart, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [liveStock, setLiveStock] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { addToCart, toggleCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const { socket, connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLiveStock(data.stock);
        if(data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        // Set default color mapped string -> hex (mocking it)
        if(data.colours && data.colours.length > 0) setSelectedColor(mapColorStringToHex(data.colours[0]));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchProduct();
    connectSocket();

    return () => {
       disconnectSocket();
    };
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.on('stock-alert', (data) => {
        if (data.productId === id) {
          setLiveStock(data.stockRemaining);
          if (data.stockRemaining < 5 && data.stockRemaining > 0) {
            toast(`⚡ Hurry! Only ${data.stockRemaining} left for ${data.productName}!`, { icon: '🔥' });
          } else if (data.stockRemaining === 0) {
            toast.error(`${data.productName} is Sold Out!`);
          }
        }
      });
    }
  }, [socket, id]);

  const mapColorStringToHex = (colorName) => {
    const map = { 'White': '#ffffff', 'Black': '#111111', 'Red': '#ef4444', 'Blue': '#3b82f6', 'Grey': '#9ca3af' };
    return map[colorName] || '#ffffff';
  };

  const handleAddToCart = () => {
    if(!selectedSize) return toast.error("Please select a size");
    addToCart({ ...product, selectedColor, selectedSize }, qty);
    toast.success('Added to Bag');
    toggleCart();
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, {
        rating,
        comment,
      });
      toast.success('Review Submitted!');
      // Refresh product data to show new review
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setRating(5);
      setComment('');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="min-h-screen flex text-primary items-center justify-center font-bold tracking-widest text-xl">LOADING AI EXPERIENCE...</div>;
  if (!product) return <div className="text-center py-32 text-red-500">Product not found.</div>;

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 transition-colors md:h-screen md:overflow-hidden flex flex-col pt-20">
      <div className="flex-1 flex flex-col md:flex-row max-w-[100vw]">
        
        {/* Left Interactive Panel */}
        <div className="relative w-full md:w-2/3 h-[60vh] md:h-full bg-gray-50 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-10 flex items-center gap-2 font-medium text-sm hover:text-primary transition uppercase tracking-widest bg-white dark:bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
            <ArrowLeft size={16} /> Back
          </button>

          {product.modelUrl ? (
            <>
              {/* Interactive Three Scene */}
              <ThreeScene color={selectedColor} modelUrl={product.modelUrl} />
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm">
                Drag to Rotate • Scroll to Zoom
              </div>
            </>
          ) : (
            <div className="w-full h-[60vh] md:h-full flex flex-col items-center justify-center bg-gray-100 p-6 md:p-12 relative">
               <div className="w-full max-w-lg aspect-square bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center overflow-hidden p-8 transition-all">
                  <img 
                    src={product.images[activeImgIndex]} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain filter drop-shadow-xl"
                  />
               </div>
               
               {product.images.length > 1 && (
                  <div className="flex gap-4 mt-8 shrink-0">
                    {product.images.map((img, idx) => (
                       <button 
                         key={idx} 
                         onClick={() => setActiveImgIndex(idx)}
                         className={`w-16 h-16 rounded-lg bg-white dark:bg-gray-800 border-2 overflow-hidden flex items-center justify-center ${activeImgIndex === idx ? 'border-primary shadow-md scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'} transition-all`}
                       >
                          <img src={img} className="max-w-full max-h-full object-contain p-2" alt="" />
                       </button>
                    ))}
                  </div>
               )}
            </div>
          )}
        </div>

         {/* Right Details Panel */}
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-8 lg:p-12 overflow-y-auto no-scrollbar shadow-xl z-20 flex flex-col">
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">{product.brand}</p>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl font-medium tracking-tight">₹{product.price}</span>
                <div className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1 rounded">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{product.ratingAvg.toFixed(1)}</span>
                  <span className="text-gray-400">({product.numReviews})</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Colorways</h3>
              <div className="flex gap-3">
                {product.colours.map(c => {
                  const hex = mapColorStringToHex(c);
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(hex)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === hex ? 'border-primary scale-110 shadow-md ring-4 ring-primary/20' : 'border-gray-200 dark:border-gray-700'}`}
                      style={{ backgroundColor: hex }}
                      title={c}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-bold uppercase tracking-widest">Select Size</h3>
                 <span className="text-xs text-primary font-medium cursor-pointer relative group">
                    Size Guide
                    <div className="hidden group-hover:block absolute bottom-full mb-2 right-0 w-48 bg-gray-900 text-white p-3 text-xs rounded shadow-lg">
                      Fits true to size. We recommend your normal sneaker size.
                    </div>
                 </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-sm font-bold rounded-sm border transition-all ${selectedSize === s ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900'}`}
                  >
                    US {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              {product.description || `Engineered for maximum energy return and supreme comfort. The ${product.name} blends premium materials with responsive cushioning.`}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-gray-800 lg:pb-0">
             {liveStock < 5 && liveStock > 0 && (
                <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded animate-pulse flex items-center justify-between">
                  <span>⚡ High Demand</span>
                  <span>Only {liveStock} pairs left</span>
                </div>
             )}
             
             <div className="flex gap-4">
               <button 
                 onClick={handleAddToCart}
                 disabled={liveStock === 0}
                 className={`flex-1 flex items-center justify-center gap-3 py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-all ${liveStock === 0 ? 'bg-gray-200 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-primary shadow-xl hover:-translate-y-1'}`}
               >
                 <ShoppingBag size={18} /> {liveStock === 0 ? 'Out of Stock' : 'Add to Bag'}
               </button>
               <button 
                 onClick={() => {
                   setIsFavorited(!isFavorited);
                   toast.success(isFavorited ? "Removed from Favorites" : "Added to Favorites!", { icon: isFavorited ? '💔' : '❤️' });
                 }}
                 className={`p-4 border rounded-sm transition-colors ${isFavorited ? 'text-red-500 border-red-500 bg-red-50' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500'}`}
               >
                 <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 border-t border-gray-100 dark:border-gray-800 pt-16">
         <div className="flex items-center gap-3 mb-10">
            <MessageSquare className="text-primary" />
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white">Customer <span className="font-light italic text-gray-500 dark:text-gray-400">Reviews</span></h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Review List */}
            <div>
               {product.ratings && product.ratings.length === 0 ? (
                 <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                    No reviews yet. Be the first to try these out!
                 </div>
               ) : (
                 <div className="space-y-6">
                   {product.ratings?.map((r) => (
                     <div key={r._id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                       <div className="flex justify-between items-start mb-4">
                         <strong className="text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm">{r.name}</strong>
                         <div className="flex">
                           {Array(5).fill().map((_, i) => (
                              <Star key={i} size={14} className={i < r.rating ? 'fill-primary text-primary' : 'text-gray-300'} />
                           ))}
                         </div>
                       </div>
                       <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                       <p className="text-xs text-gray-400 mt-4 font-medium">{new Date(r.createdAt).toLocaleDateString()}</p>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            {/* Write Review Form */}
            <div>
               <h3 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6 uppercase">Write A Review</h3>
               
               {userInfo ? (
                  <form onSubmit={submitReviewHandler} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-gray-200/40 border border-gray-100 dark:border-gray-800 p-8 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-2">Rating</label>
                      <select 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 dark:border-gray-700 rounded p-4 text-sm focus:outline-primary focus:ring-1 focus:ring-primary"
                      >
                         <option value="5">5 - Excellent</option>
                         <option value="4">4 - Very Good</option>
                         <option value="3">3 - Good</option>
                         <option value="2">2 - Fair</option>
                         <option value="1">1 - Poor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-2">Comment</label>
                      <textarea
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What do you think about this product?"
                        required
                        className="w-full bg-gray-50 border border-gray-200 dark:border-gray-700 rounded p-4 text-sm focus:outline-primary focus:ring-1 focus:ring-primary resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-sm py-4 rounded hover:bg-primary transition shadow-md">
                       Submit Review
                    </button>
                  </form>
               ) : (
                  <div className="bg-primary/5 rounded-xl border border-primary/20 p-8 text-center">
                    <p className="text-gray-600 mb-4">You must be logged in to leave a review.</p>
                    <button onClick={() => navigate('/login')} className="bg-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-3 rounded hover:bg-blue-700 transition">
                       Login to Review
                    </button>
                  </div>
               )}
            </div>
         </div>
      </div>

    </div>
  );
};

export default ProductDetails;
