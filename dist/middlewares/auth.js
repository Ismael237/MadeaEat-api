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
const { getAuth } = require("firebase-admin/auth");
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const bearer = authorizationHeader.split(' ')[0];
            if (!authorizationHeader || !(bearer === "Bearer")) {
                return res.status(401).json({ message: 'Invalid authorization header' });
            }
            const token = authorizationHeader.split(' ')[1];
            const decodedToken = yield getAuth().verifyIdToken(token);
            const userId = decodedToken.user_id;
            req.auth = { userId: userId };
            next();
        }
        else {
            return res.status(401).json({ message: 'Authorization Header Not Found' });
        }
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
