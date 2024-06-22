const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, 
                unique: true, 
                required: true 
    },
    password: { type: String, required: true },

    email: { type: String,
             unique: true, 
             required: true 
            },

    phone: { type: String },

    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        buildingNo: { type: String }
    },

    acceptedTerms: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        default: "customer"
    },
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

