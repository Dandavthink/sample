const express = require('express');
const router = express.Router();
const slotController = require('../controller/slot-controller');

router.get('/get-slot-list', async (req, res) => {
    let response = await slotController.getSlotList();
    res.send(response);
});

router.post('/create-slot',async(req,res) => {
    let response = await slotController.createSlot(req.body);
    res.send(response);
});

router.put('/update-drive-status', async(req,res) => {
    let response = await slotController.updateDriveStatus(req.body);
    res.send(response);
})

module.exports = { slotRouter: router }