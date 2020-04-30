const { MongoDao } = require('./config')

function addReservation(reservation) {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("reservations")
            const hotels = await col.insertOne(reservation)
            resolve(hotels)
            conn.close()
        } catch (error) {
            reject({error: "unknown error"})
        }
    })
}
exports.addReservation = addReservation