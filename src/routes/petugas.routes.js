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

    //Get All By Status
    app.get(
        '/api/petugas/loker?filter[status]=:status',
        [authJwt.verifyToken, authJwt.isPetugas],
        lokerController.getAllByFilter
    )

    //Get Loker Detail
    app.get(
        '/api/petugas/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPetugas],
        lokerController.getOne
    )
    
    //Post New Loker
    app.post(
        '/api/petugas/loker',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.createLoker
    )

    //Delete Selected Loker
    app.delete(
        '/api/petugas/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.editLoker
    )

    //Get Pencaker List From Selected Loker
    app.get(
        '/api/petugas/loker/:idloker/apply',
        [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.getPencakerFromLoker
    )
}