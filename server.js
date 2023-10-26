const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieSession({
    name: 'loker-session',
    keys: ['COOKIE_SECRET'],
    httpOnly: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const db = require('./src/models')
const Tahapan = db.tahapan
const Petugas = db.petugas
const Status = db.master_status
const Pencaker = db.pencaker

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }')
//     initial()
// })

function initial() {
    Tahapan.create({
        idtahapan: 1,
        nama: 'Seleksi Administrasi'
    })

    Tahapan.create({
        idtahapan: 2,
        nama: 'Seleksi Wawancara'
    })

    Petugas.create({
        nama: 'test',
        email: 'test@email.com',
        password: bcrypt.hashSync('test', 8)
    })

    Status.create({
        idstatus: 1,
        nama: 'Aktif'
    })

    Status.create({
        idstatus: 2,
        nama: 'Proses Seleksi'
    })

    Status.create({
        idstatus: 3,
        nama: 'Ditutup'
    })

    Pencaker.create({
        no_ktp: '1234567890',
        nama: 'Arka',
        password: bcrypt.hashSync('test', 8),
        jenis_kelamin: 'Laki-laki',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1999-01-01',
        alamat: "Jl. Jalan",
        kota: 'Jakarta',
        email: 'arka@email.com',
        no_telp: '081234567890',
        foto: 'foto',
        tgl_daftar: new Date(),
        file_ktp: 'file_ktp'
    })
}

require('./src/routes/auth.routes')(app)
require('./src/routes/pencaker.routes')(app)
require('./src/routes/petugas.routes')(app)

const PORT = 9000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} http://localhost:${PORT}`)
})