const express = require('express');
const router = express.Router();
const { Product } = require('../../../model');

// Get all products for admin
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching admin products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
