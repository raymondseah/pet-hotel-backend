require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;


app.use(express.urlencoded({
    extended: true
}))


app.listen(process.env.PORT || port, () => {
    console.log(`Pet Hotel App on port: ${port}`)
})
