const db = require('../models')
const Petugas = db.petugas
const Loker = db.loker
const ApplyLoker = db.apply_loker
const Op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
const sequelize = db.sequelize
const tahapanApply = db.tahapan_apply
const Tahapan = db.tahapan
const Pencaker = db.pencaker

exports.createLoker = (req, res) => {
    if(!req.body.idperusahaan || !req.body.nama || !req.body.tipe || !req.body.usia_min || !req.body.usia_max || !req.body.gaji_min || !req.body.gaji_max || !req.body.nama_cp || !req.body.no_telp_cp || !req.body.deskripsi){
        res.status(400).send({
            message: 'Content can not be empty!'
        })
        return
    }

    const loker = {
        idloker: uuidv4(),
        idperusahaan: req.body.idperusahaan,
        nama: req.body.nama,
        tipe: req.body.tipe,
        deskripsi: req.body.deskripsi,
        usia_min: req.body.usia_min,
        usia_max: req.body.usia_max,
        gaji_min: req.body.gaji_min,
        gaji_max: req.body.gaji_max,
        nama_cp: req.body.nama_cp,
        no_telp_cp: req.body.no_telp_cp,
        tgl_update: new Date(),
        tgl_aktif: new Date(),
        tgl_tutup: null,
    }
    
    Loker.create(loker)
    .then(data => {
        res.status(201).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating the Loker'
        })
    })
}

exports.editLoker = (req, res) => {
    const idloker = req.params.idloker

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
    const idloker = req.params.idloker

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

exports.getPencakerFromLoker = (req, res) => {
    const idloker = req.params.idloker

    Loker.findByPk(idloker, {
        attributes: ['apply_lokers.idloker', 'pencakers.nama', 'apply_lokers.tgl_apply', 'tahapans.nama'],
        include: [
            {
                model: ApplyLoker,
                as: 'apply_lokers',
                include: [
                    {
                        model: Pencaker,
                        as: 'pencakers'
                    },
                    {
                        model: tahapanApply,
                        as: 'tahapan_applies',
                        include: [
                        {
                            model: Tahapan,
                            as: 'tahapans'
                        }
                        ]
                    }
                ]
            }
        ]
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error getting data with idloker=' + idloker
        })
    })
}