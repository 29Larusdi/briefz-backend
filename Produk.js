const mongoose = require('mongoose');
const produkSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  gambar: String
});
module.exports = mongoose.model('Produk', produkSchema);