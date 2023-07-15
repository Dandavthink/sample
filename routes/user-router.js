const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");

router.post('/create-user', async(req,res) => {
    let response = await userController.createUser(req.body);
    res.send(response);
});

router.get('/get-user', async(req,res) => {
    let response = await userController.getUserDetails();
    res.send(response);
})


module.exports = {userRoutes:router}
