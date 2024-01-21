import express from "express"
import bodyParser from "body-parser"
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Data Dummy untuk produk, keranjang belanja, dan pesanan
let products = 
[
    {
        "id": 1,
        "name": "Ultra HD 4K Television",
        "category": "Electronics",
        "price": 799.99,
        "inStock": true,
        "description": "A 55 inch Ultra HD 4K Television with HDR and smart features."
    },
    {
        "id": 2,
        "name": "Bluetooth Wireless Headphones",
        "category": "Electronics",
        "price": 199.99,
        "inStock": true,
        "description": "Noise-cancelling, over-ear headphones with 20 hours battery life."
    },
    {
        "id": 3,
        "name": "Espresso Coffee Machine",
        "category": "Home Appliances",
        "price": 299.99,
        "inStock": false,
        "description": "Automatic espresso machine with built-in grinder."
    },
    {
        "id": 4,
        "name": "Ergonomic Office Chair",
        "category": "Furniture",
        "price": 159.99,
        "inStock": true,
        "description": "Comfortable ergonomic chair suitable for long working hours."
    },
    {
        "id": 5,
        "name": "Smartphone with Dual Camera",
        "category": "Electronics",
        "price": 499.99,
        "inStock": true,
        "description": "Latest model smartphone with 128GB storage and dual camera setup."
    },
    {
        "id": 6,
        "name": "Stainless Steel Cookware Set",
        "category": "Kitchenware",
        "price": 129.99,
        "inStock": true,
        "description": "10-piece stainless steel cookware set including pots and pans."
    },
    {
        "id": 7,
        "name": "Wireless Gaming Mouse",
        "category": "Electronics",
        "price": 59.99,
        "inStock": false,
        "description": "High precision wireless gaming mouse with customizable buttons."
    },
    {
        "id": 8,
        "name": "Yoga Mat",
        "category": "Fitness",
        "price": 39.99,
        "inStock": true,
        "description": "Eco-friendly, non-slip yoga mat with carrying strap."
    },
    {
        "id": 9,
        "name": "LED Desk Lamp",
        "category": "Office Supplies",
        "price": 29.99,
        "inStock": true,
        "description": "Adjustable LED desk lamp with multiple brightness settings."
    },
    {
        "id": 10,
        "name": "Electric Toothbrush",
        "category": "Personal Care",
        "price": 89.99,
        "inStock": true,
        "description": "Rechargeable electric toothbrush with multiple brushing modes."
    }
]

let shoppingCart = [];
let orders = [];

// Endpoint untuk mendapatkan semua produk
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint untuk menampilkan keranjang belanja
app.get('/shopping-cart', (req, res) => {
  res.json(shoppingCart);
});

// Endpoint untuk menambahkan produk ke keranjang belanja
app.post('/shopping-cart/add', (req, res) => {

  const product = req.body
    const productId = product.length + 1
    shoppingCart.push({id: productId, ...product})

    res.status(200).json({
        message : "product successfully adding to cart",
        shoppingCart
    })

});

// Endpoint untuk menghapus produk dari keranjang belanja
app.delete('/shopping-cart/remove/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  shoppingCart = shoppingCart.filter(product => product.id !== productId);
  res.json({ message: 'Product removed from shopping cart', shoppingCart });
});

// Endpoint untuk melakukan checkout dan membuat pesanan baru
app.post('/orders/checkout', (req, res) => {
  if (shoppingCart.length === 0) {
    res.status(400).json({ message: 'Shopping cart is empty' });
  } else {
    const order = { id: orders.length + 1, products: shoppingCart, timestamp: new Date() };
    orders.push(order);
    shoppingCart = [];
    res.json({ message: 'Checkout successful', order });
  }
});

// Endpoint untuk menampilkan semua pesanan
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server is running on port http://locallhost:${port}/`);
});
