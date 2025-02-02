const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactioncontroller");

//sendMoney, getAllTransactions, getAllTransactionByAccount, getAllTransactionByAccountSearchAndFilter

router.post("/transferMoney", transactionController.sendMoney);
router.post("/getAllTransactionByAccount", transactionController.getAllTransactionByAccount);

router.post("/getAllTransactionByAccountSearchAndFilter", transactionController.getAllTransactionByAccountSearchAndFilter);


router.get("/getAllTransactions", transactionController.getAllTransactions);


router.get("/csvExportBySearchFilter", transactionController.csvExportBySearchFilter);



module.exports = router;
