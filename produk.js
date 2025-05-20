const router = require('express').Router();
const Produk = require('../models/Produk');
const jwt = require('jsonwebtoken');

// GET Semua Produk
router.get('/', async (req, res) => {
  try {
    const produk = await Produk.find();
    res.json(produk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data produk' });
  }
});

// POST Tambah Produk (hanya admin)
router.post('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token tidak ditemukan' });

    const token = authHeader.split(' ')[1] || authHeader; // handle 'Bearer token' atau langsung token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ error: 'Token tidak valid' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Hanya admin yang boleh menambahkan produk' });
    }

    const { nama, harga, gambar } = req.body;
    if (!nama || !harga || !gambar) {
      return res.status(400).json({ error: 'Semua field (nama, harga, gambar) wajib diisi' });
    }

    const produk = await Produk.create({ nama, harga, gambar });
    res.status(201).json(produk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan produk' });
  }
});

module.exports = router;