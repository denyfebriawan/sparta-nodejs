const express  = require('express');

const Cart = require("../schemas/cart");
const Goods = require('../schemas/goods');
const router = express.Router();

router.get('/goods', (req, res) => {
    res.send('Hello World!');
    console.log(req.app);
    console.log(req.ip);
    res.status(201);
  });


router.post("/goods", async (req,res) => {
  const {goodsId, name, thumbnailUrl, category, price} = req.body;
  const goods = await Goods.find({goodsId});
  if(goods.length > 0){
    return res.status(400).json({success: false, errorMessage:"The data already exist."})
  }
  const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});
  return res.json({goods: createdGoods});
})

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.json({ success: false, errorMessage: "This item already exists in your shopping cart." });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });


  res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }

  res.json({ success: true });
})

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const {goodsId} = req.params
  const carts = await Cart.find({goodsId: +goodsId})
  if (carts.length) {
    await Cart.deleteOne({goodsId: +goodsId})
  }

  res.json({result: "success delete"})
})

router.get("/goods/carts", async (req, res) => {
  const carts = await Cart.find();
  const goodsIds = carts.map((cart) => cart.goodsId);

  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
		return {
			quantity: cart.quantity,
			goods: goods.find((item) => item.goodsId === cart.goodsId)
		};
  });

  res.json({
    carts: results,
  });
});

module.exports = router;