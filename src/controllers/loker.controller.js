const db = require("../models");
const Loker = db.loker;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.getAll = (req, res) => {
    const status = req.query;
    console.log(status.status, "Ini console filter status");

    if(status.status === 'Semua') {
        Loker.findAll({
            attributes: ["idloker", "idperusahaan", [sequelize.literal("loker.nama"), "nama_pekerjaan"], "tipe", "deskripsi", "nama_cp", "no_telp_cp", "email_cp", [sequelize.col("master_status.nama"), "status"]],
            include: [
            {
                model: db.master_status,
                attributes: [],
            },
            ],
            order: [["idperusahaan", "ASC"]],
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error getting data",
            });
        });
    } else {
        Loker.findAll({
            attributes: ["idloker", "idperusahaan", [sequelize.literal("loker.nama"), "nama_pekerjaan"], "tipe", "deskripsi", "nama_cp", "no_telp_cp", "email_cp", [sequelize.col("master_status.nama"), "status"]],
            include: [
            {
                model: db.master_status,
                attributes: [],
            },
            ],
            order: [["idperusahaan", "ASC"]],
            where: {
                'status': {
                    [Op.eq]: status.status
                }
            }
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error getting data",
            });
        });
    }
};

exports.getAllByFilter = async (req, res) => {
  const filter = req.query;
  console.log(filter, "Ini console filter status");

  const query =
    "select lokers.idloker, lokers.idperusahaan, lokers.nama as nama_pekerjaan, lokers.tipe, lokers.deskripsi, lokers.nama_cp, lokers.no_telp_cp, master_statuses.nama as status from lokers left join master_statuses on lokers.status = master_statuses.idstatus where status = ?";

  await sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: [parseInt(filter.status)],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while getting data",
      });
    });
};

exports.getOne = (req, res) => {
  const idloker = req.params.idloker;

  Loker.findByPk(idloker, {
    attributes: [
      "idloker",
      "idperusahaan",
      [sequelize.literal("loker.nama"), "nama_pekerjaan"],
      "tipe",
      "deskripsi",
      "usia_min",
      "usia_max",
      "gaji_min",
      "gaji_max",
      "nama_cp",
      "no_telp_cp",
      "email_cp",
      "tgl_update",
      "tgl_aktif",
      "tgl_tutup",
      [sequelize.col("master_status.nama"), "status"],
    ],
    include: [
      {
        model: db.master_status,
        attributes: [],
        eager: false,
      },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting data with id=" + idloker,
      });
    });
};
