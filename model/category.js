const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true
    }

})

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;