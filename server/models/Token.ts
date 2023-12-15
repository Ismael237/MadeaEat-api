const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    token: { type: String, required: true },
    expiration_date: { type: Date, required: true },   
}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);