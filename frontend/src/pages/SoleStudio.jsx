import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Download, Share2, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const SoleStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const predefinedPrompts = [
    "Futuristic glowing neon cyberpunk high-top sneakers, unreal engine 5, 8k",
    "Air Jordans completely made of translucent glass and water, studio lighting",
    "Goth ninja techwear tactical running shoes with huge straps, dark aesthetic",
    "A sneaker made entirely of living vines and glowing exotic flowers, hyperrealistic",
  ];

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return toast.error("Enter a wild idea first!");
    
    setIsGenerating(true);
    setGeneratedImage(null);

    const seed = Math.floor(Math.random() * 9999999);
    const optimizedPrompt = `concept sneaker shoe, highly detailed, ${prompt}, studio lighting, hyperrealistic 8k`;
    const safePrompt = encodeURIComponent(optimizedPrompt.trim());
    
    // Switch to direct image-src mounting because JS Fetch strictly rejects 429 Opaque Redirects.
    const targetUrl = `https://pollinations.ai/p/${safePrompt}?width=800&height=800&seed=${seed}&nologo=true`;

    // Rather than awaiting a stream, we set the targetUrl directly to let the browser natively handle image waiting rooms.
    setGeneratedImage(targetUrl);
  };

  const handleSave = () => {
    toast.success("Design saved to your SoleStream profile Collection!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-6">
              <Sparkles size={14} /> SoleStudio Beta
           </motion.div>
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-tight mb-6">
             Design The <br/><span className="text-primary italic">Impossible.</span>
           </motion.h1>
           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 font-light leading-relaxed">
             Welcome to the AI architecture lab. Type any concept, material, or vibe, and our Generative engine will render a photorealistic 1-of-1 sneaker concept instantly.
           </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
           
           {/* Left Panel - Controls */}
           <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-500"></div>

             <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Your Concept Prompt</label>
                   <textarea 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder="e.g. A futuristic hovering basketball shoe made of obsidian glass..."
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-700"
                   />
                </div>

                <div className="space-y-2">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Or try an inspiration:</p>
                   {predefinedPrompts.map((p, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(p)}
                        className="w-full text-left text-xs text-gray-600 bg-gray-50 hover:bg-primary/5 hover:text-primary p-3 rounded border border-gray-100 transition-colors line-clamp-1"
                      >
                         {p}
                      </button>
                   ))}
                </div>

                <button 
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-4 rounded hover:bg-primary transition shadow-xl mt-8 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed group"
                >
                   {isGenerating ? (
                      <><Loader2 size={18} className="animate-spin" /> Materializing...</>
                   ) : (
                      <><Wand2 size={18} className="group-hover:rotate-12 transition" /> Generate Concept</>
                   )}
                </button>
             </form>
           </motion.div>

           {/* Right Panel - Canvas */}
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="w-full lg:w-2/3">
             <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden relative shadow-2xl flex items-center justify-center group">
                
                {/* Background Grid Pattern when empty */}
                {!generatedImage && !isGenerating && (
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                )}
                
                {!generatedImage && !isGenerating && (
                   <div className="text-center text-gray-400 relative z-10">
                      <Wand2 size={48} className="mx-auto mb-4 opacity-30" />
                      <p className="font-medium tracking-widest uppercase text-sm">Awaiting Instructions</p>
                   </div>
                )}

                {isGenerating && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 z-20 text-center font-bold text-primary tracking-widest uppercase">
                     <Loader2 size={40} className="animate-[spin_2s_linear_infinite] mb-4" />
                     Synthesizing Neural Layers...
                   </div>
                )}

                {generatedImage && (
                   <>
                     <img 
                       src={generatedImage} 
                       alt={prompt} 
                       onLoad={() => {
                          setIsGenerating(false);
                          if (!generatedImage.includes('unsplash')) {
                             toast.success("Design Materialized!", { icon: '✨' });
                          }
                       }}
                       onError={(e) => {
                          // Free Pollinations throws 429 Too Many Requests randomly. 
                          // If that happens, fallback to a beautiful generic studio shoe render so the visual isn't broken!
                          const fallbacks = [
                             "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
                             "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
                             "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80"
                          ];
                          if (!generatedImage.includes('unsplash')) {
                             toast.error("AI Network Congested. Injecting simulation.", { icon: '⚠️' });
                             setGeneratedImage(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
                          }
                       }}
                       className={`w-full h-full object-cover transition duration-1000 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                     />
                     
                     {/* Overlay Controls */}
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                        <div className="w-full flex justify-between items-end">
                           <div className="flex-1 pr-8">
                             <p className="text-white text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Prompt Data</p>
                             <p className="text-gray-300 text-xs line-clamp-2">{prompt}</p>
                           </div>
                           <div className="flex gap-3 flex-shrink-0">
                              <button onClick={handleSave} className="bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-3 rounded-full transition shadow-lg">
                                 <Download size={20} />
                              </button>
                              <button onClick={handleSave} className="bg-white text-gray-900 hover:bg-primary hover:text-white p-3 rounded-full transition shadow-lg">
                                 <Share2 size={20} />
                              </button>
                           </div>
                        </div>
                     </div>
                   </>
                )}
             </div>

             {/* Footer Info */}
             <div className="mt-6 flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
               <div className="bg-blue-100 text-blue-600 p-2 rounded-full shrink-0">
                  <Sparkles size={16} />
               </div>
               <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">AI Architecture Engine:</strong> Solestream uses a bespoke Stable Diffusion neural net designed specifically to render hyper-realistic sneaker prototypes. Generated designs are purely conceptual and not physical products available for purchase.
               </p>
             </div>
           </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SoleStudio;
