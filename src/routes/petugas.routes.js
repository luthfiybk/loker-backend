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
        controller.isPetugas
    )
}