const Role = require('../models/role');
const User = require('../models/user');

exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = new Role({ name, description });
        await role.save();
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        role.name = name;
        role.description = description;
        await role.save();

        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        await User.updateMany({ role: role._id }, { role: null });
        res.json({ message: 'Role deleted and related users updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
