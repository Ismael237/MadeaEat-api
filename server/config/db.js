const mongoose = require("mongoose");

mongoose.set("strictQuery");

try {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Login to MongoDB successful !");
} catch (error) {
    console.log("Login to MongoDB failed !, error: " + error);
}