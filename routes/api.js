const express = require('express');
const router = express.Router();
const { User, Transaction, Balance } = require('../models/schemas');

// MetaMask Integration (This is typically done on the client-side)

// Store User Data from MetaMask
router.post('/userdata', async (req, res) => {
    const userData = req.body;
    try {
        const user = new User(userData);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get User Data
router.get('/userdata', async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Transaction Routes
router.get('/transactions', async (req, res) => {
    const userId = req.query.userId;
    try {
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/transactions', async (req, res) => {
    const transactionData = req.body;
    try {
        const transaction = new Transaction(transactionData);
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Balance Routes
router.get('/balance', async (req, res) => {
    const userId = req.query.userId;
    try {
        const balance = await Balance.findOne({ userId });
        res.json(balance);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/balance', async (req, res) => {
    const balanceData = req.body;
    try {
        let balance = await Balance.findOne({ userId: balanceData.userId });
        if (!balance) {
            balance = new Balance(balanceData);
        } else {
            balance.totalBalance = balanceData.totalBalance;
            balance.currencies = balanceData.currencies;
        }
        await balance.save();
        res.json(balance);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
