const db = require('../models')
const Petugas = db.petugas
const Loker = db.loker
const ApplyLoker = db.apply_loker
const Op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
const sequelize = db.sequelize
const tahapanApply = db.tahapan_apply
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

exports.getPencakerFromLoker = async (req, res) => {
    const idloker = req.params.idloker

    const query = 'select apply_lokers.idapply, pencakers.nama as nama_pekerjaan, apply_lokers.tgl_apply as tanggal_apply, tahapans.nama as tahapan from tahapan_applies left join tahapans on tahapan_applies.idtahapan = tahapans.idtahapan left join apply_lokers on apply_lokers.idapply = tahapan_applies.idapply left join pencakers on apply_lokers.no_ktp = pencakers.no_ktp where apply_lokers.idloker = ?'

    await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idloker]
    }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({
            message: 'Error getting data with id=' + idloker
        })
    })
}

exports.seleksiAdministrasi = (req, res) => {
    const idapply = req.params.idapply
    const nilai = req.body.nilai
    if(nilai === 1) {
        tahapanApply.update({idtahapan: 2, nilai: 1,  tgl_update: new Date()}, {
            where: {idapply: idapply}
        })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Tahapan was updated successfully"
                })
            } else {
                res.send({
                    message: `Cant update tahapan with id=${idapply}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while updating tahapan with id=" + idapply
            })
        })
    } else if (nilai === 0) {
        tahapanApply.update({idtahapan: 1, nilai: 0,  tgl_update: new Date()}, {
            where: {idapply: idapply}
        })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Tahapan was updated successfully"
                })
            } else {
                res.send({
                    message: `Cant update tahapan with id=${idapply}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while updating tahapan with id=" + idapply
            })
        })
    }
}

exports.seleksiWawancara = (req, res) => {
    const idapply = req.params.idapply

    tahapanApply.update({idtahapan: 3, tgl_update: new Date()}, {
        where: {idapply: idapply}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Tahapan was updated successfully"
            })
        } else {
            res.send({
                message: `Cant update tahapan with id=${idapply}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error while updating tahapan with id=" + idapply
        })
    })
}