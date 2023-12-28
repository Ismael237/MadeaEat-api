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
const auth_1 = require("firebase/auth");
const auth_2 = require("firebase-admin/auth");
module.exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredential = yield (0, auth_1.signInWithEmailAndPassword)((0, auth_1.getAuth)(), req.body.email, req.body.password);
        const user = userCredential.user;
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
module.exports.findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.auth) {
            const userRecord = yield (0, auth_2.getAuth)().getUser(req.auth.userId);
            return res.status(200).json({ user: userRecord });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            displayName: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            photoURL: req.body.photoURL,
            emailVerified: false,
            disabled: false,
        };
        const user = yield (0, auth_2.getAuth)().createUser(newUser);
        const userId = user.uid;
        return res.status(201).json({ message: "User has been created with id: " + userId });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.auth) {
            yield (0, auth_2.getAuth)().updateUser((_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId, {
                displayName: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                photoURL: req.body.photoURL,
            });
            return res.status(200).json({ message: "User has been modified" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
module.exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (req.auth) {
            yield (0, auth_2.getAuth)().deleteUser((_b = req.auth) === null || _b === void 0 ? void 0 : _b.userId);
            return res.status(200).json({ message: "User has been deleted" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
