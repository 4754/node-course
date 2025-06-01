const express = require('express');
const path = require('node:path')
const app = express();
const products = require('./utils/products.json')

// set view engine
app.set("view engine", "ejs");

// set view folder
app.set("views",path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('index',{title: "Products", products: products, product: null})
})

app.get('/products/:productId',(req,res)=>{
    const id = req.params.productId
    const data = products.filter(item=> item.id == id)
    res.render('index',{title: "Products", products: products, product: data[0]})
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})