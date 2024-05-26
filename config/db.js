const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sumitbarmecha:sumitbarmecha@cryptodashboard.wt8ciez.mongodb.net/?retryWrites=true&w=majority&appName=cryptoDashboard', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
