const express = require('express');
const router = express.Router();
const slotController = require('../controller/slot-controller');

router.get('/get-slot-list', async (req, res) => {
    let response = await slotController.getSlotList();
    res.send(response);
})

module.exports = { slotRouter: router }