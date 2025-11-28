const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipment');

router.get('/', equipmentController.getAll);

router.get('/:id', equipmentController.getSingle);

router.post('/', equipmentController.addEquipment);

router.put('/:id', equipmentController.updateEquipment);

router.delete('/:id',equipmentController.removeEquipment);

module.exports = router;