const express = require('express');
const { getAllTables, addNewTable, allRentedTables, allAvailableTables, addTables, addNameandEmail } = require('../controllers/tables.js');

const router = express.Router();


router.get('/', getAllTables);

router.post('/', addNewTable);

router.post('/:tables', addTables);

router.put('/addname', addNameandEmail);

router.get('/rentedTables', allRentedTables);

router.get('/availableTables', allAvailableTables);

module.exports = router;