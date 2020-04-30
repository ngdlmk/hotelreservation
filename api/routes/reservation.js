const express = require("express");
const router = express.Router();
const { codeGenerator } = require('../utils')
const { addReservation } = require('../utils/db-insert')
const { getReservations } = require('../utils/db-read')
const { updateApprove } = require('../utils/db-update')

router.post("/add", async (req, res) => {
    const {
        checkInDate,
        checkOutDate,
        name,
        surname,
        phoneNumber,
        email,
        hotelName
    } = req.body

    const newReserv = {
        reservationCode: codeGenerator(),
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        email: email,
        hotelName: hotelName,
        approved: false,
        createdAt: new Date()
    }

    await addReservation(newReserv)
    res.status(200).json({ success: true });
});

router.post('/list', async(req, res) => {
    const reservations = await getReservations()
    res.status(200).json({ success: true, reservations: reservations });
})

router.post('/approve', async(req, res) => {
    console.log("approve")
    const { reservationCode } = req.body
    await updateApprove(reservationCode)
    res.status(200).json({ success: true });
})

module.exports = router