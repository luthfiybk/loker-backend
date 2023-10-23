const config = require('../config/db.config')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: config.PORT,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.pencaker = require('./pencaker.model')(sequelize, Sequelize)
db.petugas = require('./petugas.model')(sequelize, Sequelize)
db.tahapan = require('./tahapan.model')(sequelize, Sequelize)
db.tahapan_apply = require('./tahapan_apply.model')(sequelize, Sequelize)
db.loker = require('./loker.model')(sequelize, Sequelize)
db.apply_loker = require('./apply_loker.model')(sequelize, Sequelize)

db.apply_loker.belongsTo(db.pencaker,{
    foreignKey: 'no_ktp',
})

db.apply_loker.belongsTo(db.loker, {
    foreignKey: 'idloker',
})

db.tahapan_apply.belongsTo(db.apply_loker, {
    foreignKey: 'idapply',
})

db.tahapan_apply.belongsTo(db.tahapan, {
    foreignKey: 'idtahapan',
})

module.exports = db