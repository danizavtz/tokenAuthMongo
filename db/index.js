const MongoClient = require('mongodb').MongoClient;

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = `${process.env.MONGOHOST}:${process.env.MONGOPORT}`

// Database Name
let dbinstance;

// Use connect method to connect to the server
module.exports = {
    connectInstance: (callback) => {
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        console.log("Connected successfully to mongo database instance");
        dbinstance = client.db(process.env.MONGONAME);
        return callback (err);
        })
    },
    getDb: () => {
        return dbinstance;
    }
}