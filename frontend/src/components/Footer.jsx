import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tighter mb-4">Sole<span className="text-primary">Stream</span></h3>
            <p className="text-sm text-gray-400">Walk Different. AI-Enhanced Interactive Footwear Marketplace.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest text-gray-300">Shop</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Best Sellers</li>
              <li className="hover:text-white cursor-pointer transition">Limited Edition</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest text-gray-300">Support</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="hover:text-white cursor-pointer transition">FAQs</li>
              <li className="hover:text-white cursor-pointer transition">Shipping & Returns</li>
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-widest text-gray-300">Newsletter</h4>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white border-none py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary w-full shadow-none rounded-l-sm" />
              <button className="bg-primary px-4 py-2 rounded-r-sm hover:opacity-90 transition font-medium">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} SoleStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
