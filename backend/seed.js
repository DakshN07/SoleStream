import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const mockProducts = [
  {
    name: "Nike Air Zoom Pegasus 36",
    brand: "Nike",
    price: 9999,
    description: "The iconic Nike Air Zoom Pegasus 36 returns with more perforations and engineered mesh in the upper for targeted breathability.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Red", "White", "Black"],
    category: "Running",
    stock: 25,
    sizes: [8, 9, 10, 11, 12]
  },
  {
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 14999,
    description: "Familiar but always fresh, the iconic Air Jordan 1 is remastered for today's sneakerhead culture.",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Blue", "White"],
    category: "Lifestyle",
    stock: 12,
    sizes: [9, 9.5, 10, 10.5]
  },
  {
    name: "New Balance 550",
    brand: "New Balance",
    price: 9199,
    description: "The return of a legend. Originally worn by pros, the new 550 pays tribute to the 1989 original with classic details reminiscent of the era.",
    images: ["https://images.unsplash.com/photo-1664188099307-e435cf6d3bc8?q=80&w=1000&auto=format&fit=crop"],
    colors: ["White", "Green"],
    category: "Streetwear",
    stock: 45,
    sizes: [7, 8, 9, 10, 11]
  },
  {
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 18299,
    description: "The YEEZY BOOST 350 V2 features an upper composed of multi-toned re-engineered Primeknit. The post-dyed monofilament side stripe is woven into the upper.",
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "Grey"],
    category: "Lifestyle",
    stock: 3, // Low stock to trigger the red flag/badge in the UI
    sizes: [10, 11, 12]
  },
  {
    name: "Puma RS-X3 Puzzle",
    brand: "Puma",
    price: 9199,
    description: "X marks extreme. Exaggerated. Remixed. The new RS-X3 Puzzle features amplified detailing on the upper, stronger material mixes, and bold color combinations.",
    images: ["https://images.unsplash.com/photo-1606890658317-7d14490b76fc?q=80&w=1000&auto=format&fit=crop"],
    colors: ["White", "Blue", "Red"],
    category: "Streetwear",
    stock: 18,
    sizes: [8, 9, 10]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solestream';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Wipe existing products to prevent duplicates
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert mock data
    await Product.insertMany(mockProducts);
    console.log('Successfully seeded database with 5 official sneakers!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
