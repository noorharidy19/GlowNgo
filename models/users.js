const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: { type: String, 
                unique: true, 
                required: true 
    },
    email: { type: String,
        unique: true, 
        required: true 
       },

    password: { type: String,
        required: true 
    },
    phoneNumber: {
        type: Number,
        required: true
    },

    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        buildingNo: { type: String }
    },
    type: {
        type: String,
        default: "customer"
    }

});

// 

const User = mongoose.model('User', userSchema);

module.exports = User;