const { authJwt } = require("../middleware");
const petugasController = require("../controllers/petugas.controller");
const lokerController = require("../controllers/loker.controller");
// const http = require('http')
const router = require("express").Router();

module.exports = function (app) {
  // app.use(function(req, res, next) {
  //     res.header(
  //         "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
  //     )
  // })

  //Get Dashboard
    app.get("/api/petugas/dashboard", 
    petugasController.dashboard);

  //Get All Loker
    app.get(
        "/api/petugas/loker",
        // [authJwt.verifyToken, authJwt.isPetugas],
        lokerController.getAll
    );

  //Get Loker Detail
  app.get(
    "/api/petugas/loker/:idloker",
    // [authJwt.verifyToken, authJwt.isPetugas],
    lokerController.getOne
  );

  //Post New Loker
  app.post(
    "/api/petugas/loker",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.createLoker
  );

  //Delete Selected Loker
  app.delete(
    "/api/petugas/loker/:idloker",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.deleteLoker
  );

  //Get Pencaker List From Selected Loker
  app.get(
    "/api/petugas/loker/:idloker/apply",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.getPencakerFromLoker
  );

  //Get Pencaker Detail From Selected Loker
  app.get(
    "/api/petugas/loker/:idloker/apply/:no_ktp",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.pencakerDetailFromLoker
  );

  //Get All Pencaker
  app.get(
    "/api/petugas/pencaker",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.getAllPencaker
  );

  //Edit Loker
  app.put(
    "/api/petugas/loker/:idloker/edit",
    // [authJwt.verifyToken, authJwt.isPetugas],
    petugasController.editLoker
  );

  //Edit Pencaker
    app.put(
        "/api/petugas/pencaker/:no_ktp/edit",
        // [authJwt.verifyToken, authJwt.isPetugas],
        petugasController.editPencakerStatus
    );
};
