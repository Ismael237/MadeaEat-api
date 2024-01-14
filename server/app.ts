require("./config/firebase");
import express, { Request as ReqType, Response as ResType, NextFunction } from 'express';

const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const restaurantRoutes = require("./routes/restaurant");
const mealRoutes = require("./routes/meal");
const orderRoutes = require("./routes/order");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/orders", orderRoutes);


module.exports = app;