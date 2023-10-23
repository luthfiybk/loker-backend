const db = require('../models')
const Pencaker = db.pencaker
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Petugas = db.petugas

exports.pencakerSignUp = async (req, res) => {
    try {
        let pencaker = await Pencaker.create({
            no_ktp: req.body.no_ktp,
            nama: req.body.nama,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            foto: req.body.foto,
            file_ktp: req.body.file_ktp,
            jenis_kelamin: req.body.jenis_kelamin,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            alamat: req.body.alamat,
            kota: req.body.kota,
            no_telp: req.body.no_telp,
            tgl_daftar: new Date().now()
        })

        const result = await pencaker.save()
        console.log(result)
        if(result){
            res.status(200).send({ message: 'Pencaker was registered successfully!' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Register failed' })
    }
}

exports.petugasSignUp = async (req, res) => {
    try {
        let petugas = await Petugas.create({
            idpetugas: uuidv4(),
            nama: req.body.nama,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        const result = await petugas.save()
        console.log(result)
        if(result){
            res.status(200).send({ message: 'Petugas was registered successfully!' })
        }
    } catch (error) {
        return res.status(500).send({ message: 'Register failed' })
    }
}

exports.pencakerSignIn = async (req, res) => {
    try {
        const pencaker = await Pencaker.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!pencaker) res.status(404).send({ message: 'User Not Found' })

        const passwordIsValid = bcrypt.compareSync(req.body.password, pencaker.password)

        if(!passwordIsValid) res.status(401).send({ message: 'Invalid Password' })

        const token = jwt.sign({ no_ktp: pencaker.no_ktp }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400
        })

        req.session.token = token

        return res.status(200).send({
            no_ktp: pencaker.no_ktp,
            nama: pencaker.nama,
            email: pencaker.email,
            accessToken: token
        })
    } catch (error) {
        return res.status(500).send({ message: 'Failed to Sign In' })
    }
}

exports.petugasSignIn = async (req, res) => {
    try {
        const petugas = await Petugas.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!petugas) res.status(404).send({ message: 'User Not Found' })

        const passwordIsValid = bcrypt.compareSync(req.body.password, petugas.password)

        if(!passwordIsValid) res.status(401).send({ message: 'Invalid Password' })

        const token = jwt.sign({ idpetugas: petugas.idpetugas }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400
        }) 

        req.session.token = token

        return res.status(200).send({
            idpetugas: petugas.idpetugas,
            nama: petugas.nama,
            email: petugas.email,
            accessToken: token
        })
    } catch (error) {
        return res.status(500).send({ message: 'Failed to Sign In' })
    }
}

exports.signOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.status(500).send({ message: 'Failed to Sign Out' })
            return
        }

        res.status(200).send({ message: 'Sign Out Successfully' })
    })
}