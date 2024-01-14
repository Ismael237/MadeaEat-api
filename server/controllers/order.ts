import { Request, Response as ResType } from 'express';
const { db } = require("../config/firebase");
const collectionName = "order";
const secondCollectionName = "user_order";

module.exports.createOrder = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const newOrder = {
                items: [
                    {
                        menuId: req.body.menu_id,
                        quantity: req.body.quantity
                    }
                ],
            }
            const order = await db.collection(collectionName).add(newOrder);
            const orderId = order.id;
            await db.collection(secondCollectionName).add({ user_id: req.auth.userId, order_id: orderId, is_admin: true });
            return res.status(201).json({ message: "Order has been created with id: " + orderId });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findOrdersByUserId = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const userOrderQuerySnapshot = await db.collection(collectionName).where("user_id", "==", req.auth.userId).get();
            const promises = userOrderQuerySnapshot.map(async (doc: { data: () => { (): any; new(): any; order_id: any; }; }) => {
                    var orderId = doc.data().order_id;
                    const res = await db.collection(secondCollectionName).doc(String(orderId)).get();
                    return {
                    id: res.id,
                    data: res.data(),
                };
            });
            const orders = await Promise.all(promises);
            return res.status(201).json({ orders });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findOrdersByRestaurantId = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const userOrderQuerySnapshot = await db.collection(collectionName).where("restaurant_id", "==", req.auth.userId).get();
            const promises = userOrderQuerySnapshot.map(async (doc: { data: () => { (): any; new(): any; order_id: any; }; }) => {
                    var orderId = doc.data().order_id;
                    const res = await db.collection(secondCollectionName).doc(String(orderId)).get();
                    return {
                    id: res.id,
                    data: res.data(),
                };
            });
            const orders = await Promise.all(promises);
            return res.status(201).json({ orders });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findOrdersOngoing = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const orderQuerySnapshot = await db.collection(secondCollectionName).where("restaurant_id", "==", req.body.restaurantId).where("ongoing", "==", true).get();
            const promises = orderQuerySnapshot.map(async (doc: { data: () => { (): any; new(): any; order_id: any; }; }) => {
                    var orderId = doc.data().order_id;
                    const res = await db.collection(collectionName).doc(String(orderId)).get();
                    return {
                        id: res.id,
                        data: res.data(),
                    };
            });
            const orders = await Promise.all(promises);
            return res.status(201).json({ orders });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findOrdersDone = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const orderQuerySnapshot = await db.collection(secondCollectionName).where("restaurant_id", "==", req.body.restaurantId).where("done", "==", true).get();
            const promises = orderQuerySnapshot.map(async (doc: { data: () => { (): any; new(): any; order_id: any; }; }) => {
                    var orderId = doc.data().order_id;
                    const res = await db.collection(collectionName).doc(String(orderId)).get();
                    return {
                        id: res.id,
                        data: res.data(),
                    };
            });
            const orders = await Promise.all(promises);
            return res.status(201).json({ orders });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.findOrderById = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const orderId = req.params.orderId;
            const order = await db.collection(secondCollectionName).doc(orderId).get();
            return res.status(200).json({ id: order.id, data: order.data() });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateOrder = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(secondCollectionName).doc(req.params.orderId).set(req.body, { merge: true })
            return res.status(200).json({ message: "Order has been modified" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteOrder = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await db.collection(secondCollectionName).doc(req.params.orderId).delete();
            return res.status(200).json({ message: "Order has been deleted" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}
