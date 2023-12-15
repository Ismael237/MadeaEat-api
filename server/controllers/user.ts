const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const numSaltRounds = process.env.APP_ENV === "dev" ? 1 : 12;

module.exports.login = (req, res) => {
    try {
        const user = User.findOne({ email: req.body.email })
        const valid = bcryptjs.compare(req.body.password, user.password)
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        if(user && valid){
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: '24h' }
                )
            });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};


module.exports.allUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json({ users: users });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

module.exports.findUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        return res.status(200).json({ user: user });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.addUser = async (req, res) => {
    try {
        delete req.body._id;
        const hashPassword = await bcryptjs.hash(req.body.password, numSaltRounds);
        const user = new User({ ...req.body, password: hashPassword });
        await user.save();
        return res.status(201).json({ message: "User has been created" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.setUserProfilePictures = async (req, res) => {
    try {
        console.log(req.file);
        return res.json({ message: "User profile picture has been set" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
        return res.status(200).json({ message: "User has been modified" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}