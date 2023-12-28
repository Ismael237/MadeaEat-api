const restaurantRouter = require("express").Router();
const {
    createRestaurant,
    deleteRestaurant,
    findRestaurantById,
    findRestaurantsByUserId,
    updateRestaurant,
} = require("../controllers/restaurant");
const restaurantAuthMiddleware = require("../middlewares/auth");

restaurantRouter.post("/", restaurantAuthMiddleware, createRestaurant);

restaurantRouter.get("/", restaurantAuthMiddleware, findRestaurantsByUserId);

restaurantRouter.get("/:restaurantId", restaurantAuthMiddleware, findRestaurantById);

restaurantRouter.put("/", restaurantAuthMiddleware, updateRestaurant);

restaurantRouter.put("/:restaurantId", restaurantAuthMiddleware, deleteRestaurant);

module.exports = restaurantRouter;
