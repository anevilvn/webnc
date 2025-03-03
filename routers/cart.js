
const express = require('express');
const router = express.Router();


router.post('/add', (req, res) => {
    const {productId, productName, price, image_url} = req.body;
    
    if(!req.session.cart){
        req.session.cart = [];

    }
    let cart = req.session.cart;
    let itemIndex = cart.findIndex (item => item.productId === productId);

    if (itemIndex >-1 ){
        cart[itemIndex].quantity += 1;
    }else{
        cart.push({ productId, productName, price, image_url, quantity: 1});
    }

    req.session.cart = cart;
    res.json({ message:"Đã thêm vào giỏ hàng!", cart});
})

router.get('/', (req, res)=> {
    const cart = req.session.cart || [];
    console.log(cart)
    res.render('cart', { cart });
})


router.post('/remove', (req, res) => {
    const {productId} =req.body;
    if(req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    }
    res.json({message: "Đã xóa sản phẩm", cart: req.session.cart})
})

module.exports = router;
