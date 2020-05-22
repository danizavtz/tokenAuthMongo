const db = require('../../db/index');
const ObjectId = require('mongodb').ObjectID;

exports.listUsers = (req, res) => {
    db.get().collection('user').find({}).toArray().then((users) => {
        res.status(200).json(users)
    }).catch((err) => {
        res.status(500).json({ errors: [{location: "users", msg: err, param: ""}]})
    })
}

exports.createUser = (req, res) => {
    db.get().collection('user').insertOne({ "name": req.body.name, "login": req.body.login, "password": req.body.password }).then((result) => {
        res.set('location', `/users/${result.insertedId}`)
        res.status(201).end()
    }).catch((err) => {
        res.status(500).json({ errors: [{location: "users", msg: err, param: "post"}]})
    })
}

exports.findUserById = (req, res) => {
    db.get().collection('user').findOne({ _id: new ObjectId(req.params.id) }).then((result) => {
        if (result === null) {
            return res.status(404).json({ errors: [{location: "users", msg: "Not found", param: req.params.id}]})
        }
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({ errors: [{location: "users", msg: err, param: req.params}]})
    })
}

exports.updateUserbyId = (req, res) => {
    const options = { returnOriginal: false };
    db.get().collection('user').findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: {"name": req.body.name }}, options).then((result) => {
        if (result.value === null) {
            return res.status(404).json({ errors: [{location: "users", msg: "Not found", param: req.params.id}]})
        }
        res.status(200).json(result.value);
    }).catch((err) => {
        res.status(500).json({errors: [{location: "users", msg: err, param: req.params.id}]})
    })
}

exports.deleteUserbyId = (req, res) => {
    db.get().collection('user').findOneAndDelete({_id: ObjectId(req.params.id)}).then((result) => {
        if (result.value === null) {
            return res.status(404).json({ errors: [{location: "users", msg: "Not found", param: req.params.id}]})
        }
        res.status(204).end()
    }).catch((err) => {
        res.status(500).json({ errors:[{location: "users", msg: err, param: req.params.id}]})
    })
}