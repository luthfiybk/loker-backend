const db = require('../models')
const Pencaker = db.pencaker

checkDuplicateEmailOrNoKTP = async (req, res, next) => {
    try {
        let email = await Pencaker.findOne({
            where: {
                email: req.body.email
            }
        })

        if (email) {
            return res.status(400).send({ message: 'Failed Email is already in use!' })
        }

        let no_ktp = await Pencaker.findOne({
            where: {
                no_ktp: req.body.no_ktp
            }
        })

        if (no_ktp) {
            return res.status(400).send({ message: 'Failed No KTP is already in use!' })
        }

        next()
    } catch (error) {
        return res.status(500).send({ message: 'Failed! Account has been registered' })
    }
}

const verifySignUp = { checkDuplicateEmailOrNoKTP }

module.exports = verifySignUp