const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountcontroller");

// createAccount, getAccountById, updateAccount, deleteAccount
// getAccounts

router.post("/createAccount/", accountController.createAccount);
router.post("/getAccountById", accountController.getAccountById);
router.post("/updateAccount/", accountController.updateAccount);
router.post("/deleteAccountById/", accountController.deleteAccountById);

router.get("/getAccounts/", accountController.getAccounts);


module.exports = router;
