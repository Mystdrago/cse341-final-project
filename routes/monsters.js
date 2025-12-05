const express = require('express');
const router = express.Router();

const monsterController = require('../controllers/monsters');
const checkGM = require('../middleware/checkGM');

router.get('/', monsterController.getAll);

router.get('/:id', monsterController.getSingle);

// POST /monsters (protected)
//#swagger.security = [{ "OAuth2": ["write"] }]
router.post('/', checkGM, monsterController.addMonster);

// PUT /monsters (protected)
//#swagger.security = [{ "OAuth2": ["write"] }]
router.put('/:id', checkGM, monsterController.updateMonster);

// DELETE /monsters (protected)
//#swagger.security = [{ "OAuth2": ["write"] }]
router.delete('/:id', checkGM, monsterController.removeMonster);

module.exports = router;
