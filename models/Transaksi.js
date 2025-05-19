const mongoose = require('mongoose');

const TransaksiSchema = new mongoose.Schema({
  produkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produk',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jumlah: {
    type: Number,
    required: true
  },
  totalHarga: {
    type: Number,
    required: true
  },
  tanggal: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);
