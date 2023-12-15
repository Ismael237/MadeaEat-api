const mongoose = require("mongoose");

const DeliverySchema = mongoose.Schema({
    dateTime: { 
        type: String, 
        required: true
    },
    quantity: { 
        type: Number, 
        required: true
    },
    deliveryMan: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    menu: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
    },
}, { timestamps: true });

module.exports = mongoose.model("Delivery", DeliverySchema);