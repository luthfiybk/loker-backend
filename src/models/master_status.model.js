const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("master_status", {
        idstatus: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
        },
    })

    return Status
}