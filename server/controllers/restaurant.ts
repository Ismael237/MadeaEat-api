import { Request, Response as ResType } from 'express';
const { db } = require("../config/firebase");
const collectionName = "user_restaurant";
const secondCollectionName = "restaurant";

module.exports.createRestaurant = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const newRestaurant = {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                photoURL: req.body.photoURL,
            }
            const restaurant = await db.collection(secondCollectionName).add(newRestaurant);
            const restaurantId = restaurant.id;
            await db.collection(collectionName).add({ user_id: req.auth.userId, restaurant_id: restaurantId, is_admin: true });
            return res.status(201).json({ message: "Restaurant has been created with id: " + restaurantId });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.addRestaurantUser = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const userIdToAdd = req.body.userId;
            const restaurantId = req.body.restaurantId;
            await db.collection(collectionName).add({ user_id: userIdToAdd, restaurant_id: restaurantId, is_admin: false });
            return res.status(201).json({ message: "User with id: " + restaurantId + " has been added"});
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findRestaurantsByUserId = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const userRestaurantQuerySnapshot = await db.collection(collectionName).where("user_id", "==", req.auth.userId).get();
            const promises = userRestaurantQuerySnapshot.map(async (doc: { data: () => { (): any; new(): any; restaurant_id: any; }; }) => {
                    var restaurantId = doc.data().restaurant_id;
                    const res = await db.collection(secondCollectionName).doc(String(restaurantId)).get();
                    return {
                    id: res.id,
                    data: res.data(),
                };
            });
            const restaurants = await Promise.all(promises);
            return res.status(201).json({ restaurants });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findRestaurantById = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const restaurantId = req.params.restaurantId;
            const restaurant = await db.collection(secondCollectionName).doc(restaurantId).get();
            return res.status(200).json({ id: restaurant.id, data: restaurant.data() });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateRestaurant = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(secondCollectionName).doc(req.params.restaurantId).set(req.body, { merge: true })
            return res.status(200).json({ message: "Restaurant has been modified" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteRestaurant = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(secondCollectionName).doc(req.params.restaurantId).delete();
            return res.status(200).json({ message: "Restaurant has been deleted" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}
