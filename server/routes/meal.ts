const mealRouter = require("express").Router();
const {
    createMeal,
    deleteMeal,
    findMealById,
    findMealsByRestaurantId,
    updateMeal,
} = require("../controllers/meal");
const mealAuthMiddleware = require("../middlewares/auth");

mealRouter.post("/", mealAuthMiddleware, createMeal);

mealRouter.get("/:restaurantId", mealAuthMiddleware, findMealsByRestaurantId);

mealRouter.get("/:mealId", mealAuthMiddleware, findMealById);

mealRouter.put("/", mealAuthMiddleware, updateMeal);

mealRouter.put("/:mealId", mealAuthMiddleware, deleteMeal);

module.exports = mealRouter;
