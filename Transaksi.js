const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  metode: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  keranjang: [
    {
      produkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produk',
        required: true
      },
      nama: String,
      harga: Number,
      jumlah: Number
    }
  ],
  tanggal: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaksi', transaksiSchema);