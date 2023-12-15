const mongoose = require("mongoose");

const UserRestaurantSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
});

module.exports = mongoose.model("UserRestaurant", UserRestaurantSchema);