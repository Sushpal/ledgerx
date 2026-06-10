const express = require("express");
const router = express.Router();

const {
  getAccountHistory,
} = require("../controllers/ledger.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/history/:accountId",
  authMiddleware.authMiddleware,
  getAccountHistory
);

module.exports = router;