const mongoose = require("mongoose");

const AdSchema = mongoose.Schema({
    object: { 
        type: String, 
        required: true
    },
    content: { 
        type: Number, 
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

module.exports = mongoose.model("Ad", AdSchema);