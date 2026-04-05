import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [fit, setFit] = useState(3);
  const [comfort, setComfort] = useState(3);
  const [trueToSize, setTrueToSize] = useState('Yes');
  const [comment, setComment] = useState('');
  
  
  const navigate = useNavigate();
  // Usually orderId, brand, and size are passed via query params in the post purchase link
  // e.g. /feedback?orderId=123&brand=Nike&size=9
  const searchParams = new URLSearchParams(useLocation().search);
  const orderId = searchParams.get('orderId') || 'test-order';
  const brand = searchParams.get('brand') || 'Nike';
  const sizePurchased = searchParams.get('size') || '9';

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', {
        orderId, brand, sizePurchased: Number(sizePurchased),
        fitAccuracy: fit, comfortLevel: comfort, trueToSize, comment
      });
      setSubmitted(true);
      toast.success("Feedback submitted!");
    } catch (err) {
      toast.error("Error submitting feedback");
    }
  };

  if (submitted) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-surface px-4 text-center">
            <div className="bg-white p-10 rounded-xl shadow-xl max-w-sm w-full">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={32} fill="currentColor" />
               </div>
               <h2 className="text-2xl font-black mb-2">Thank You!</h2>
               <p className="text-gray-500 text-sm mb-6 leading-relaxed">Your feedback helps train our AI sizing engine and provides a better fit for the community.</p>
               <button onClick={() => navigate('/')} className="bg-gray-900 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded hover:bg-primary transition w-full shadow-lg">
                  Return Home
               </button>
            </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-sulfur flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white lg:shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
         
         {/* Left Side Info */}
         <div className="md:w-1/3 bg-gray-900 text-white p-8 md:p-12 flex flex-col justify-center border-r border-gray-100">
            <h2 className="text-3xl font-black tracking-tighter leading-none mb-6">How was the fit?</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
               Your feedback for the <br/><span className="text-white font-bold uppercase tracking-widest">{brand} (Size {sizePurchased})</span>
               <br/>helps us build a smarter AI pipeline to give everyone the perfect fit on the first try.
            </p>
         </div>

         {/* Right Side Form */}
         <form onSubmit={handleSubmit} className="md:w-2/3 p-8 md:p-12 bg-white space-y-8">
            
            {/* Range slider for Fit */}
            <div>
               <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Fit Accuracy</span>
                  <span className="text-primary">{fit} / 5</span>
               </div>
               <input type="range" min="1" max="5" value={fit} onChange={e => setFit(Number(e.target.value))} className="w-full accent-primary bg-gray-200 h-2 rounded-lg appearance-none cursor-pointer" />
               <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold"><span>Too Tight</span><span>Perfect</span><span>Too Loose</span></div>
            </div>

            {/* Range slider for Comfort */}
            <div>
               <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Comfort Level</span>
                  <span className="text-primary">{comfort} / 5</span>
               </div>
               <input type="range" min="1" max="5" value={comfort} onChange={e => setComfort(Number(e.target.value))} className="w-full accent-primary bg-gray-200 h-2 rounded-lg appearance-none cursor-pointer" />
               <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold"><span>Uncomfortable</span><span>Average</span><span>Like Walking on Clouds</span></div>
            </div>

            {/* True to Size */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">True to Size?</label>
               <div className="flex gap-4">
                  {['Yes', 'Slightly off', 'No'].map(opt => (
                     <button type="button" key={opt} onClick={() => setTrueToSize(opt)} className={`flex-1 py-3 text-sm font-bold border rounded transition-colors ${trueToSize === opt ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-900'}`}>
                        {opt}
                     </button>
                  ))}
               </div>
            </div>

            {/* Textarea */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Tell Us More</label>
               <textarea value={comment} onChange={e => setComment(e.target.value)} rows="3" className="w-full bg-gray-50 border border-gray-200 rounded p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none" placeholder="Is the toe box narrow? Any rubbing on the heel?" />
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-sm py-4 rounded hover:-translate-y-1 transition shadow-xl flex items-center justify-center gap-2">
               Submit Feedback <ArrowRight size={16} />
            </button>
         </form>

      </div>
    </div>
  );
};

export default Feedback;
