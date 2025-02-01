const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.get("/createuser", usercontroller.createUser);

router.get("/getUsers", usercontroller.getUsers);



module.exports = router;