const db = require('../models')
const Loker = db.loker
const Op = db.Sequelize.Op
const sequelize = db.sequelize

exports.getAll = (req, res) => {
    Loker.findAll({
        attributes: ['idloker', 'idperusahaan', [sequelize.literal('loker.nama'), 'nama_pekerjaan'], 'tipe', 'deskripsi', 'nama_cp', 'no_telp_cp',[sequelize.col('master_status.nama'), 'status']],
        include: [{
            model: db.master_status,
            attributes: []
        }],
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

exports.getAllByFilter = async (req, res) => {
    const filter = req.params.filter

    const query = 'select lokers.idloker, lokers.idperusahaan, lokers.nama as nama_pekerjaan, lokers.tipe, lokers.deskripsi, lokers.nama_cp, lokers.no_telp_cp, master_statuses.nama as status from lokers inner join master_statuses on lokers.status = master_statuses.idstatus where status = ?'

    await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [filter]
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'An error occurred while getting data'
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
                attributes: [],
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