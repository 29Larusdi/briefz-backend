const router = require('express').Router();
const Transaksi = require('../models/Transaksi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const transaksi = await Transaksi.create({ ...req.body, userId: decoded.id });
  res.json(transaksi);
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const data = await Transaksi.find({ userId: decoded.id });
  res.json(data);
});

module.exports = router;