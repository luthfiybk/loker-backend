const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const tahapanApply = sequelize.define("tahapan_apply", {
        idtahapan: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        nilai: {
            type: DataTypes.INTEGER,
        },
        tgl_update: {
            type: DataTypes.DATEONLY,
        },
    });

    return tahapanApply;
};
