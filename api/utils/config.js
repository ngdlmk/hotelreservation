const MongoClient = require('mongodb').MongoClient
const DB_PATH = 'mongodb+srv://ngdlmk:md8ntxyc2m@ngdlmk-dev-p50il.mongodb.net/sample_airbnb?retryWrites=true&w=majority'

function MongoDao() {
    const options = {
        useNewUrlParser: true
    };
    const mongoClient = new MongoClient(DB_PATH, options);

    return new Promise(function(resolve, reject) {
        mongoClient.connect(function(err, client) {
            resolve(client);
        });
    });
}

exports.MongoDao = MongoDao