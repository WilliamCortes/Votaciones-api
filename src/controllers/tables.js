const { Table } = require('../models');
const { v4: uuidv4 } = require('uuid');

const getAllTables = (req, res, next) => {
    return Table.findAll()
        .then(tables => res.json(tables))
        .catch(error => next(error));
};

const addNewTable = (req, res, next) => {
    const { number } = req.body;
    Table.create({ number })
        .then(createdUser => res.json(createdUser))
        .catch(error => next(error));
};
const addTables = async (req, res, next) => {
    const { tables } = req.params;
    const table = {
        votes: 0,
        img: "",
        name: '',
        email: '',
    };
    const totalTables = Array(parseInt(tables))
        .fill(table)
        .map((table, i) => {
            const id = uuidv4();
            return { ...table, number: i + 1, id }
        });
    await Table.bulkCreate(totalTables)
        .then(createdTables => res.json(createdTables))
        .catch(error => next(error));
}
const addNameandEmail = async (req, res, next) => {
    const { name, email, id } = req.body;
    let table = await Table.findByPk(id);
    table.update({ name, email }, {})
        .then(updateTable => res.json(updateTable))
        .catch(error => next(error));

}

const allRentedTables = (req, res, next) => {
    return Table.findAll().
        then(tables => {
            let tablesRented = tables.filter(table => table.UserId !== null)
            res.json(tablesRented)
        })
        .catch(error => next(error));
};
const allAvailableTables = (req, res, next) => {
    return Table.findAll().
        then(tables => {
            let tablesRented = tables.filter(table => table.UserId === null)
            res.json(tablesRented)
        })
        .catch(error => next(error));
};

module.exports = {
    getAllTables,
    addNewTable,
    allRentedTables,
    allAvailableTables,
    addTables,
    addNameandEmail,
}
