const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },



    apartment: {
        type: String,
        defaul: ""
    },

    city: {
        type: String,
        required: true
    },

    zip: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;