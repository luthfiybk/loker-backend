module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'loker',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 30 detik
        idle: 10000 // 10 detik
    }
}