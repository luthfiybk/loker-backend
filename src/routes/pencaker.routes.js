const { authJwt } = require("../middleware")
const lokerController = require("../controllers/loker.controller")
const pencakerController = require("../controllers/pencaker.controller")

module.exports = function(app) {
    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
    //     )
    // })
    
    app.get(
        '/api/pencaker/dashboard',
        [authJwt.verifyToken, authJwt.isPencaker],
        lokerController.getAll
    )

    app.get(
        '/api/pencaker/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPencaker],
        lokerController.getOne
    )

    app.post(
        '/api/pencaker/loker/:idloker',
        [authJwt.verifyToken, authJwt.isPencaker],
        pencakerController.applyJob
    )
}