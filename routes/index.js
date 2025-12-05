const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/login', require('./login'));

router.use('/monsters', require('./monsters'));

router.use('/players', require('./players'));

router.use('/equipment', require('./equipment'));

router.use('/users', require('./users.js'));

module.exports = router;