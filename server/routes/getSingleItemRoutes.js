const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
    const { tempToken } = req.query;
    let items = await Item.findOne({ _id: tempToken })
    if (!items) {
        return res.status(404).json({ success: false, message: 'Item not found' });
    }

    let similarItems = await Item.find({ category: items.category })
    similarItems = similarItems.filter((item) => {
        return item._id.toString() !== items._id.toString()
    });

    res.status(200).json({ success: true, data: { item:items, similarItems } });
});















module.exports = router;