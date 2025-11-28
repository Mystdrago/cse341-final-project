const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validateEquipment = (equipment) => {
    const requiredFields = ['name', 'damage', 'range', 'hit'];
    for (const field of requiredFields) {
        if (equipment[field] === undefined || equipment[field] === null) {
            return false;
        }
    }
    return true;
};

const getAll = async (req, res) => {
    //#swagger.tags=['equipments']
    try {
        const result = await mongodb.getDatabase().db().collection('equipment').find();
        const equipments = await result.toArray();
        res.status(200).json(equipments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['equipments']
    try {
        const equipmentId = new ObjectId(String(req.params.id));
        const equipment = await mongodb.getDatabase().db().collection('equipment').findOne({_id: equipmentId});
        if (!equipment) return res.status(404).json({ error: 'equipment not found' });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addEquipment = async (req, res) => {
    //#swagger.tags=['equipment']
    try {
        const equipment = {
            name: req.body.name,
            damage: req.body.damage,
            range: req.body.range,
            hit: req.body.hit
        };
        if (!validateEquipment(equipment)) {
            return res.status(400).json({ error: 'Invalid equipment data' });
        }

        const response = await mongodb.getDatabase().db().collection('equipment').insertOne(equipment);
        res.status(201).json({ id: response.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEquipment = async (req, res) => {
    //#swagger.tags=['equipment']
    try {
        const equipmentId = new ObjectId(String(req.params.id));
        const equipment = {
            name: req.body.name,
            damage: req.body.damage,
            range: req.body.range,
            hit: req.body.hit
        };
        if (!validateEquipment(equipment)) {
            return res.status(400).json({ error: 'Invalid equipment data' });
        }

        const response = await mongodb.getDatabase().db().collection('equipment').replaceOne({_id: equipmentId}, equipment);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'equipment updated' });
        } else {
            res.status(404).json({ error: 'equipment not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeEquipment = async (req, res) => {
    //#swagger.tags=['equipment']
    try {
        const equipmentId = new ObjectId(String(req.params.id));
        const response = await mongodb.getDatabase().db().collection('equipment').deleteOne({_id: equipmentId});
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'equipment deleted' });
        } else {
            res.status(404).json({ error: 'equipment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    addEquipment,
    updateEquipment,
    removeEquipment
};