const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('genre', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}