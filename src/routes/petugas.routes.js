const { authJwt } = require('../middleware')
const controller = require('../controllers/petugas.controller')

module.exports = function(app) {
    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
    //     )
    // })

    app.get(
        '/api/petugas/dashboard',
        [authJwt.verifyToken, authJwt.isPetugas],
        controller.getLoker
    )

    app.post(
        'api/petugas/loker/new',
        [authJwt.verifyToken, authJwt.isPetugas],
        controller.createLoker
    )

    app.delete(
        'api/petugas/loker/:id',
        [authJwt.verifyToken, authJwt.isPetugas],
        controller.editLoker
    )

    app.post
}