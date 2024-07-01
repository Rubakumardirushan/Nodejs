const User = require('../models/user');
const Role = require('../models/role');

exports.createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const roleExists = await Role.findById(role);
        if (!roleExists) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = new User({ name, email, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const roleExists = await Role.findById(role);
        if (!roleExists) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
