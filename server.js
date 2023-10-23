const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')

const app = express()

app.use(cors())

app.use(express.json())

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

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Database with { force: true }')
    initial()
})

function initial() {
    Tahapan.create({
        idtahapan: 1,
        nama: 'Seleksi Administrasi'
    })

    Tahapan.create({
        idtahapan: 2,
        nama: 'Seleksi Wawancara'
    })
}

require('./src/routes/auth.routes')(app)
require('./src/routes/pencaker.routes')(app)
require('./src/routes/petugas.routes')(app)

const PORT = 9000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} http://localhost:${PORT}`)
})