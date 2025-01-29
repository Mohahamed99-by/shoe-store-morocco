const express = require('express');
const cors = require('cors');
const products = require('./db.json').products;

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get products by category
app.get('/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category === req.params.category);
  res.json(categoryProducts);
});

// Get products by brand
app.get('/products/brand/:brand', (req, res) => {
  const brandProducts = products.filter(p => p.brand === req.params.brand);
  res.json(brandProducts);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server with error handling
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please try a different port or close the application using this port.`);
    process.exit(1);
  } else {
    console.error('An error occurred while starting the server:', err);
    process.exit(1);
  }
});
