import React, { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// We'll import useForm manually in the component since the wrapper import from react-hook-form is standard
import { useForm as rhfUseForm } from "react-hook-form";

const shippingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  pinCode: z.string().min(4, 'Valid PIN is required'),
  phone: z.string().min(10, 'Valid Phone is required'),
});

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [aiRec, setAiRec] = useState(null);
  
  const { cartItems, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, getValues } = rhfUseForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: { name: userInfo?.name || '', address: '', city: '', pinCode: '', phone: '' }
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax + 15; // ₹15 flat shipping

  useEffect(() => {
    if (!userInfo) {
       navigate('/login?redirect=checkout');
    }

    // AI Check for brand if buying one
    if (cartItems.length > 0) {
       const mockBrandToCheck = 'Nike'; // Normally derived from cart[0]
       const fetchAi = async () => {
         try {
           const { data } = await api.get(`/recommend-size?brand=${mockBrandToCheck}`);
           if (data.recommendedSize) {
             setAiRec(data);
           }
         } catch(e) {}
       };
       fetchAi();
    }
  }, [userInfo, navigate, cartItems]);

  const processOrder = async () => {
    try {
      const vals = getValues();
      const orderData = {
        orderItems: cartItems.map(x => ({ ...x, product: x.product })),
        shippingAddress: vals,
        paymentMethod: 'CreditCard_Mock',
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: 15,
        totalPrice: total
      };

      await api.post('/orders', orderData);
      clearCart();
      setStep(3); // Confirmation
      toast.success("Order Placed Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const submitShipping = (data) => {
    setStep(2);
  };

  if(cartItems.length === 0 && step !== 3) {
      return (
          <div className="min-h-screen pt-32 pb-24 text-center px-4">
              <h2 className="text-3xl font-black tracking-tighter mb-4">Your bag is empty.</h2>
              <button onClick={() => navigate('/gallery')} className="text-primary hover:underline font-bold uppercase tracking-widest text-sm">Return to Shop</button>
          </div>
      )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <div className="flex flex-col md:flex-row gap-16">
            
            {/* Left side checkout flow */}
            <div className="flex-1">
                {/* Progress Indicators */}
                <div className="flex items-center space-x-4 mb-12">
                   {[1,2,3].map(s => (
                       <div key={s} className="flex items-center">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                               {s < step ? <CheckCircle2 size={16} /> : s}
                           </div>
                           {s !== 3 && <div className={`w-12 h-0.5 mx-4 ${step > s ? 'bg-primary' : 'bg-gray-100'}`} />}
                       </div>
                   ))}
                </div>

                {step === 1 && (
                    <motion.form 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit(submitShipping)} 
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold tracking-tighter mb-6">Shipping Details</h2>
                        
                        {aiRec && aiRec.confidence !== 'none' && (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-4 mb-6">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded inline-block">AI SUGGESTS ✦</span>
                                <p className="text-sm font-medium text-gray-800 leading-tight">
                                   Based on your past orders, we recommend <strong>Size {aiRec.recommendedSize}</strong> for Nike shoes. You're currently buying size {cartItems[0]?.size}.
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                                <input {...register('name')} className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`} />
                                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                                <input {...register('phone')} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Address</label>
                                <input {...register('address')} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                                {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address.message}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                                <input {...register('city')} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Pin Code</label>
                                <input {...register('pinCode')} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-primary transition mt-8 shadow-xl flex items-center justify-center gap-2">
                            Continue to Payment <ChevronRight size={16} />
                        </button>
                    </motion.form>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                       <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold tracking-tighter">Payment Simulation</h2>
                           <span className="flex items-center gap-1 text-xs font-bold tracking-widest text-green-600 uppercase bg-green-50 px-3 py-1 rounded"><Lock size={12} /> Secure</span>
                       </div>

                       {/* Interactive Mock Card */}
                       <div className="w-full max-w-sm aspect-[1.58] bg-gradient-to-tr from-gray-900 to-gray-700 rounded-xl p-6 text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl transform group-hover:scale-110 transition duration-700"></div>
                           <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-8">Credit Card</p>
                           <p className="text-2xl tracking-[0.1em] font-mono mb-6">5432 •••• •••• 9876</p>
                           <div className="flex justify-between">
                               <div>
                                   <p className="text-[10px] uppercase tracking-widest opacity-60">Card Holder</p>
                                   <p className="font-medium tracking-wide">{(getValues().name || 'YOUR NAME').toUpperCase()}</p>
                               </div>
                               <div>
                                   <p className="text-[10px] uppercase tracking-widest opacity-60 text-right">Expires</p>
                                   <p className="font-medium tracking-wide text-right">12/28</p>
                               </div>
                           </div>
                       </div>

                       <div className="pt-8">
                           <button onClick={processOrder} className="w-full bg-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-sm hover:-translate-y-1 transition shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2">
                               <CreditCard size={18} /> Pay ₹{total.toFixed(2)}
                           </button>
                           <button onClick={() => setStep(1)} className="w-full text-gray-500 font-medium uppercase tracking-widest text-xs py-4 hover:text-gray-900 transition mt-4">
                               Back to Shipping
                           </button>
                       </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
                        <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900">Order Confirmed!</h2>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">Thank you for walking different. Your order has been placed successfully and is being prepped for shipment.</p>
                        
                        <div className="bg-gray-50 rounded-lg p-6 max-w-sm mx-auto mt-8 inline-block text-left w-full border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Order Number</p>
                            <p className="font-mono text-lg tracking-wider font-bold mb-4">#SLS-{Math.floor(Math.random() * 900000) + 100000}</p>
                            <Link to="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-xs block text-center mt-6">Continue Shopping</Link>
                        </div>
                    </motion.div>
                )}

            </div>

             {/* Right side Order Summary */}
            {step !== 3 && (
                <div className="w-full md:w-96 bg-gray-50 p-8 rounded-lg self-start sticky top-28">
                    <h3 className="font-bold uppercase tracking-widest text-sm mb-6 border-b border-gray-200 pb-4">Order Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                        {cartItems.map(item => (
                            <div key={`${item.product}-${item.size}`} className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded bg-white object-cover" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} • Qty: {item.qty}</p>
                                    <p className="font-bold text-sm mt-1">₹{(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 text-sm border-t border-gray-200 pt-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>₹15.00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>GST (18%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200 mt-4">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default Checkout;
