const { DataTypes } = require('sequelize');

module.exports = sequelize => (
    sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
)