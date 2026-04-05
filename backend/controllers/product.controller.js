const Product = require('../models/Product');

// @desc    Fetch all products with Filter and Sort
// @route   GET /api/v1/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { keyword, brand, minPrice, maxPrice, size, color, sort } = req.query;

    // Build query object
    const query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }
    if (brand) {
      const brands = brand.split(',');
      query.brand = { $in: brands };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (size) {
      const sizes = size.split(',').map(Number);
      query.sizes = { $in: sizes };
    }
    if (color) {
      const colors = color.split(',');
      query.colours = { $in: colors };
    }

    let mongooseQuery = Product.find(query);

    // Sorting
    if (sort) {
      switch (sort) {
        case 'Price Low-High':
          mongooseQuery = mongooseQuery.sort('price');
          break;
        case 'Price High-Low':
          mongooseQuery = mongooseQuery.sort('-price');
          break;
        case 'Newest':
          mongooseQuery = mongooseQuery.sort('-createdAt');
          break;
        case 'Best Rated':
          mongooseQuery = mongooseQuery.sort('-ratingAvg');
          break;
        default:
          break;
      }
    }

    const products = await mongooseQuery;
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name || 'Sample name',
      price: req.body.price || 0,
      brand: req.body.brand || 'Sample brand',
      category: req.body.category || 'Sample category',
      stock: req.body.stock || 0,
      numReviews: 0,
      ratingAvg: 0,
      sizes: req.body.sizes || [9, 10, 11],
      colours: req.body.colours || ['White', 'Black'],
      images: req.body.images || ['/images/sample.jpg'],
      modelUrl: req.body.modelUrl || '/models/shoe-drifter/model.gltf'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, brand, category, stock, sizes, colours, images, modelUrl } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.sizes = sizes || product.sizes;
      product.colours = colours || product.colours;
      product.images = images || product.images;
      product.modelUrl = modelUrl || product.modelUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = product.ratings.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.ratings.push(review);
      product.numReviews = product.ratings.length;
      product.ratingAvg =
        product.ratings.reduce((acc, item) => item.rating + acc, 0) /
        product.ratings.length;

      await product.save();
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
