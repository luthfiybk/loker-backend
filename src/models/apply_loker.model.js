module.exports = (sequelize, Sequlize) => {
    const ApplyLoker = sequelize.define('apply_loker', {
        idapply: {
            type: Sequlize.STRING,
            defaultValue: Sequlize.UUIDv4,
            primaryKey: true
        },
        no_ktp: {
            type: Sequlize.STRING
        },
        tgl_apply: {
            type: Sequlize.DATE
        },
    })

    return ApplyLoker
}