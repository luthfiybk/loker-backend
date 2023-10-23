module.exports = (sequelize, Sequlize) => {
    const Tahapan = sequelize.define('tahapan', {
        idtahapan: {
            type: Sequlize.INTEGER,
            primaryKey: true
        },
        nama: {
            type: Sequlize.STRING
        }
    })

    return Tahapan
}