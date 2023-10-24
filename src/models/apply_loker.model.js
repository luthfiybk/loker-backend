const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const ApplyLoker = sequelize.define("apply_loker", {
        idapply: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        idloker: {
            type: DataTypes.UUID,
        },
        no_ktp: {
            type: DataTypes.STRING,
        },
        tgl_apply: {
            type: DataTypes.DATEONLY,
        },
    });

    return ApplyLoker;
};
