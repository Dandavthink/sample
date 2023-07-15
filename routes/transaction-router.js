const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction-controller');

router.put('/slot-book', async(req,res) => {
    let response = await transactionController.bookSeat(req.body);
    res.send(response);
});

router.get('/user-details/:id', async(req,res) => {
    let response = await transactionController.getUserDetails(req.params.id);
    res.send(response);
})
module.exports = {transactionRouter : router}
