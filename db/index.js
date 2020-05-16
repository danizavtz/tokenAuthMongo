const MongoClient = require('mongodb').MongoClient;
const url = `${process.env.MONGOHOST}:${process.env.MONGOPORT}`
let dbinstance;

// Use connect method to connect to the server
connect = (callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        console.log("Connected successfully to mongo database instance");
        dbinstance = client.db(process.env.MONGONAME);
        callback (err);
    })
}

get = () => {
    return dbinstance;
}

close = () => {
    return dbinstance.close();
}

module.exports = {
    connect,
    get,
    close
}