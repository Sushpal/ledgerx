const accountModel = require("../models/account.model")
const generateAccountNumber = require("../utils/generateAccountNumber");

async function createAccountController(req, res) {

    const user = req.user

    let accountNumber;
    let isUnique = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    while (!isUnique && attempts < MAX_ATTEMPTS) {
        accountNumber = generateAccountNumber()
        const exists = await accountModel.findOne({ accountNumber })
        if (!exists) isUnique = true
        attempts++
    }

    if (!isUnique) {
        return res.status(500).json({
            message: "Account number generation failed, please retry"
        })
    }

    const account = await accountModel.create({
        user: user._id,
        accountNumber: accountNumber
    })

    res.status(201).json({
        account
    })
}

async function getUserAccountsController(req, res) {

    const accounts = await accountModel.find({
        user: req.user._id
    });

    res.status(200).json({
        accounts
    });
}

async function getAccountBalanceController(req, res) {

    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not Found"
        })
    }

    const balance = await account.getBalance()

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}

module.exports = {
    createAccountController,
    getUserAccountsController,
    getAccountBalanceController
}