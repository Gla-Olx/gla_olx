const express = require('express');
const router = express.Router();
const Item = require("../models/Item");
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {
    api: {
        bodyParser: false,
    },
};

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const currentUser = req.query.currentUser;
        const items = await Item.find({ seller: { $ne: currentUser } }).sort({ createdAt: -1 }).limit(limit);
        const count = await Item.countDocuments();
        if (limit >= count) {
            res.status(200).json({ success: true, data: items, loadMore: false });
        } else {
            res.status(200).json({ success: true, data: items });
        }
    } catch (error) {
        res.status(400).json({ success: false });
    }
});

router.post('/', async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        const data = await form.parse(req);
        const { title, desc, price, category, subCategory, seller, sellerPic, sellerName } = JSON.parse(data[0].metaData)

        // Upload all images
        const images = await Promise.all(data[1].media.map(async (file) => {
            const image = await cloudinary.uploader.upload(file.filepath);
            return image.secure_url
        }))
        // Create Item
        const item = await Item.create({
            title,
            desc,
            price,
            category,
            subCategory,
            seller,
            sellerName,
            sellerPic,
            images: images,
        });
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ success: true });

    } catch (error) {
        res.status(400).json({ success: false });
    }
});







module.exports = router;