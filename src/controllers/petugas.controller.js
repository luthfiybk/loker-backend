const db = require("../models");
const Petugas = db.petugas;
const Loker = db.loker;
const ApplyLoker = db.apply_loker;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const sequelize = db.sequelize;
const tahapanApply = db.tahapan_apply;
const Pencaker = db.pencaker;

exports.createLoker = (req, res) => {
  if (!req.body.idperusahaan || !req.body.nama || !req.body.tipe || !req.body.usia_min || !req.body.usia_max || !req.body.gaji_min || !req.body.gaji_max || !req.body.nama_cp || !req.body.no_telp_cp || !req.body.deskripsi) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const loker = {
    idloker: uuidv4(),
    idperusahaan: req.body.idperusahaan,
    nama: req.body.nama,
    tipe: req.body.tipe,
    deskripsi: req.body.deskripsi,
    usia_min: req.body.usia_min,
    usia_max: req.body.usia_max,
    gaji_min: req.body.gaji_min,
    gaji_max: req.body.gaji_max,
    nama_cp: req.body.nama_cp,
    no_telp_cp: req.body.no_telp_cp,
    email_cp: req.body.email_cp,
    tgl_update: new Date(),
    tgl_aktif: new Date(),
    tgl_tutup: null,
  };

  Loker.create(loker)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Loker",
      });
    });
};

exports.dashboard = async (req, res) => {
  const query = `select 'Lowongan Pekerjaan Aktif' as kolom ,count(*) as total from lokers where status = 1 union all select 'Lowongan Pekerjaan Proses' as kolom,count(*) as total from lokers where status = 2 union all select 'Lowongan Pekerjaan Ditutup' as kolom ,count(*) as total from lokers where status = 3 union all select 'Total Laki-laki' as kolom ,count(*) as total from pencakers where jenis_kelamin = 'Laki-laki' union all select 'Total Perempuan' as kolom ,count(*) as total from pencakers where jenis_kelamin = 'Perempuan' union all select 'Total Pendaftar' as kolom ,count(*) as total from pencakers union all select 'Total Lowongan Pekerjaan' as kolom ,count(*) as total from lokers`;

  await sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting data",
      });
    });
};

exports.editLoker = (req, res) => {
  const idloker = req.params.idloker;

  Loker.update(req.body, {
    where: { idloker: idloker },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loker was updated successfully",
        });
      } else {
        res.send({
          message: `Cant update Loker with id=${idloker}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating loker with id=" + idloker,
        err: err,
      });
    });
};

exports.deleteLoker = (req, res) => {
  const idloker = req.params.idloker;

  Loker.destroy({
    where: { idloker: idloker },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete loker with id=${idloker}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete loker with id=" + idloker,
      });
    });
};

exports.getPencakerFromLoker = async (req, res) => {
  const idloker = req.params.idloker;

  const query =
    "select lokers.nama as nama_pekerjaan, pencakers.no_ktp, pencakers.kota,lokers.idperusahaan as id_perusahaan,apply_lokers.idapply, pencakers.nama as nama_pencaker, apply_lokers.tgl_apply as tanggal_apply, tahapans.nama as tahapan from tahapan_applies left join tahapans on tahapan_applies.idtahapan = tahapans.idtahapan left join apply_lokers on apply_lokers.idapply = tahapan_applies.idapply left join pencakers on apply_lokers.no_ktp = pencakers.no_ktp left join lokers on apply_lokers.idloker = lokers.idloker where apply_lokers.idloker = ?";

  await sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: [idloker],
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

exports.seleksiAdministrasi = (req, res) => {
  const idapply = req.params.idapply;
  const nilai = req.body.nilai;
  if (nilai === 1) {
    tahapanApply
      .update(
        { idtahapan: 2, nilai: 1, tgl_update: new Date() },
        {
          where: { idapply: idapply },
        }
      )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Tahapan was updated successfully",
          });
        } else {
          res.send({
            message: `Cant update tahapan with id=${idapply}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error while updating tahapan with id=" + idapply,
        });
      });
  } else if (nilai === 0) {
    tahapanApply
      .update(
        { idtahapan: 1, nilai: 0, tgl_update: new Date() },
        {
          where: { idapply: idapply },
        }
      )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Tahapan was updated successfully",
          });
        } else {
          res.send({
            message: `Cant update tahapan with id=${idapply}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error while updating tahapan with id=" + idapply,
        });
      });
  }
};

exports.seleksiWawancara = (req, res) => {
  const idapply = req.params.idapply;

  tahapanApply
    .update(
      { idtahapan: 3, tgl_update: new Date() },
      {
        where: { idapply: idapply },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tahapan was updated successfully",
        });
      } else {
        res.send({
          message: `Cant update tahapan with id=${idapply}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating tahapan with id=" + idapply,
      });
    });
};

exports.pencakerDetailFromLoker = async (req, res) => {
  const idloker= req.params.idloker;
  const no_ktp = req.params.no_ktp;

//   console.log(idloker, no_ktp, "Ini console")
  const query =
    "select apply_lokers.idloker, pencakers.no_ktp, tahapan_applies.idtahapan, pencakers.nama as nama_pencaker, pencakers.jenis_kelamin, pencakers.tempat_lahir, pencakers.tanggal_lahir, pencakers.alamat, pencakers.kota, pencakers.email, pencakers.no_telp, pencakers.foto, pencakers.file_ktp, tahapans.nama as tahapan from apply_lokers left join lokers on apply_lokers.idloker = lokers.idloker left join tahapan_applies on apply_lokers.idapply = tahapan_applies.idapply left join tahapans on tahapan_applies.idtahapan = tahapans.idtahapan left join pencakers on apply_lokers.no_ktp = pencakers.no_ktp WHERE apply_lokers.idloker = ? and apply_lokers.no_ktp = ?";

  await sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: [idloker, no_ktp],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting data with id=" + idapply,
      });
    });
};

exports.getAllPencaker = async (req, res) => {
  const query =
    "select lokers.idloker, lokers.nama as nama_pekerjaan, pencakers.nama as nama_pencaker, pencakers.no_ktp, pencakers.tempat_lahir, pencakers.kota, pencakers.foto, pencakers.file_ktp, tahapans.nama as tahapan from pencakers left join apply_lokers on pencakers.no_ktp = apply_lokers.no_ktp left join lokers on apply_lokers.idloker = lokers.idloker left join tahapan_applies on apply_lokers.idapply = tahapan_applies.idapply left join tahapans on tahapan_applies.idtahapan = tahapans.idtahapan";

  await sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting data",
      });
    });
};

exports.editPencakerStatus = async (req, res) => {
    const idloker = req.params.idloker
    const no_ktp = req.params.no_ktp

    const idtahapan = req.body.idtahapan
    const nilai = req.body.nilai

    const query = 
    'update tahapan_applies SET idtahapan = ? and nilai = ? update idapply FROM (SELECT apply_lokers.idapply FROM apply_lokers JOIN pencakers ON apply_lokers.no_ktp = pencakers.no_ktp JOIN lokers ON apply_lokers.idloker = lokers.idloker JOIN tahapan_applies ON apply_lokers.idapply = tahapan_applies.idapply JOIN tahapans ON tahapan_applies.idtahapan = tahapans.idtahapan WHERE apply_lokers.idloker = ? and apply_lokers.no_ktp = ?) AS temp)'

    await sequelize(query, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: [parseInt(idtahapan), parseInt(nilai),idloker, no_ktp]
    })
}