const db = require('../models')
const Petugas = db.petugas
const Op = db.Sequelize.Op
const Loker = db.loker

exports.isPetugas = (req, res) => {
    res.status(200).send('Petugas Content')
}

exports.getLoker = (req, res) => {
    const nama = req.body.nama
    const condition = nama ? { nama: { [Op.like]: `%&{nama}%` } } : null

    Loker.findAll({ where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error getting data"
        })
    })
}

exports.createLoker = (req, res) => {
    if(!req.body.idperusahaan || !req.body.nama || !req.body.tipe || !req.body.usia_min || !req.body.usia_max || !req.body.gaji_min || !req.body.gaji_max || !req.body.nama_cp || !req.body.no_telp_cp || !req.body.tgl_update || !req.body.tgl_aktif || !req.body.tgl_tutup || !req.body.status){
        res.status(400).send({
            message: 'Content can not be empty!'
        })
        return
    }

    const loker = {
        idperusahaan: req.body.idperusahaan,
        nama: req.body.nama,
        tipe: req.body.tipe,
        usia_min: req.body.usia_min,
        usia_max: req.body.usia_max,
        gaji_min: req.body.gaji_min,
        gaji_max: req.body.gaji_max,
        nama_cp: req.body.nama_cp,
        no_telp_cp: req.body.no_telp_cp,
        tgl_update: req.body.tgl_update,
        tgl_aktif: req.body.tgl_aktif,
        tgl_tutup: req.body.tgl_tutup,
        status: req.body.status
    }
    
    Loker.create(loker)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating the Loker'
        })
    })
}

exports.editLoker = (req, res) => {
    idloker = req.params.idloker

    Loker.update(req.body, {
        where: {idloker: idloker}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Loker was updated successfully"
            })
        } else {
            res.send({
                message: `Cant update Loker with id=${idloker}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error while updating loker with id=" + idloker
        })
    })
}

exports.deleteLoker = (req, res) => {
    idloker = req.params.idloker

    Loker.destroy({
        where: {idloker: idloker}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Tutorial was deleted successfully"
            })
        } else {
            res.send({
                message: `Cannot delete loker with id=${idloker}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Cannot delete loker with id=" + idloker
        })
    })
}