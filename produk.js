const router = require('express').Router();
const Produk = require('../models/Produk');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  const produk = await Produk.find();
  res.json(produk);
});

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'Unauthorized' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

  const { nama, harga, gambar } = req.body;
  const produk = await Produk.create({ nama, harga, gambar });
  res.json(produk);
});

module.exports = router;