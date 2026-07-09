const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Allows running npm run seed from backend root.
dotenv.config();

const products = [
  {
    name: 'Midnight Arabica',
    slug: 'midnight-arabica',
    description: 'An enigmatic blend sourced from the misty highlands of Huila, Colombia. Deep, mysterious, and profoundly satisfying with dark sweetness and a smoky finish.',
    price: 32,
    oldPrice: 38,
    category: 'Special Reserve',
    roast: 'Dark',
    origin: 'Colombia',
    tastingNotes: ['Chocolate', 'Caramel', 'Smoky Toffee'],
    image: '/coffee/product-midnight-detail.png',
    countInStock: 34,
    rating: 4.9,
    numReviews: 128,
    featured: true,
  },
  {
    name: 'Vanilla Cold Brew',
    slug: 'vanilla-cold-brew',
    description: '12-hour steeped concentrate with Madagascan vanilla pods, smooth body, and a creamy coffee-shop finish over ice.',
    price: 18.5,
    oldPrice: 22,
    category: 'Cold Brew',
    roast: 'Cold Brew',
    origin: 'Madagascar',
    tastingNotes: ['Vanilla', 'Cream', 'Brown Sugar'],
    image: '/coffee/product-vanilla-coldbrew.png',
    countInStock: 52,
    rating: 4.8,
    numReviews: 76,
    featured: true,
  },
  {
    name: 'Golden Espresso',
    slug: 'golden-espresso',
    description: 'Our signature blend with intense crema and notes of toasted hazelnut, created for clean shots and velvet lattes.',
    price: 42,
    oldPrice: 0,
    category: 'Espresso',
    roast: 'Dark',
    origin: 'Brazil',
    tastingNotes: ['Hazelnut', 'Crema', 'Cacao'],
    image: '/coffee/product-golden-espresso.png',
    countInStock: 28,
    rating: 5,
    numReviews: 91,
    featured: true,
  },
  {
    name: 'Ethiopian Heirloom',
    slug: 'ethiopian-heirloom',
    description: 'Light roast reserve with citrus lift, floral aroma, and a clean tea-like finish for slow pour-over rituals.',
    price: 28,
    oldPrice: 34,
    category: 'Whole Bean',
    roast: 'Light',
    origin: 'Ethiopia',
    tastingNotes: ['Citrus', 'Jasmine', 'Honey'],
    image: '/coffee/product-heirloom.png',
    countInStock: 22,
    rating: 4.7,
    numReviews: 54,
    featured: false,
  },
  {
    name: 'Artisan Precision Grinder',
    slug: 'artisan-precision-grinder',
    description: 'Matte black grinder built for consistent extraction, from espresso fine to French press coarse.',
    price: 185,
    oldPrice: 210,
    category: 'Hardware',
    roast: 'Gear',
    origin: 'CoffeeVerse Studio',
    tastingNotes: ['Precision', 'Matte Black', 'Barista Grade'],
    image: '/coffee/cart-grinder.png',
    countInStock: 11,
    rating: 4.9,
    numReviews: 33,
    featured: false,
  },
  {
    name: 'Midnight Velvet Espresso',
    slug: 'midnight-velvet-espresso',
    description: 'A dramatic dark roast with toasted cacao, heavy crema, and a long caramel finish.',
    price: 24,
    oldPrice: 30,
    category: 'Ground Coffee',
    roast: 'Dark',
    origin: 'House Blend',
    tastingNotes: ['Cacao', 'Crema', 'Molasses'],
    image: '/coffee/cart-velvet-espresso.png',
    countInStock: 44,
    rating: 4.6,
    numReviews: 60,
    featured: false,
  },
  {
    name: 'Ceremonial Matcha Latte',
    slug: 'ceremonial-matcha-latte',
    description: 'Smooth ceremonial-style matcha made for creamy iced lattes, soft sweetness, and a clean green tea finish.',
    price: 21,
    oldPrice: 26,
    category: 'Matcha',
    roast: 'Ceremonial',
    origin: 'Japan',
    tastingNotes: ['Green Tea', 'Cream', 'Soft Vanilla'],
    image: '/coffee/product-heirloom.png',
    countInStock: 38,
    rating: 4.8,
    numReviews: 67,
    featured: true,
  },
  {
    name: 'Strawberry Iced Matcha',
    slug: 'strawberry-iced-matcha',
    description: 'A refreshing iced matcha blend with strawberry sweetness, creamy texture, and a bright café-style finish.',
    price: 19,
    oldPrice: 23,
    category: 'Matcha',
    roast: 'Ceremonial',
    origin: 'House Matcha Bar',
    tastingNotes: ['Strawberry', 'Cream', 'Green Tea'],
    image: '/coffee/product-vanilla-coldbrew.png',
    countInStock: 46,
    rating: 4.7,
    numReviews: 58,
    featured: false,
  },
  {
    name: 'Salted Caramel Iced Latte',
    slug: 'salted-caramel-iced-latte',
    description: 'Chilled espresso latte with salted caramel notes, creamy milk body, and a smooth dessert-like finish.',
    price: 17,
    oldPrice: 20,
    category: 'Iced Coffee',
    roast: 'Medium',
    origin: 'CoffeeVerse Bar',
    tastingNotes: ['Caramel', 'Sea Salt', 'Cream'],
    image: '/coffee/product-vanilla-coldbrew.png',
    countInStock: 60,
    rating: 4.8,
    numReviews: 83,
    featured: true,
  },
  {
    name: 'Brown Sugar Cold Brew',
    slug: 'brown-sugar-cold-brew',
    description: 'Slow-steeped cold brew with brown sugar sweetness, cocoa depth, and a clean low-acid finish.',
    price: 18,
    oldPrice: 22,
    category: 'Cold Brew',
    roast: 'Cold Brew',
    origin: 'Nicaragua',
    tastingNotes: ['Brown Sugar', 'Cocoa', 'Molasses'],
    image: '/coffee/product-vanilla-coldbrew.png',
    countInStock: 50,
    rating: 4.9,
    numReviews: 72,
    featured: false,
  },
  {
    name: 'Mocha Cloud Iced Coffee',
    slug: 'mocha-cloud-iced-coffee',
    description: 'Creamy iced coffee with mocha richness, light foam, and a smooth café-style chocolate finish.',
    price: 16.5,
    oldPrice: 19,
    category: 'Iced Coffee',
    roast: 'Medium',
    origin: 'CoffeeVerse Bar',
    tastingNotes: ['Mocha', 'Foam', 'Chocolate'],
    image: '/coffee/cart-velvet-espresso.png',
    countInStock: 48,
    rating: 4.6,
    numReviews: 45,
    featured: false,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.create({
      name: 'BrewVerse Admin',
      email: 'admin@brewverse.com',
      password: 'Admin@12345',
      role: 'admin',
    });

    await Product.insertMany(products);
    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
