const { DataTypes } = require('sequelize');

module.exports = sequelize => (
    sequelize.define('User', {
      
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        tableId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        haveTables: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    })
)