const db = require('../models')
const Loker = db.loker
const Op = db.Sequelize.Op
const sequelize = db.sequelize

exports.getAll = (req, res) => {
    const status = req.params.status
    const condition = status ? { status: { [Op.like]: `%${status}%` } } : null

    Loker.findAll({
        attributes: ['idloker', 'idperusahaan', [sequelize.literal('loker.nama'), 'nama_pekerjaan'], 'tipe', 'deskripsi', 'nama_cp', 'no_telp_cp',[sequelize.col('master_status.nama'), 'status']],
        include: [{
            model: db.master_status,
            eager: false
        }],
        where: {
            status: condition
        }
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error getting data'
        })
    })
}

exports.getOne = (req, res) => {
    const idloker = req.params.idloker

    Loker.findByPk(idloker,
        {
            attributes: ['idloker', 'idperusahaan', [sequelize.literal('loker.nama'), 'nama_pekerjaan'], 'tipe', 'deskripsi', 'usia_min', 'usia_max', 'gaji_min', 'gaji_max', 'nama_cp', 'no_telp_cp', 'tgl_update', 'tgl_aktif', 'tgl_tutup', [sequelize.col('master_status.nama'), 'status']],
            include: [{
                model: db.master_status,
                eager: false
            }],
        })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error getting data with id=' + idloker
        })
    })
}