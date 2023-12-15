const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    first_name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    password: { 
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
    sexe: { 
        type: String, 
        required: true
    },
    role_id: { 
        type: String, 
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);