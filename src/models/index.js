const config = require('../config/db.config')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: config.port,
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
db.master_status = require('./master_status.model')(sequelize, Sequelize)

db.pencaker.hasMany(db.apply_loker, {
    foreignKey: 'no_ktp'
})

db.apply_loker.belongsTo(db.pencaker,{
    foreignKey: 'no_ktp',
})

db.loker.hasMany(db.apply_loker, {
    foreignKey: 'idloker',
})

db.apply_loker.belongsTo(db.loker, {
    foreignKey: 'idloker',
})

db.apply_loker.hasMany(db.tahapan_apply, {
    foreignKey: 'idapply',
})

db.tahapan_apply.belongsTo(db.apply_loker, {
    foreignKey: 'idapply',
})

db.tahapan_apply.belongsTo(db.tahapan, {
    foreignKey: 'idtahapan',
})

db.loker.belongsTo(db.master_status, {
    foreignKey: 'status',
})



// db.master_status.hasMany(db.loker, {
//     foreignKey: 'idstatus',
// })

module.exports = db