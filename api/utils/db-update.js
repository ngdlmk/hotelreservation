const { MongoDao } = require('./config')

function updateToken(token, username) {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("users")
            const result = await col.updateOne({username}, {$set: {token: token}})
            resolve(result)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

function updateApprove(code) {
    return new Promise(async (resolve) => {
        try {
            const conn = await MongoDao()
            const col = conn.db("sample_airbnb").collection("reservations")
            const result = await col.updateOne({reservationCode: code}, {$set: {approved: true}})
            resolve(result)
            conn.close()
        } catch(err) {
            console.log(err)
        }
    })
}

exports.updateToken = updateToken
exports.updateApprove = updateApprove