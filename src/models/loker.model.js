module.exports = (sequelize, Sequlize) => {
    const Loker = sequelize.define('loker', {
        idloker: {
            type: Sequlize.STRING,
            defaultValue: Sequlize.UUIDv4,
            primaryKey: true
        },
        idperusahaan: {
            type: Sequlize.STRING,
            defaultValue: Sequlize.UUIDv4
        },
        nama: {
            type: Sequlize.STRING
        },
        tipe: {
            type: Sequlize.STRING
        },
        usia_min: {
            type: Sequlize.INTEGER
        },
        usia_max: {
            type: Sequlize.INTEGER
        },
        gaji_min: {
            type: Sequlize.INTEGER
        },
        gaji_max: {
            type: Sequlize.INTEGER
        },
        nama_cp: {
            type: Sequlize.STRING
        },
        no_telp_cp: {
            type: Sequlize.STRING
        },
        tgl_update: {
            type: Sequlize.DATE
        },
        tgl_aktif: {
            type: Sequlize.DATE
        },
        tgl_tutup: {
            type: Sequlize.DATE
        },
        status: {
            type: Sequlize.INTEGER
        }
    })

    return Loker
}