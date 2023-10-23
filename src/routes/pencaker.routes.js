const { authJwt } = require("../middleware")
const controller = require("../controllers/pencaker.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        )
    })
    
    app.get(
        '/api/pencaker/dashboard',
        [authJwt.verifyToken, authJwt.isPencaker],
        controller.isPencaker
    )
}