module.exports = (sequelize, Sequlize) => {
    const tahapanApply = sequelize.define('tahapan_apply', {
        nilai: {
            type: Sequlize.INTEGER
        },
        tgl_update: {
            type: Sequlize.DATE
        }
    })

    return tahapanApply
}