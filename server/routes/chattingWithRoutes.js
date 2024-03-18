const ChattingWith = require("../models/ChattingWith");
const express = require('express');
const router = express.Router();





router.get('/', async (req, res) => {
    const id = req.query.id;
    let chattingWith = await ChattingWith.findOne({ userId: id });

     if (!chattingWith) {
        return res.status(200).json({ success: false });
    }
    return res.status(200).json({ success: true, chattingWith });
})

router.post('/', async (req, res) => {
    let { id, receiver, item } = req.body;
    let filter = { userToken: receiver, itemName: item }
    let chattingWith = await ChattingWith.findOne({ userId: id });
    if (chattingWith) {
        let data = chattingWith.chattingWith.filter(function (item) {
            for (var key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return true;
            }
            return false;
        });
        chattingWith.chattingWith = data;
        let getData = await chattingWith.save();
        return res.status(200).json({ success: true, data: getData });
    }
    return res.status(400).json({ success: false });
});


module.exports = router;