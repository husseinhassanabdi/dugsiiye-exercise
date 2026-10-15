// require('dotenv').config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// // const PORT = process.env.PORT || 4000; 


const express = require('express');
const routes = require('./routes/books');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/books', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the Books API');
});


mongoose.connect(process.env.MONGO_URI)
     .then(() => console.log('✅ MongoDB connected'))
      .catch((err) => console.log('❌ MongoDB connection error:', err));    


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

