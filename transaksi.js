const router = require('express').Router();
const Transaksi = require('../models/Transaksi');
const jwt = require('jsonwebtoken');

// Middleware untuk otentikasi token
function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token tidak ditemukan' });
    return null;
  }

  const token = authHeader.split(' ')[1] || authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    res.status(403).json({ error: 'Token tidak valid' });
    return null;
  }
}

// POST /api/transaksi - Buat transaksi baru
router.post('/', async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  const { nama, email, metode, total, keranjang } = req.body;
  if (!nama || !email || !metode || !total || !Array.isArray(keranjang) || keranjang.length === 0) {
    return res.status(400).json({ error: 'Data transaksi tidak lengkap atau tidak valid' });
  }

  try {
    const transaksi = await Transaksi.create({
      nama,
      email,
      metode,
      total,
      keranjang,
      userId: decoded.id,
      tanggal: new Date()
    });
    res.status(201).json(transaksi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan transaksi' });
  }
});

// GET /api/transaksi - Ambil riwayat transaksi user
router.get('/', async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const data = await Transaksi.find({ userId: decoded.id }).sort({ tanggal: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil riwayat transaksi' });
  }
});

module.exports = router;