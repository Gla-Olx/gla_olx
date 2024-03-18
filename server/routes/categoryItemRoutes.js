const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
    const { category } = req.query;
    let items = await Item.find({ category })

    if (!items) {
        return res.status(404).json({ success: false, message: 'No Items in this category' });
    }

    res.status(200).json({ success: true, data:{items, category} });
});







module.exports = router;