const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction-controller');

router.post('slot-book', async(req,res) => {
    let response = await transactionController.bookSeat(req.body);
    res.send(response);
})