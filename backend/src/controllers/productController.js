const mongoose = require('mongoose');
const Product = require('../models/Product');

const createSlug = (value) => value
  .toString()
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const getProducts = async (req, res, next) => {
  try {
    const { search = '', category = '', featured = '', sort = 'latest' } = req.query;
    const query = {};

    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { origin: { $regex: search, $options: 'i' } },
    ];
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let sortBy = { createdAt: -1 };
    if (sort === 'price-low') sortBy = { price: 1 };
    if (sort === 'price-high') sortBy = { price: -1 };
    if (sort === 'rating') sortBy = { rating: -1 };

    const products = await Product.find(query).sort(sortBy);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const lookup = mongoose.Types.ObjectId.isValid(req.params.id)
      ? { _id: req.params.id }
      : { slug: req.params.id };
    const product = await Product.findOne(lookup);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const slugBase = data.slug || data.name;
    const slug = `${createSlug(slugBase)}-${Date.now().toString().slice(-5)}`;
    const product = await Product.create({ ...data, slug });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    Object.assign(product, req.body);
    if (req.body.name && !req.body.slug) {
      product.slug = `${createSlug(req.body.name)}-${product._id.toString().slice(-5)}`;
    }
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
