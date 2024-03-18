const Item = require("../models/Item");
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const { id } = req.query;
        const items = await Item.find({ seller: id });
        
        if(!items) {
            return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        res.status(400).json({ success: false });
    }
})

module.exports = router;