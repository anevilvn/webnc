const express = require('express');
const app = express();
const router = express.Router();


router.get('/products', async (req, res)=>{
    const products = await Product.find({});
    res.render('listProducts',{ title: "Danh sách sản phẩm", products: products
    });
  })



  router.get('/product/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      console.log("Product ID:", productId);
      console.log("Product found:", product);
      
      if (!product) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }
      
      res.render('product', { product, title: product.name });
    } catch (error) {
      console.error("Error finding product:", error);
      res.status(500).send("Lỗi server khi tìm sản phẩm");
    }
  });

  

  module.exports = router;
