const ledgerModel = require("../models/ledger.model");

async function getAccountHistory(req, res) {
  try {
    const { accountId } = req.params;

    const history = await ledgerModel
        .find({ account: accountId })
        .populate({
            path: "transaction",
            populate: [
            {
                path: "fromAccount",
                select: "accountNumber",
            },
            {
                path: "toAccount",
                select: "accountNumber",
            },
            ],
        })
        .sort({ createdAt: -1 });

    return res.status(200).json({
      history,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch account history",
    });
  }
}

module.exports = {
  getAccountHistory,
};