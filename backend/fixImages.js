import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const fixDatabaseImages = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solestream';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products to patch`);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        // Generate a deterministic and safe image URL heavily using Pollinations AI 
        // to completely bypass any Unsplash rate-limiting or CORS blockers.
        const typeStr = product.department === "slippers" ? "slide_slipper" : "sneaker_shoe";
        const cleanName = product.name.replace(/ /g, '_');
        
        // We will assign 2 images so hovering works!
        const img1 = `https://image.pollinations.ai/prompt/premium_high_quality_studio_product_shot_of_one_${typeStr}_${cleanName}_realistic_lighting_white_background?width=800&height=800&seed=${i + 150}&nologo=true`;
        const img2 = `https://image.pollinations.ai/prompt/dynamic_angle_product_shot_of_${typeStr}_${cleanName}_detailed?width=800&height=800&seed=${i + 600}&nologo=true`;

        product.images = [img1, img2];
        await product.save();
    }

    console.log('Successfully patched all products with Pollinations AI generated product shots!');
    process.exit(0);
  } catch (error) {
    console.error('Error patching DB:', error);
    process.exit(1);
  }
};

fixDatabaseImages();
