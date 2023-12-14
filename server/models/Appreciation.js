const mongoose = require("mongoose");

const AppreciationSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    menu: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
    },
    note: { 
        type: number,
        required: true,
    },
    
});

module.exports = mongoose.model("Appreciation", AppreciationSchema);