const Wishlist = require("../models/Wishlist");
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let wishlist;
        if (req.query.productId) {
            wishlist = await Wishlist.find({ productId: req.query.productId });
        } else if (req.query.userId && req.query.productId) {
            wishlist = await Wishlist.find({ userId: req.query.userId, productId: req.query.productId });
        }
        else {
            wishlist = await Wishlist.find({ userId: req.query.userId });
        }
        if (wishlist.length === 0) {
            return res.status(200).json({ success: false});
        }
        res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
        res.status(400).json({ success: false });
    }
})

router.post('/', async (req, res) => {
    try {
        const wishlist = await Wishlist.create(req.body);
        res.status(201).json({ success: true, data: wishlist });
    } catch (error) {
        res.status(400).json({ success: false });
    }
});


router.delete('/', async (req, res) => {
    try {
        let deletedItem = await Wishlist.findByIdAndDelete({ _id: req.query.id });
        res.status(200).json({ success: true, data: deletedItem });
    }
    catch (error) {
        res.status(400).json({ success: false });
    }
});


module.exports = router;