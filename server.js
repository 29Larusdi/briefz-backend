const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/produk', require('./routes/produk'));
app.use('/api/transaksi', require('./routes/transaksi'));

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('MongoDB Connected');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));