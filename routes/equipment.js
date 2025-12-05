const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipment');
const gmAuth = require('../middleware/gmAuth');

router.get('/', equipmentController.getAll);

router.get('/:id', equipmentController.getSingle);

//#swagger.security = [{ "GMToken": [] }]
router.post('/', gmAuth, equipmentController.addEquipment);

//#swagger.security = [{ "GMToken": [] }]
router.put('/:id', gmAuth, equipmentController.updateEquipment);

router.delete('/:id',equipmentController.removeEquipment);

module.exports = router;