import { Request, Response as ResType } from 'express';
import { getAuth as firebaseAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase-admin/auth";

module.exports.login = async (req: Request, res: ResType) => {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth(), req.body.email, req.body.password);
        const user = userCredential.user;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error })
    }
};

module.exports.findUserById = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            const userRecord = await getAuth().getUser(req.auth.userId);
            return res.status(200).json({ user: userRecord });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.addUser = async (req: Request, res: ResType) => {
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
        const user = await getAuth().createUser(newUser);
        const userId = user.uid;
        return res.status(201).json({ message: "User has been created with id: " + userId });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateUser = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await getAuth().updateUser(req.auth?.userId, {
                displayName: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                photoURL: req.body.photoURL,
            });
            return res.status(200).json({ message: "User has been modified" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteUser = async (req: Request, res: ResType) => {
    try {
        if (req.auth) {
            await getAuth().deleteUser(req.auth?.userId);
            return res.status(200).json({ message: "User has been deleted" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}