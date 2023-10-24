const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Pencaker = sequelize.define('pencaker', {
        no_ktp:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: { 
            type: DataTypes.STRING 
        },
        password: { 
            type: DataTypes.STRING 
        },
        jenis_kelamin: {
            type: DataTypes.STRING
        },
        tempat_lahir: {
            type: DataTypes.STRING
        },
        tanggal_lahir: {
            type: DataTypes.DATEONLY
        },
        alamat: {
            type: DataTypes.STRING
        },
        kota: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        no_telp: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        tgl_daftar: {
            type: DataTypes.DATEONLY
        },
        file_ktp: {
            type: DataTypes.STRING
        }
    })

    return Pencaker
}