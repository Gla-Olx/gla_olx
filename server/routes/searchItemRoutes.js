const Item = require("../models/Item");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    try {
        const items = await Item.find({ title: { $regex: search, $options: 'i' } }).limit(limit);
        const count = await Item.countDocuments({ title: { $regex: search, $options: 'i' } });
        if (limit >= count) {
            res.status(200).json({ success: true, data: items, loadMore: false });
        } else {
            res.status(200).json({ success: true, data: items });
        }

    } catch (error) {
        res.status(400).json({ success: false });
    }
})

module.exports = router;