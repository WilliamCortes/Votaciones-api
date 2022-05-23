const { DataTypes } = require('sequelize');

module.exports = sequelize => (
    sequelize.define('Table', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        votes: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        number: {
            type: DataTypes.REAL,
            allowNull: false,
        },
    })
)