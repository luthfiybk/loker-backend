const db = require('../models')
const ApplyLoker = db.apply_loker
const { v4: uuidv4 } = require('uuid')

exports.applyJob = (req, res) => {
    const no_ktp = req.session.no_ktp
    const idloker = req.params.idloker

    const form = {
        idapply: uuidv4(),
        idloker: idloker,
        no_ktp: no_ktp,
        tgl_apply: new Date(),
    }

    ApplyLoker.create(form)
    .then(data => {
        res.status(201).send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while applying the job'
        })
    })
}