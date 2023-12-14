require("./config/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.use(express.static("./public"));

module.exports = app;