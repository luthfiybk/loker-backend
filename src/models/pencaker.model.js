module.exports = (sequelize, Sequelize) => {
    const Pencaker = sequelize.define('pencaker', {
        no_ktp:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        nama: { 
            type: Sequelize.STRING 
        },
        password: { 
            type: Sequelize.STRING 
        },
        jenis_kelamin: {
            type: Sequelize.STRING
        },
        tempat_lahir: {
            type: Sequelize.STRING
        },
        tanggal_lahir: {
            type: Sequelize.DATE
        },
        alamat: {
            type: Sequelize.STRING
        },
        kota: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        no_telp: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING
        },
        tgl_daftar: {
            type: Sequelize.DATE
        },
        file_ktp: {
            type: Sequelize.STRING
        }
    })

    return Pencaker
}