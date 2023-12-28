import { Request, Response, NextFunction } from 'express';
const { getAuth } = require("firebase-admin/auth");

module.exports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const bearer = authorizationHeader.split(' ')[0];
            if (!authorizationHeader || !(bearer === "Bearer")) {
                return res.status(401).json({ message: 'Invalid authorization header' });
            }
            const token = authorizationHeader.split(' ')[1];
            const decodedToken = await getAuth().verifyIdToken(token);
            const userId = decodedToken.user_id;
            req.auth = { userId: userId };
            next();
        } else {
            return res.status(401).json({ message: 'Authorization Header Not Found' });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};