import fs from 'fs';

let content = fs.readFileSync('seed.js', 'utf8');

// Replace category with department + category
content = content.replace(/category:/g, 'department: "shoes",\n    category:');

// Add slippers inside the array just before ];
const slippers = `  },
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
  `;

content = content.replace(/ \}\n\];/g, slippers + '\n];');
content = content.replace(/15 official sneakers!/g, '15 sneakers and 5 slippers!');

fs.writeFileSync('seed.js', content);
console.log('Successfully updated seed.js with slippers!');
