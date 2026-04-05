const cron = require('node-cron');
const Product = require('../models/Product');

// Comprehensive database of offline daily drops
// Each object contains multiple image angles (Side, Top, Bottom, Back, Detail)
const dropDatabase = [
  {
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    price: 9199,
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly shined overlays and classic team colors. Multiple visual angles provided.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop", // Main side
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop", // Detail
      "https://images.unsplash.com/photo-1600185365778-7875a359b924?q=80&w=1000&auto=format&fit=crop"  // Alternate angle
    ],
    colors: ["Black", "White"],
    category: "Streetwear",
    stock: 20,
    sizes: [8, 9, 10, 11]
  },
  {
    name: "New Balance 990v5 Core",
    brand: "New Balance",
    price: 15399,
    description: "A staple of both morning runs and runways, the 990v5 is the benchmark for quality and style.",
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Grey"],
    category: "Lifestyle",
    stock: 10,
    sizes: [7, 8, 9, 10, 11]
  },
  {
    name: "Adidas UltraBoost 22",
    brand: "Adidas",
    price: 15799,
    description: "Experience epic energy return with the new Ultraboost 22.",
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605340009334-2e2e77b639bc?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Core Black", "Cloud White"],
    category: "Running",
    stock: 14,
    sizes: [9, 10, 11, 12]
  },
  {
    name: "Air Jordan 4 Retro",
    brand: "Nike",
    price: 17499,
    description: "The classic Air Jordan 4 returns with an iconic silhouette and multiple high-res angles.",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Red", "Cement", "Black"],
    category: "Streetwear",
    stock: 4, // Low stock trigger
    sizes: [9, 9.5, 10]
  }
];

const startDailyRestock = (io) => {
  // Schedule to run at Midnight every single day: '0 0 * * *'
  // Or for testing, let's say every minute: '* * * * *' (Change to '0 0 * * *' for production)
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Initiating daily SoleStream drop cycle...');
    try {
      // Pick 2 random shoes from our dropDatabase
      const shuffled = [...dropDatabase].sort(() => 0.5 - Math.random());
      const selectedDrops = shuffled.slice(0, 2);

      let droppedCount = 0;

      for (const item of selectedDrops) {
        // Only drop if it doesn't already exist (simulate rolling drops)
        const exists = await Product.findOne({ name: item.name });
        if (!exists) {
          const newDrop = new Product(item);
          await newDrop.save();
          droppedCount++;
          console.log(`[CRON] Successfully Dropped: ${item.name}`);
        }
      }

      if (droppedCount > 0 && io) {
         // Emit real-time notification to all connected clients that a new Drop occurred
         io.emit('new-drop', { message: `${droppedCount} new sneaker styles just dropped in the gallery!`});
      }

    } catch (e) {
      console.error('[CRON Error] Failed to execute daily restock:', e);
    }
  });

  console.log('[CRON] Daily Restock Job Registered. Next run at Midnight.');
};

module.exports = { startDailyRestock };
