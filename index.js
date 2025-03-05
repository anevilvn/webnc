const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
var fs = require('fs');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json()); 
//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const session = require('express-session');

const connectDB = require('./database');
connectDB();  
const { Category, Product } = require('./model');
const { create } = require('domain');
const e = require('express');
const {getCategory, getBreedName} = require('./apiTheCat');
const { title } = require('process');
const {crop} =require('./img/crop')

// Session middleware should be defined before requiring routes
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 ngày
}));

// Require routes after middleware is set up
const cartRouter = require('./routers/cart');  // This is the problematic line
const adminRouter = require('./routers/admin');
const adminCategoryRouter = require('./routers/admin-categories');
const productsRouter = require('./routers/products');
const adminProducts = require('./routers/admin-product');

app.use('/products', productsRouter);
app.use('/api/categories', adminCategoryRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/api/products', adminProducts)

app.get('/', (req, res) => {
  res.redirect('/products');
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
