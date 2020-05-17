require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const url = `${process.env.MONGOHOST}:${process.env.MONGOPORT}`

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw err
    }
    console.log('Seeding database');
    const password = '#@!thisismysupersecureadminpasswordanditshouldbekeepinsecret!@#'
    crypto.scrypt(password, 'salt', parseInt(process.env.SCRYPTPARAM), (err, derivedKey) => {
        if (err) {
            throw err
        }
        const user = { name: 'me', login: 'admin', password: derivedKey.toString('hex') }
        const dbinstance = client.db(process.env.MONGODATABASENAME);
        dbinstance.collection('user').insertOne(user).then((result) => {
            console.log(result.insertedId)
            client.close()
        }).catch((err) => {
            console.log(err)
            client.close()
        })
    });
});