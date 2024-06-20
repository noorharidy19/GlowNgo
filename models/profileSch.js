const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    buildingNo: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    addresses: [addressSchema], // Array of addresses
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
