const { MongoDao } = require('./config')

function getHotels() {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("listingsAndReviews")
            const hotels = await col.find().limit(10).toArray()
            resolve(hotels)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

function getUser(username, password) {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("users")
            const user = await col.findOne({username, password})
            resolve(user)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

function getReservations() {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("reservations")
            const reservations = await col.find().toArray()
            resolve(reservations)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

function searchHotel(searchTerm) {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("listingsAndReviews")
            const hotels = await col.find({name: {$regex: new RegExp(searchTerm)}}).limit(10).toArray()
            resolve(hotels)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

exports.getHotels = getHotels
exports.getUser = getUser
exports.getReservations = getReservations
exports.searchHotel = searchHotel