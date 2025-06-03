// env setup
require('dotenv').config();
const express = require('express');
const app = express();
const connectToDb = require('./database/db');
const bookRoutes = require('./routes/book-route')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/books',bookRoutes);

connectToDb()
    .then(() => {
        console.log('Connected to DB...');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server listning on port ${process.env.PORT || 3000}`)
        })
    })
    .catch((err) => {
        console.error(err);
    })

