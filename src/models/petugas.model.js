const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Petugas = sequelize.define('petugas', {
        idpetugas: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        nama: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    })

    return Petugas
}