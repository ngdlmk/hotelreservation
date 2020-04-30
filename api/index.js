const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const reservationRoutes = require('./routes/reservation')
const hotelRoutes = require('./routes/hotel')
const authRoutes = require('./routes/auth')

var port = process.env.PORT || 9000;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyParser.json());
app.use(express.json());

app.use('/reservation', reservationRoutes)
app.use('/hotel', hotelRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log("server is running")
})