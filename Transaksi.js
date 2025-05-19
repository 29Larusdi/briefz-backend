const mongoose = require('mongoose');
const transaksiSchema = new mongoose.Schema({
  userId: String,
  nama: String,
  email: String,
  metode: String,
  total: Number,
  keranjang: Array,
  tanggal: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaksi', transaksiSchema);