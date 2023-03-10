const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    richDescription: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""

    },
    images: [
        {
            type: String
        }
    ],
    brand: {
        type: String,
        require: true

    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true

    },
    countInStock: {
        type: Number,
        min: 0,
        max: 25
    },

    rating: {
        type: Number,
        min: 0,
        max: 5
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    }



})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;