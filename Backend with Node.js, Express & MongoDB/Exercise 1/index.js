const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];

// 1. Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 2. Get a single book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

// 3. Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. Update a book's title
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title } = req.body;

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (title) {
    book.title = title;
  }

  res.json(book);
});

// 5. Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// 👇 Your routes go here

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });


app.listen(3000, () => { 
    console.log("Server is running on http://localhost:3000")
})