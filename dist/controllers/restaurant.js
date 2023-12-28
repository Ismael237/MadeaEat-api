"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { db } = require("../config/firebase");
const collectionName = "user_restaurant";
const secondCollectionName = "restaurant";
module.exports.createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            const newRestaurant = {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                photoURL: req.body.photoURL,
            };
            const restaurant = yield db.collection(secondCollectionName).add(newRestaurant);
            const restaurantId = restaurant.id;
            yield db.collection(collectionName).add({ user_id: req.auth.userId, restaurant_id: restaurantId, is_admin: true });
            return res.status(201).json({ message: "Restaurant has been created with id: " + restaurantId });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.findRestaurantsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            let restaurant = [];
            const userRestaurantQuerySnapshot = yield db.collection(collectionName).where("user_id", "==", req.auth.userId).get();
            const data = userRestaurantQuerySnapshot.forEach((doc) => __awaiter(void 0, void 0, void 0, function* () {
                var restaurantId = doc.data().restaurant_id;
                const res = yield db.collection(secondCollectionName).doc(String(restaurantId)).get();
                restaurant.push({
                    id: res.id,
                    data: res.data(),
                });
            }));
            return res.status(201).json({ restaurant });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.findRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            const restaurantId = req.params.restaurantId;
            const restaurant = yield db.collection(secondCollectionName).doc(restaurantId).get();
            return res.status(200).json({ id: restaurant.id, data: restaurant.data() });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            yield db.collection(secondCollectionName).doc(req.params.restaurantId).set(req.body, { merge: true });
            return res.status(200).json({ message: "Restaurant has been modified" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            yield db.collection(secondCollectionName).doc(req.params.restaurantId).delete();
            return res.status(200).json({ message: "Restaurant has been deleted" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
