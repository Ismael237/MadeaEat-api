const orderRouter = require("express").Router();
const {
    createOrder,
    deleteOrder,
    findOrderById,
    findOrdersByRestaurantId,
    findOrdersByUserId,
    findOrdersOngoing,
    findOrdersDone,
    updateOrder,
} = require("../controllers/order");
const orderAuthMiddleware = require("../middlewares/auth");

orderRouter.post("/", orderAuthMiddleware, createOrder);

orderRouter.get("/", orderAuthMiddleware, findOrdersByUserId);

orderRouter.get("/:restaurantId", orderAuthMiddleware, findOrdersByRestaurantId);

orderRouter.get("/ongoing/:restaurantId", orderAuthMiddleware, findOrdersOngoing);

orderRouter.get("/done/:restaurantId", orderAuthMiddleware, findOrdersDone);

orderRouter.get("/:orderId", orderAuthMiddleware, findOrderById);

orderRouter.put("/", orderAuthMiddleware, updateOrder);

orderRouter.delete("/:orderId", orderAuthMiddleware, deleteOrder);

module.exports = orderRouter;
