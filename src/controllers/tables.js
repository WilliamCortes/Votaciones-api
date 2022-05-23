const { Table, User } = require('../models');
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
    const { tables, admin } = req.params;
    const table = {
        votes: 0,
        img: "",
        name: '',
        email: '',
        admin,
    };
    const totalTables = Array(parseInt(tables))
        .fill(table)
        .map((table, i) => {
            const id = uuidv4();
            return { ...table, number: i + 1, id }
        });
    await Table.bulkCreate(totalTables)
        .then(createdTables => res.json(createdTables))
        .then( async ()=> {
         const user = await User.findByPk(admin)
         user.update({haveTables:true},{})
        })
        .catch(error => next(error));
}
const addNameandEmail = async (req, res, next) => {
    const { name, email, id, password, isAdmin } = req.body;
    let newUser =  await User.create({ name, email, password, isAdmin, tableId: id, haveTables:false })
    let table = await Table.findByPk(id);
    table.update({ name, email }, {})
        .then(updateTable => res.json({...updateTable, ...newUser}))
        .catch(error => next(error));
}

const addData = async (req, res, next) => {
    const {votes, image: img, id} = req.body
    const table = await Table.findByPk(id)
    console.log('response-addData: ',table, 'id: ',id)
    table.update({ votes, img }, {})
    .then(table => res.json(table))
    .catch(error => next(error) )
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

const getTableById = (req, res, next) => {
    console.log('Table-entro')

    const {tableId:id} = req.params
    return Table.findByPk(id)
    .then(table => {
        console.log('Table', table)
        res.json(table)})
    .catch(error => next(error) )
}

const getTablesByAdmin = (req, res, next) => {
    const {admin} = req.params
     return Table.findAll({
        where: {admin}
      })
    .then(table => res.json(table))
    .catch(error => next(error) )
}

module.exports = {
    getAllTables,
    addNewTable,
    allRentedTables,
    allAvailableTables,
    addTables,
    addNameandEmail,
    getTableById,
    addData,
    getTablesByAdmin,
}
