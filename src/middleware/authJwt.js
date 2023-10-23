const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const db = require("../models")
const Pencaker = db.pencaker
const Petugas = db.petugas

verifyToken = (req, res, next) => {
    let token = req.session.token

    if(!token) {
        return res.status(403).send({ message: 'No token provided!' })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: 'Unauthorized!' })
        }

        req.session.no_ktp = decoded.no_ktp
        req.session.idpetugas = decoded.idpetugas
        next()
    })
}

isPencaker = (req, res, next) => {
    Pencaker.findByPk(req.session.no_ktp).then(pencaker => {
        if(pencaker) {
            next()
            return
        }

        res.status(403).send({ message: 'Require Pencaker Role!' })
        return
    })
}

isPetugas = (req, res, next) => {
    Petugas.findByPk(req.session.idpetugas).then(petugas => {
        if(petugas) {
            next()
            return
        }

        res.status(403).send({ message: 'Require Petugas Role' })
        return
    })
}

const authJwt = { verifyToken, isPencaker, isPetugas }

module.exports = authJwt