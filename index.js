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

const connectDB = require('./database');
connectDB();
const { Category, Product } = require('./model');
const { create } = require('domain');
const e = require('express');
const {getCategory, getBreedName} = require('./apiTheCat');
const { title } = require('process');
const {crop} =require('./img/crop')



// Định nghĩa API

app.get('/', (req, res) => {
  res.render('index', { title: "Trang chủ", message: "Chào mừng đến với trang EJS!" });
});

//admin
app.get('/admin/category', async (req, res) => {
  try{
    const categories = await Category.find({});

    res.render('category', { 
      title: "Quản lý danh mục", 
      message: "Chào mừng đến với trang quản lý danh mục!",
      categories: categories,
    });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//random

app.post('/api/rnd-category', async (req, res) =>{
  try{
    const radCategories = await getBreedName();
    res.status(200).json(radCategories);
  }catch (error){
    console.log(error);
    res.status(500).json({ message: "Error retrieving random category", error: error.message });
  }
});


app.post('/api/category', async (req, res) =>{
  try{
    const name = req.body.name;
    const created_at = new Date();
    const updated_at = new Date();

    if (!name){
      return res.status(400).json({message: "Vui lòng nhập tên danh mục"});
    }
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (!existingCategory) {
      const newCategory = new Category({ name, created_at, updated_at });
      await newCategory.save();
      res.status(201).json({ message: "Thêm danh mục thành công" });
    }else{
      res.status(400).json ({message: "Danh mục đã tồn tại"})
    }
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi: ", error: error.message });
  }
});


app.get('/admin', async (req, res) => {
  try{
    const products = await Product.find({});
    const categories = await Category.find({});

    res.render('admin', { title: "Trang quản trị", message: "Chào mừng đến với trang quản trị!",
       products: products,
       categories: categories
      });
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  });


app.post("/api/products", async (req, res)=>{
  try{
    const {name, price, description, image_url, category_id} = req.body;
    const created_at = new Date();
    const updated_at = new Date();
    if (!name || !price || !image_url) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const newProduct = new Product({ name, price,description, image_url, created_at, updated_at, category_id });
    await newProduct.save(); // Lưu vào MongoDB
    res.status(201).json({ message: "Sản phẩm đã được thêm!", product: { name, price, image_url } });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }

}
)

// Service product
app.get('/products', async (req, res)=>{
  const products = await Product.find({});
  res.render('listProducts',{ title: "Danh sách sản phẩm", products: products
  });
})

// Product detail
app.get('/product/:id', async (req, res) =>{
  const productId = req.params.id;
  const product = Product.findById(productId)
  console.log("Product ID:", productId);
  console.log("Product found:", product);
  if (!product) {
    return res.status(404).send("Không tìm thấy sản phẩm");
  }
  res.render('product', {product});


});




app.get('/product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'product.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));

});

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log('Dữ liệu nhận được:', username, email, password, confirmPassword);
}
);


app.post('/register', (req, res) => {
  const data = req.body; 
  console.log('Dữ liệu nhận được:', data);
  res.json({ message: 'Dữ liệu đã nhận', data: req.body });
});


// Handle 404 
app.use(function (req, res, next) {
  res.status(404).send("Page Not Found");
});


// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
