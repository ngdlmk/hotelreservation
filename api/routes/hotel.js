const express = require("express");
const router = express.Router();
const { getHotels, searchHotel } = require("../utils/db-read");

router.post("/list", async (req, res) => {
    const hotels = await getHotels()
    res.status(200).json({ success: true, hotels: hotels });
});

router.post("/search", async(req,res) => {
    console.log("search")
    const { searchTerm } = req.body
    const hotels = await searchHotel(searchTerm)
    res.status(200).json({ success: true, hotels: hotels });
})

module.exports = router