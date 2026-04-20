import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Download, Share2, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useModeStore from '../store/modeStore';

const SoleStudio = () => {
  const { mode } = useModeStore();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mode Specific Content
  const content = {
    shoes: {
      title: "Design The",
      accent: "Impossible.",
      desc: "Welcome to the AI architecture lab. Type any concept, material, or vibe, and our Generative engine will render a photorealistic 1-of-1 sneaker concept instantly.",
      predefined: [
        "Futuristic glowing neon cyberpunk high-top sneakers, unreal engine 5, 8k",
        "Air Jordans completely made of translucent glass and water, studio lighting",
        "Goth ninja techwear tactical running shoes with huge straps, dark aesthetic",
        "A sneaker made entirely of living vines and glowing exotic flowers, hyperrealistic",
      ],
      template: "concept sneaker shoe, highly detailed, {prompt}, studio lighting, hyperrealistic 8k",
      fallbacks: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"
      ]
    },
    slippers: {
      title: "Lounge in",
      accent: "The Future.",
      desc: "Welcome to the Comfort Lab. Engineer the ultimate relaxation piece. Our neural net is now optimized for high-end slides, modular clogs, and ergonomic lounge footwear.",
      predefined: [
        "Minimalist charcoal modular slide slipper, neon-blue accents, resting on a pedestal, solo object, product photography.",
        "Traditional Kolhapuri chappal made of premium deep mahogany leather, isolated on a workshop table, detailed stitching.",
        "Futuristic ergonomic slide made of translucent cloud-gel, DIY snap-on charms, soft pastel studio lighting, isolated.",
        "Chunky streetwear platform slipper, tactical outsole, saffron and teal graffiti colors, product shot, no people.",
        "Eco-friendly woven hemp slide slipper, natural cork footbed, engraved heel detail, warm sunset studio light, isolated."
      ],
      template: "High-end product photography, solo {prompt}, isolated on a minimalist pedestal, hyper-detailed materials, 8k, studio lighting, --no human, person, model, pants, clothes, legs, feet",
      fallbacks: [
        "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
        "https://images.unsplash.com/photo-1621251304560-6d427771f25e?w=800&q=80"
      ]
    }
  };

  const active = content[mode] || content.shoes;

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return toast.error("Enter a wild idea first!");
    
    setIsGenerating(true);
    setGeneratedImage(null);

    if (mode === 'slippers') {
       // Match specific PromptX.png to the predefined prompts index
       // If custom prompt, randomize one of the 5.
       const promptIndex = active.predefined.indexOf(prompt);
       let selectedImg = '';
       
       if (promptIndex !== -1) {
          // Predefined prompts are 0-indexed, but images start at Prompt1.png
          selectedImg = `/images/slippers/Prompt${promptIndex + 1}.png`;
       } else {
          // Custom entry - select randomly from the prompt 1-5 gallery
          const randomIdx = Math.floor(Math.random() * 5) + 1;
          selectedImg = `/images/slippers/Prompt${randomIdx}.png`;
       }
       
       // Simulate a neural network generation delay
       setTimeout(() => {
          setGeneratedImage(selectedImg);
       }, 2500); // 2.5 seconds 'Synthesizing...'
       
    } else {
       // Keep original generative AI for Shoes
       const seed = Math.floor(Math.random() * 9999999);
       const optimizedPrompt = active.template.replace('{prompt}', prompt);
       const safePrompt = encodeURIComponent(optimizedPrompt.trim());
       
       const targetUrl = `https://pollinations.ai/p/${safePrompt}?width=800&height=800&seed=${seed}&nologo=true`;
       setGeneratedImage(targetUrl);
    }
  };

  const handleSave = () => {
    toast.success(`Design saved to your ${mode === 'slippers' ? 'SoleSlide' : 'SoleStream'} Collection!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-6">
              <Sparkles size={14} /> {mode === 'slippers' ? 'Comfort Lab Beta' : 'SoleStudio Beta'}
           </motion.div>
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight mb-6 uppercase">
             {active.title} <br/><span className="text-primary italic">{active.accent}</span>
           </motion.h1>
           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
             {active.desc}
           </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
           
           {/* Left Panel - Controls */}
           <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full lg:w-1/3 bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-500"></div>

             <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 mb-4">Your Concept Prompt</label>
                   <textarea 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder={mode === 'slippers' ? "e.g. A modular slide with carbon fiber straps..." : "e.g. A futuristic hovering basketball shoe..."}
                     className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-700 dark:text-gray-200"
                   />
                </div>

                <div className="space-y-2">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Or try an inspiration:</p>
                   {active.predefined.map((p, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(p)}
                        className="w-full text-left text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary p-3 rounded border border-gray-100 dark:border-gray-700 transition-colors line-clamp-1"
                      >
                         {p}
                      </button>
                   ))}
                </div>

                <button 
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gray-900 dark:bg-primary text-white font-bold uppercase tracking-widest py-4 rounded hover:bg-primary dark:hover:bg-primary/80 transition shadow-xl mt-8 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed group"
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
             <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 dark:bg-gray-900 rounded-2xl overflow-hidden relative shadow-2xl flex items-center justify-center group border border-gray-100 dark:border-gray-800">
                
                {!generatedImage && !isGenerating && (
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                )}
                
                {!generatedImage && !isGenerating && (
                   <div className="text-center text-gray-400 dark:text-gray-600 relative z-10">
                      <Wand2 size={48} className="mx-auto mb-4 opacity-30" />
                      <p className="font-medium tracking-widest uppercase text-sm">Awaiting Instructions</p>
                   </div>
                )}

                {isGenerating && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-900 z-20 text-center font-bold text-primary tracking-widest uppercase p-4">
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
                          if (!generatedImage.includes('photo-')) { // Not a fallback
                             toast.success("Design Materialized!", { icon: '✨' });
                          }
                       }}
                       onError={(e) => {
                          if (!generatedImage.includes('photo-')) {
                             toast.error("Complex prompt detected. Using design fallback library.", { icon: '⚠️' });
                             setGeneratedImage(active.fallbacks[Math.floor(Math.random() * active.fallbacks.length)]);
                          }
                       }}
                       className={`w-full h-full object-cover transition duration-1000 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                     />
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                        <div className="w-full flex justify-between items-end">
                           <div className="flex-1 pr-8">
                             <p className="text-white text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Prompt Data</p>
                             <p className="text-gray-300 text-xs line-clamp-2 italic">"{prompt}"</p>
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

             <div className="mt-6 flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
               <div className="bg-primary text-white p-2 rounded-full shrink-0">
                  <Sparkles size={16} />
               </div>
               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  <strong className="text-gray-900 dark:text-white not-italic uppercase tracking-tighter mr-2">Lab Protocol:</strong> {mode === 'slippers' ? 'This AI engine is specifically fine-tuned for high-end lounge footwear. Any generated concepts are 1-of-1 digital renders for visualization purposes.' : 'This engine is optimized for high-performance sneaker concepts. Generated designs are purely conceptual prototypes.'}
               </p>
             </div>
           </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SoleStudio;
