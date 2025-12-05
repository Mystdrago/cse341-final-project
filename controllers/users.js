const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validateUsers = (user) => {
    const requiredFields = ['userName', 'password', 'gm'];
    for (const field of requiredFields) {
        if (user[field] === undefined || user[field] === null) {
            return false;
        }
    }
    return true;
};

const getAll = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(String(req.params.id));
        const user = await mongodb.getDatabase().db().collection('users').findOne({_id: userId});
        if (!user) return res.status(404).json({ error: 'user not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const user = {
            userName: req.body.userName,
            password: req.body.password,
            gm: req.body.gm
        };
        if (!validateUsers(user)) {
            return res.status(400).json({ error: 'Invalid user data' });
        }

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        res.status(201).json({ id: response.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(String(req.params.id));
        const user = {
            userName: req.body.userName,
            passowrd: req.body.password,
            gm: req.body.gm
        };
        if (!validateUsers(user)) {
            return res.status(400).json({ error: 'Invalid user data' });
        }

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'user updated' });
        } else {
            res.status(404).json({ error: 'user not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(String(req.params.id));
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'user deleted' });
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    addUser,
    updateUser,
    removeUser
};