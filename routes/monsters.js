const express = require('express');
const router = express.Router();

const monsterController = require('../controllers/monsters');
const gmAuth = require('../middleware/gmAuth');

router.get('/', monsterController.getAll);

router.get('/:id', monsterController.getSingle);

//#swagger.security = [{ "GMToken": [] }]
router.post('/', gmAuth, monsterController.addMonster);

//#swagger.security = [{ "GMToken": [] }]
router.put('/:id', gmAuth, monsterController.updateMonster);

router.delete('/:id',monsterController.removeMonster);

module.exports = router;