const express = require("express");
const router = express.Router();
const { getUser } = require("../utils/db-read");
const jwt = require('jsonwebtoken')

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await getUser(username, password)
    if(user) {
        const accessToken = jwt.sign({username: username}, "hotel-app-123")
        res.status(200).json({ success: true, user: user, accessToken: accessToken });
    } else {
        res.status(403).json({ success: false });
    }
});

router.post("/init", async (req, res) => {
    try {
        const { token } = req.body
        const accessToken = jwt.verify(token, "hotel-app-123")
        console.log(accessToken)
        res.status(200).json({ success: true });
    } catch(err) {
        console.log("error", err.message)
        res.status(403).json({ success: false });
    }
});

module.exports = router