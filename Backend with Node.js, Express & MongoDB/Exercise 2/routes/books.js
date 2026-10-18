const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook  } = require('./../controllers/booksController');


router.post('/create', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);





module.exports = router;
