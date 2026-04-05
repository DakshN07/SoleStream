import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';

const CartDrawer = () => {
  const { isOpen, toggleCart, cartItems, addToCart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-50 transition-opacity backdrop-blur-sm"
        onClick={toggleCart}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold">Shopping Cart ({cartItems.reduce((a,c) => a + c.qty,0)})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty.</p>
              <button onClick={() => { toggleCart(); navigate('/gallery'); }} className="mt-4 text-primary font-medium hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.product}-${item.size}`} className="flex gap-4 border-b border-gray-50 pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded bg-gray-50" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                    <p className="font-medium mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button 
                        className="px-2 py-1 hover:bg-gray-50 transition"
                        onClick={() => addToCart({ ...item, qty: Math.max(1, item.qty - 1) })}
                        disabled={item.qty <= 1}
                      ><Minus size={14} /></button>
                      <span className="px-3 text-sm font-medium">{item.qty}</span>
                      <button 
                        className="px-2 py-1 hover:bg-gray-50 transition"
                        onClick={() => addToCart({ ...item, qty: item.qty + 1 })}
                      ><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product, item.size)}
                      className="text-gray-400 hover:text-red-500 transition"
                    ><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 border-b border-gray-200 pb-4">Tax (18% GST) and shipping calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-4 font-semibold uppercase tracking-widest hover:bg-primary/90 transition shadow-lg shadow-primary/30 rounded-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
