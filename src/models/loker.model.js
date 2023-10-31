const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Loker = sequelize.define("loker", {
        idloker: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            primaryKey: true,
        },
        idperusahaan: {
            type: DataTypes.STRING,
        },
        nama: {
            type: DataTypes.STRING,
        },
        tipe: {
            type: DataTypes.STRING,
        },
        deskripsi: {
            type: DataTypes.STRING,
        },
        usia_min: {
            type: DataTypes.INTEGER,
        },
        usia_max: {
            type: DataTypes.INTEGER,
        },
        gaji_min: {
            type: DataTypes.FLOAT,
        },
        gaji_max: {
            type: DataTypes.FLOAT,
        },
        nama_cp: {
            type: DataTypes.STRING,
        },
        email_cp: {
            type: DataTypes.STRING,
            unique: true
        },
        no_telp_cp: {
            type: DataTypes.STRING,
        },
        tgl_update: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        tgl_aktif: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        tgl_tutup: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
    });

    return Loker;
};
