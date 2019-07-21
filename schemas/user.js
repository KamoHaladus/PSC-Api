const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    locale: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;