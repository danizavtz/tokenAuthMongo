const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.MONGOHOST}:${process.env.MONGOPORT}/?directConnection=true`
let dbinstance;

// Use connect method to connect to the server
connect = (callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        dbinstance = client.db(process.env.MONGONAME);
        callback (err);
    })
}

get = () => {
    return dbinstance;
}

module.exports = {
    connect,
    get
}