const { authJwt } = require('../middleware')
const petugasController = require('../controllers/petugas.controller')
const lokerController = require('../controllers/loker.controller')
// const http = require('http')
const router = require('express').Router()

module.exports = function(app) {
    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
    //     )
    // })

    //Get All Loker
    app.get(
        '/api/petugas/loker',
        [authJwt.verifyToken, authJwt.isPetugas],
        lokerController.getAll
    )

    //
    app.get(
        '/api/petugas/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPetugas],
        lokerController.getOne
    )

    app.post(
        '/api/petugas/loker',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.createLoker
    )

    app.delete(
        '/api/petugas/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.editLoker
    )

    app.get(
        '/api/petugas/loker/:idloker/apply',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.getPencakerFromLoker
    )
}