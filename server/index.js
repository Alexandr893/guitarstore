require('dotenv').config()
const express = require('express')
const sequelize = require('./db')




const PORT = process.env.PORT || 4000

const app = express()

const init = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Коннект с бд на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

init()

