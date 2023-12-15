const Role = require("../models/Role");

module.exports.allRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort({ createdAt: -1 });
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

module.exports.findRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id });
        return res.status(200).json(role);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.addRole = (req, res) => {
    delete req.body._id;
    const role = new Role({ ...req.body });
    try {
        role.save();
        return res.status(201).json({ message: "Role has been created" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateRole = (req, res) => {
    try {
        Role.updateOne({ _id: req.params.id },{ ...req.body, _id: req.params.id });
        return res.status(200).json({ message: "Role has been modified" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteRole = (req, res) => {
    try {
        Role.deleteOne({ _id: req.params.id});
        return res.status(200).json({ message: "Role has been deleted" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}