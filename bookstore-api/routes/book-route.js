const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getSingleBookByid,
    addNewBook,
    updateBook,
    deleteBook
} = require('../controller/book-controller')

router.get('/get',getAllBooks);
router.get('/get/:bookId',getSingleBookByid);
router.post('/add',addNewBook);
router.put('/update/:bookId',updateBook);
router.delete('/delete/:bookId',deleteBook);

module.exports = router;