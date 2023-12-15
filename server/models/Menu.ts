const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    image_url: { 
        type: String, 
        required: true
    },
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
}, { timestamps: true });

module.exports = mongoose.model("Menu", MenuSchema);