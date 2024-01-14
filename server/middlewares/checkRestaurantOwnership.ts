import { Request, Response, NextFunction } from 'express';
const { db } = require("../config/firebase");

module.exports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).json({ message: 'ID du restaurant manquant dans la requête.' });
        }
        const userId = req.auth?.userId
        const user_restaurant = await db.collection("user_restaurant ").where("user_id", "==", userId).where("restaurant_id", "==", restaurantId).get();
      
        if (!user_restaurant) {
          return res.status(404).json({ message: 'Restaurant non trouvé.' });
        }
      
        if (!user_restaurant.is_admin) {
          return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce restaurant.' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};