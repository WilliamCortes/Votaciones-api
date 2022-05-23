const express = require('express');
const { getAllUsers, createNewUser, getUserByEmail, addTableToUser, removeTableToUser } = require('../controllers/users.js');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createNewUser);

router.get('/:email', getUserByEmail);

router.post('/:userId/table/:tableId', addTableToUser);

router.put('/:userId/table/:tableId', removeTableToUser);

module.exports = router;