import { Request, Response as ResType } from 'express';
const { db } = require("../config/firebase");
const collectionName = "meal";

module.exports.createMeal = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const newMeal = {
                name: req.body.name,
                description: req.body.description,
                prix: req.body.prix,
                photoURL: req.body.photoURL,
                restaurantId: req.body.restaurantId,
            }
            const meal = await db.collection(collectionName).add(newMeal);
            return res.status(201).json({ message: "Meal has been created with id: " + meal.id });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findMealsByRestaurantId = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            let meal: any[] = [];
            const restaurantMealQuerySnapshot = await db.collection(collectionName).where("restaurant_id", "==", req.body.restaurantId).get();
            restaurantMealQuerySnapshot.forEach(async (doc: { data: () => { (): any; new(): any; meal_id: any; }; }) => {
                var mealId = doc.data().meal_id;
                const res = await db.collection(collectionName).doc(String(mealId)).get();
                meal.push({
                    id: res.id,
                    data: res.data(),
                });
            });
            return res.status(201).json({ meal });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findMealById = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const mealId = req.params.mealId;
            const meal = await db.collection(collectionName).doc(mealId).get();
            return res.status(200).json({ id: meal.id, data: meal.data() });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateMeal = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(collectionName).doc(req.params.mealId).set(req.body, { merge: true })
            return res.status(200).json({ message: "Meal has been modified" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteMeal = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(collectionName).doc(req.params.mealId).delete();
            return res.status(200).json({ message: "Meal has been deleted" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}
