const sequelize = require('./db')
require('dotenv').config()
const express = require('express')



const PORT = process.env.PORT || 4000

const app = express()

const init = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Коннкет с бд на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

init()

app.listen(PORT, () => console.log(`Запуск сервера на порту ${PORT}`))