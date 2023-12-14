const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
    admin_name: { 
        type: String, 
        required: true
    },
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    admin_password: { 
        type: String, 
        required: true
    },
    localisation: { 
        type: String, 
        required: true
    },
    town: { 
        type: String, 
        required: true
    },
    phone_number: { 
        type: String, 
        required: true
    },
    image_url: { 
        type: String, 
        required: true
    },
    times: { 
        type: String, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema);