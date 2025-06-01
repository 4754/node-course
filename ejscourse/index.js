const express = require('express');
const path = require('node:path')
const app = express();
const products = require('./utils/products.json')
app.use(express.urlencoded({ extended: true }));
const post = [];
// set view engine
app.set("view engine", "ejs");

// set view folder
app.set("views",path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('index',{title: "Products", products: [...products, ...post], product: null})
})

app.get('/products/:productId',(req,res)=>{
    const id = req.params.productId
    console.log("product",id,)
    const data = [...products, ...post].filter(item=> item.id == id);
    console.log("pp",data)
    res.render('index',{title: "Products", products: [...products, ...post], product: data[0]})
})

app.get('/about',(req,res)=>{
    res.render('about')
})

// add products
app.get('/form',(req,res)=>{
    res.render('formForAdd')
})

// cretae product and route to index
app.post('/products',(req,res)=>{
    console.log(req.body)
    let payload = {
            "id": Date.now(),
            "name": req.body.name,
            "description": "Ergonomic wireless mouse with adjustable DPI settings.",
            "price": req.body.price,
            "category": "Electronics",
            "stock": 120
    }
    post.push(payload);
    console.log(payload)
    //  routing to index
    res.status(201).render('index', {
        title: "Products",
        products: [...products, ...post],
        product: null
    });
})

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})