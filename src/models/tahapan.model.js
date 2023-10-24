const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tahapan = sequelize.define("tahapan", {
        idtahapan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
        },
    });

    return Tahapan;
};
