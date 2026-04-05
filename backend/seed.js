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
    department: "shoes",
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
    department: "shoes",
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
    department: "shoes",
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
    department: "shoes",
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
    department: "shoes",
    category: "Streetwear",
    stock: 18,
    sizes: [8, 9, 10]
  },
  {
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    price: 8995,
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly shined overlays and classic team colors.",
    images: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop"],
    colors: ["White", "Black"],
    department: "shoes",
    category: "Lifestyle",
    stock: 40,
    sizes: [7, 8, 9, 10, 11]
  },
  {
    name: "Asics Gel-Kayano 29",
    brand: "Asics",
    price: 12500,
    description: "The GEL-KAYANO 29 shoe creates a stable running experience and a highly responsive feel underfoot. Featuring a low-profile external heel counter.",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Blue", "Yellow"],
    department: "shoes",
    category: "Running",
    stock: 55,
    sizes: [8, 9, 10, 11]
  },
  {
    name: "Converse Chuck Taylor All Star",
    brand: "Converse",
    price: 3499,
    description: "The unmistakable silhouette you know and love, featuring classic canvas and the iconic star ankle patch.",
    images: ["https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "White"],
    department: "shoes",
    category: "Casual",
    stock: 120,
    sizes: [6, 7, 8, 9, 10]
  },
  {
    name: "Vans Old Skool Classic",
    brand: "Vans",
    price: 4999,
    description: "First known as the Vans #36, the Old Skool debuted in 1977 with a unique new addition: a random doodle drawn by founder Paul Van Doren.",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "White"],
    department: "shoes",
    category: "Skate",
    stock: 80,
    sizes: [7, 8, 9, 10]
  },
  {
    name: "Reebok Club C 85",
    brand: "Reebok",
    price: 6599,
    description: "Join the club with a new rendition of our classic Club C kick. The soft leather upper doles out superior appeal.",
    images: ["https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    colors: ["White", "Green"],
    department: "shoes",
    category: "Classic",
    stock: 25,
    sizes: [8, 9, 10]
  },
  {
    name: "Salomon XT-6",
    brand: "Salomon",
    price: 15499,
    description: "Launched in 2013, the XT-6 is the preferred footwear of world-class athletes for ultra-distance races under harsh conditions.",
    images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "Silver"],
    department: "shoes",
    category: "Outdoor",
    stock: 15,
    sizes: [9, 10, 11]
  },
  {
    name: "Air Jordan 4 Retro",
    brand: "Nike",
    price: 19999,
    description: "The Air Jordan 4 Retro delivers the heritage style of the original, featuring Zoom Air units and classic mesh accents.",
    images: ["https://images.unsplash.com/photo-1579298232668-3f1406e92ba8?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Grey", "White", "Black"],
    department: "shoes",
    category: "Lifestyle",
    stock: 4, // Very low demand testing
    sizes: [9, 10, 11, 12]
  },
  {
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 15999,
    description: "Say hello to incredible energy return. These running shoes give you a push forward while running or walking.",
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "Neon Green"],
    department: "shoes",
    category: "Running",
    stock: 33,
    sizes: [8, 9, 10]
  },
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 13495,
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.",
    images: ["https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    colors: ["White", "Black"],
    department: "shoes",
    category: "Lifestyle",
    stock: 60,
    sizes: [7, 8, 9, 10, 11]
  },
  {
    name: "Onitsuka Tiger Mexico 66",
    brand: "Onitsuka Tiger",
    price: 7999,
    description: "Taking inspiration from classic training shoes, the MEXICO 66 heritage shoe showcases a retro '60s look.",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Yellow", "Black"],
    department: "shoes",
    category: "Vintage",
    stock: 12,
    sizes: [8, 9, 10]
   },
  {
    name: "Yeezy Slide Pure",
    brand: "Adidas",
    price: 4999,
    description: "The YEEZY SLIDE features injected EVA foam for lightweight durability.",
    images: ["https://images.unsplash.com/photo-1698288863690-67a6d9154a43?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Beige"],
    department: "slippers",
    category: "Slides",
    stock: 50,
    sizes: [8, 9, 10, 11]
  },
  {
    name: "Nike Calm Slide",
    brand: "Nike",
    price: 3499,
    description: "Enjoy a calm, comfortable experience with these seamless water-friendly slides.",
    images: ["https://plus.unsplash.com/premium_photo-1661775317616-d35bfa3a8024?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "White"],
    department: "slippers",
    category: "Slides",
    stock: 200,
    sizes: [9, 10, 11]
  },
  {
    name: "Birkenstock Arizona",
    brand: "Birkenstock",
    price: 8999,
    description: "The often imitated, never duplicated, category-defining, two-strap wonder from Birkenstock.",
    images: ["https://images.unsplash.com/photo-1616117625514-41e975eaae1d?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Brown", "Black"],
    department: "slippers",
    category: "Sandals",
    stock: 75,
    sizes: [7, 8, 9]
  },
  {
    name: "Crocs Classic Clog",
    brand: "Crocs",
    price: 2999,
    description: "The irreverent go-to comfort shoe that you're sure to fall deeper in love with day after day.",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop"],
    colors: ["White", "Green", "Yellow"],
    department: "slippers",
    category: "Clogs",
    stock: 150,
    sizes: [6, 7, 8, 9, 10]
  },
  {
    name: "Gucci Web Slide Slipper",
    brand: "Gucci",
    price: 24999,
    description: "A classic rubber slide sandal characterized by the iconic House Web stripe.",
    images: ["https://images.unsplash.com/photo-1620015694269-8f0a0e5b7fb5?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Black", "Red"],
    department: "slippers",
    category: "Slides",
    stock: 10,
    sizes: [9, 10]
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
    console.log('Successfully seeded database with 15 sneakers and 5 slippers!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
