const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

const protect = require("../middlewares/protect");
const authorization = require("../middlewares/authorization");

const { editor, admin, cashier } = require("../utils/constants");

router.get("/", protect, authorization([editor]), async (req, res) => {
  const products = await Product.find({}).lean().exec();

  return res.status(200).json({ data: products });
});

module.exports = router;
