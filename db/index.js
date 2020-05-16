const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
//const url = 'mongodb://localhost:27017';
const url = `${process.env.MONGOHOST}:${process.env.MONGOPORT}`
 
// Database Name
const dbName = process.env.MONGONAME;
 
// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true}, function(err, client) {
  if (err) {
      throw err;
  }
  console.log("Connected successfully to mongo database instance");
 
  const dbinstance = client.db(dbName);
  global.db =  dbinstance;

  //export to global var
});