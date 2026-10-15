const Books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", publishedYear: 2018, genre: "Self-Help" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", publishedYear: 1997, genre: "Personal Finance" }
];



const getBooks = (req, res) => {
  res.json(Books);
};


const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  
  const book = Books[bookId - 1]; 
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};


const createBook = (req, res) => {
  const { title, author, publishedYear, genre } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }

  const newBook = {
    id: Books.length ? Math.max(...Books.map((book) => book.id)) + 1 : 1,
    title,
    author,
    publishedYear,
    genre
  };

  Books.push(newBook);
  return res.status(201).json(newBook);
};


// UPDATE a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated document
    );
    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    res.send(`Book with id ${id} deleted`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

  
module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };


