const express = require('express');
const app = express();
const productSchema = require('./products')
const middlw = require('./middlewares')
app.use(express.json());
app.use(middlw.loggerMiddleWare)
app.use("/products",productSchema);
app.get('/', (req,res)=>{
    res.status(200).send('Hello World!');
})

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})