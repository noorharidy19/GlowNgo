const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    buildingNo: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: [addressSchema], // Array of addresses
    phoneNumber: {
        type: String,
        required: true
    },
    acceptedTerms: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        default: "customer"
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

