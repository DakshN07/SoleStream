const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Completely Distinct Sneaker Images (Unsplash Fallbacks)
const snk1 = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
const snk2 = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80";
const snk3 = "https://images.unsplash.com/photo-1664188099307-e435cf6d3bc8?w=800&q=80";
const snk4 = "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80";
const snk5 = "https://images.unsplash.com/photo-1606890658317-7d14490b76fc?w=800&q=80";
const snk6 = "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80";
const snk7 = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80";
const snk8 = "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=800&q=80";
const snk9 = "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80";
const snk10 = "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80";
const snk11 = "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80";
const snk12 = "https://images.unsplash.com/photo-1579298232668-3f1406e92ba8?w=800&q=80";
const snk13 = "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80";
const snk14 = "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80";
const snk15 = "https://images.unsplash.com/photo-1620138546344-7b2c38516bef?w=800&q=80";

// Completely Localized Slipper Images (User-Provided)
const slp1 = "/images/slippers/slp1.jpg";
const slp2 = "/images/slippers/slp2.jpg";
const slp3 = "/images/slippers/slp3.jpg";
const slp4 = "/images/slippers/slp4.png";
const slp5 = "/images/slippers/slp5.jpg";
const slp6 = "/images/slippers/slp6.jpg";
const slp7 = "/images/slippers/slp7.png";
const slp8 = "/images/slippers/slp8.png";

const mockProducts = [
  // SNEAKERS (15 items)
  {
    name: "Nike Air Zoom Pegasus 36", brand: "Nike", price: 9999,
    description: "The iconic Nike Air Zoom Pegasus 36 returns...",
    images: [snk1], colors: ["Red", "White", "Black"], department: "shoes", category: "Running", stock: 25, sizes: [8, 9, 10, 11]
  },
  {
    name: "Air Jordan 1 Retro High", brand: "Nike", price: 14999,
    description: "Familiar but always fresh...",
    images: [snk2], colors: ["Blue", "White"], department: "shoes", category: "Lifestyle", stock: 12, sizes: [9, 10]
  },
  {
    name: "New Balance 550", brand: "New Balance", price: 9199,
    description: "The return of a legend.",
    images: [snk3], colors: ["White", "Green"], department: "shoes", category: "Streetwear", stock: 45, sizes: [8, 9, 10]
  },
  {
    name: "Adidas Yeezy Boost 350 V2", brand: "Adidas", price: 18299,
    description: "The YEEZY BOOST 350...",
    images: [snk4], colors: ["Black", "Grey"], department: "shoes", category: "Lifestyle", stock: 3, sizes: [10, 11]
  },
  {
    name: "Puma RS-X3 Puzzle", brand: "Puma", price: 9199,
    description: "X marks extreme.",
    images: [snk5], colors: ["White", "Blue", "Red"], department: "shoes", category: "Streetwear", stock: 18, sizes: [8, 9]
  },
  {
    name: "Nike Dunk Low Retro", brand: "Nike", price: 8995,
    description: "Created for the hardwood...",
    images: [snk6], colors: ["White", "Black"], department: "shoes", category: "Lifestyle", stock: 40, sizes: [7, 8, 9]
  },
  {
    name: "Asics Gel-Kayano 29", brand: "Asics", price: 12500,
    description: "The GEL-KAYANO 29 shoe creates a stable running experience.",
    images: [snk7], colors: ["Blue", "Yellow"], department: "shoes", category: "Running", stock: 55, sizes: [8, 9]
  },
  {
    name: "Converse Chuck Taylor All Star", brand: "Converse", price: 3499,
    description: "The unmistakable silhouette...",
    images: [snk8], colors: ["Black", "White"], department: "shoes", category: "Casual", stock: 120, sizes: [6, 7]
  },
  {
    name: "Vans Old Skool Classic", brand: "Vans", price: 4999,
    description: "First known as the Vans #36...",
    images: [snk9], colors: ["Black", "White"], department: "shoes", category: "Skate", stock: 80, sizes: [7, 8, 9]
  },
  {
    name: "Reebok Club C 85", brand: "Reebok", price: 6599,
    description: "Join the club with a new rendition...",
    images: [snk10], colors: ["White", "Green"], department: "shoes", category: "Classic", stock: 25, sizes: [8, 9]
  },
  {
    name: "Salomon XT-6", brand: "Salomon", price: 15499,
    description: "Preferred footwear for world-class athletes.",
    images: [snk11], colors: ["Grey", "Black"], department: "shoes", category: "Outdoor", stock: 12, sizes: [8, 9, 10]
  },
  {
    name: "Air Jordan 4 Retro", brand: "Nike", price: 19999,
    description: "Heritage style with Zoom Air units.",
    images: [snk12], colors: ["White", "Black"], department: "shoes", category: "Streetwear", stock: 4, sizes: [10, 11]
  },
  {
    name: "Nike Air Max 270", brand: "Nike", price: 13495,
    description: "Nike's first lifestyle Air Max.",
    images: [snk13], colors: ["White", "Black"], department: "shoes", category: "Lifestyle", stock: 60, sizes: [8, 9, 10]
  },
  {
    name: "Onitsuka Tiger Mexico 66", brand: "Onitsuka Tiger", price: 7999,
    description: "Retro '60s look.",
    images: [snk14], colors: ["Yellow", "Black"], department: "shoes", category: "Vintage", stock: 12, sizes: [8, 9]
  },
  {
    name: "Adidas Superstar", brand: "Adidas", price: 8500,
    description: "The classic shell-toe design...",
    images: [snk15], colors: ["White", "Black"], department: "shoes", category: "Classic", stock: 20, sizes: [8, 9]
  },

  // USER UPLOADED SLIPPERS (8 items)
  {
    name: "Gucci Web Slide Slipper", brand: "Gucci", price: 24999,
    description: "A classic rubber slide sandal.",
    images: [slp1], colors: ["Black", "Red"], department: "slippers", category: "Slides", stock: 10, sizes: [9, 10]
  },
  {
    name: "Crocs Classic Clog", brand: "Crocs", price: 2999,
    description: "The irreverent go-to comfort shoe.",
    images: [slp2], colors: ["White", "Green"], department: "slippers", category: "Clogs", stock: 150, sizes: [6, 7]
  },
  {
    name: "Birkenstock Arizona", brand: "Birkenstock", price: 8999,
    description: "The often imitated, never duplicated...",
    images: [slp3], colors: ["Brown", "Black"], department: "slippers", category: "Sandals", stock: 75, sizes: [7, 8, 9]
  },
  {
    name: "Yeezy Slide Pure", brand: "Adidas", price: 4999,
    description: "The YEEZY SLIDE features injected EVA foam for lightweight durability.",
    images: [slp4], colors: ["Beige"], department: "slippers", category: "Slides", stock: 50, sizes: [8, 9, 10]
  },
  {
    name: "Birkenstock Boston", brand: "Birkenstock", price: 12999,
    description: "Closed toe mule slipper.",
    images: [slp5], colors: ["Black"], department: "slippers", category: "House", stock: 45, sizes: [8, 9, 10]
  },
  {
    name: "Suicoke Moto-Cab", brand: "Suicoke", price: 18000,
    description: "High fashion Japanese functional footwear.",
    images: [slp6], colors: ["Olive", "Black"], department: "slippers", category: "Sandals", stock: 25, sizes: [9, 10]
  },
  {
    name: "Puma Leadcat 2.0", brand: "Puma", price: 1999,
    description: "The iconic Puma Leadcat slide offers unrivaled cushioning.",
    images: [slp7], colors: ["Black", "White"], department: "slippers", category: "Slides", stock: 350, sizes: [7, 8, 9]
  },
  {
    name: "Nike Victori One", brand: "Nike", price: 2495,
    description: "Must-have classic shower slides.",
    images: [slp8], colors: ["White", "Black"], department: "slippers", category: "Slides", stock: 110, sizes: [8, 9, 10]
  },
  {
    name: "OOFOS OOriginal Recovery Sandal", brand: "OOFOS", price: 5999,
    description: "Revolutionary OOfoam™ technology absorbs 37% more impact than traditional footwear foam to reduce the stress on your feet and joints. Perfect orthopedic slide for post-workout or long day recovery.",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"], colors: ["Black"], department: "slippers", category: "Orthopedic", stock: 85, sizes: [7, 8, 9, 10]
  },
  {
    name: "Vionic Relax Orthotic Slipper", brand: "Vionic", price: 7499,
    description: "Award-winning orthopedic slippers featuring a podiatrist-designed footbed. The exclusive biomechanical technology promotes natural alignment from the ground up to relieve plantar fasciitis and heel pain.",
    images: ["https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80"], colors: ["Grey"], department: "slippers", category: "Orthopedic", stock: 40, sizes: [6, 7, 8, 9]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
       console.error('MONGO_URI not found in env');
       process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas');

    await Product.deleteMany({});
    await Product.insertMany(mockProducts);
    console.log('Successfully seeded database with 15 Sneakers and 8 locally fetched Slippers!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
