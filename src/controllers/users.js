const { User, Table } = require('../models');


const getAllUsers = (req, res, next) => {
    return User.findAll({
        include: Table,
    }).then(users => res.json(users))
        .catch(error => next(error));
};

const createNewUser = (req, res, next) => {
    const { name, email, password } = req.body;
    User.create({ name, email, password })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
};

const getUserByEmail = (req, res, next) => {
    const { email } = req.body;
    return User.findByPk(email, { include: Table, })
        .then(user => res.json(user))
        .catch(error => next(error));
};

const addTableToUser = async (req, res, next) => {
    try {
        const { userId, tableId } = req.params;
        let table = await Table.findByPk(tableId);
        if (table.UserId) {
            let userId = table.UserId;
            let currentUser = await User.findByPk(userId);
            return res.send(`Este libro está prestado a: ${currentUser.name}`);
        }
        let user = await User.findByPk(userId, {});
        let result = await user.addBook(table);
        res.send(`Prestamo exitoso a: ${result.name}`);
    } catch (error) {
        next(error);
    }
};

const removeTableToUser = async (req, res, next) => {
    try {
        const { userId, tableId } = req.params;
        let table = await Table.findByPk(tableId);
        let user = await User.findByPk(userId, {
            include: Table,
        });
        let validateTable = user.Tables.filter(table => table.id == tableId);
        if (!validateTable.length) {
            res.send('Lo siento no coinciden los datos');
        } else {
            let Tables = user.Tables.filter(table => table.id != tableId);
            let resultTable = await table.update({ ...table, UserId: null }, {});
            let resultUser = await user.update({ ...user, Tables: Tables }, {});
            res.send(`Devolución exitosa del libro: ${resultTable.name} Por: ${resultUser.name} `);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    getUserByEmail,
    addTableToUser,
    removeTableToUser,
}