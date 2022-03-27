const express = require('express');
const usersRoutes = require('./users');
const tablesRoutes = require('./tables');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/tables', tablesRoutes);


module.exports = router;
