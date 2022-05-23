const express = require('express');
const { getAllTables, addNewTable, allRentedTables, allAvailableTables, addTables, addNameandEmail,getTableById, addData, getTablesByAdmin } = require('../controllers/tables.js');

const router = express.Router();


router.get('/', getAllTables);

router.get('/:admin', getTablesByAdmin);
router.get('/table/:tableId', getTableById)

router.post('/', addNewTable);

router.post('/:tables/:admin', addTables);


router.put('/addname', addNameandEmail);

router.put('/addData', addData);

router.get('/rentedTables', allRentedTables);

router.get('/availableTables', allAvailableTables);

module.exports = router;