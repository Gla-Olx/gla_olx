const ChattingWith = require("../models/ChattingWith");
const express = require('express');
const router = express.Router();





router.post('/', async (req, res) => {
    let { userToken, currentUser, itemName, itemPrice } = req.body;
    if (!userToken || !currentUser || !itemName || !itemPrice) {
        res.status(400).json({ success: false, message: "Please provide all the fields" });
    }
    if (userToken === currentUser) {
        res.status(400).json({ success: false, message: "You can't chat with yourself" });
    }
    let findSender = await ChattingWith.findOne({ userId: currentUser });
    let findReceiver = await ChattingWith.findOne({ userId: userToken });

    if (!findReceiver) {
        let chattingWith = [];
        chattingWith.push({ userToken: currentUser, itemName, itemPrice });
        let addReceiverUser = await ChattingWith.create({ userId: userToken, chattingWith });
    }

    if (findReceiver) {
        let unique = true;
        let chattingWith = findReceiver.chattingWith;
        for (let i = 0; i < chattingWith.length; i++) {
            if (chattingWith[i].userToken === currentUser && chattingWith[i].itemName === itemName) {
                unique = false;
                break;
            }
        }
        if (unique) {
            chattingWith.push({ userToken: currentUser, itemName, itemPrice });
            let addReceiverUser = await ChattingWith.findOneAndUpdate({ userId: userToken }, { chattingWith });
        }
    }

    if (!findSender) {
        let chattingWith = [];
        chattingWith.push({ userToken, itemName, itemPrice });
        let addUser = await ChattingWith.create({ userId: currentUser, chattingWith });
        res.status(200).json({ success: true, data: addUser });
    }

    let unique = true;
    let chattingWith = findSender.chattingWith;
    for (let i = 0; i < chattingWith.length; i++) {
        if (chattingWith[i].userToken === userToken && chattingWith[i].itemName === itemName) {
            unique = false;
            break;
        }
    }
    if (unique) {
        chattingWith.push({ userToken, itemName, itemPrice });
        let addUser = await ChattingWith.findOneAndUpdate({ userId: currentUser }, { chattingWith });
        return res.status(200).json({ success: true, data: addUser });
    }
    res.status(200).json({ success: true, data: findSender });
})


module.exports = router;
