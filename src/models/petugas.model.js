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
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    })

    return Petugas
}