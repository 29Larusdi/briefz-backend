const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true,
    minlength: [2, 'Nama produk minimal 2 karakter']
  },
  harga: {
    type: Number,
    required: [true, 'Harga produk wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  gambar: {
    type: String,
    default: '',
    trim: true
  },
  stok: {
    type: Number,
    default: 0,
    min: [0, 'Stok tidak boleh negatif']
  }
}, {
  timestamps: true // Menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model('Produk', produkSchema);
