const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    metamaskId: { type: String, required: true },
    name: String,
    email: String,
    verified: Boolean,
    balance: String,
});

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
    ledgerId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: String,
    currency: String,
    amount: Number,
    fee: Number,
    balance: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Balance Schema
const BalanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalBalance: Number,
    currencies: [{
        currency: String,
        amount: Number,
        usdValue: Number,
    }],
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Balance = mongoose.model('Balance', BalanceSchema);

module.exports = { User, Transaction, Balance };
