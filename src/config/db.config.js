module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    PORT: 8889,
    DB: 'loker',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 30 detik
        idle: 10000 // 10 detik
    }
}