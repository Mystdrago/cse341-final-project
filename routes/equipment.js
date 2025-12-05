const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipment');
const checkGM = require('../middleware/checkGM');

router.get('/', equipmentController.getAll);

router.get('/:id', equipmentController.getSingle);

//POST /equipment (protected)
// //#swagger.security = [{ "OAuth2": ["write"] }]
router.post('/', checkGM, equipmentController.addEquipment);

//PUT /equipment (protected)
// //#swagger.security = [{ "OAuth2": ["write"] }]
router.put('/:id', checkGM, equipmentController.updateEquipment);

//DELETE /equipment (protected)
// //#swagger.security = [{ "OAuth2": ["write"] }]
router.delete('/:id', checkGM, equipmentController.removeEquipment);


module.exports = router;
