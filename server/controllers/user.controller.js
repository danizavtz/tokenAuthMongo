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

exports.findUserById = (req, res, next) => {
    db.get().collection('user').findOne({ _id: new ObjectId(req.params.id) }).then((result) => {
        if (result === null) {
            res.status(404).json({ errors: [{location: "users", msg: "Not found", param: req.params.id}]})
        }
        req.usuario = result;
        next()
    }).catch((err) => {
        res.status(500).json({ errors: [{location: "users", msg: err, param: req.params}]})
    })
}

exports.getUserById = (req, res) => {
    res.status(200).json(req.usuario)
}

exports.updateUserbyId = (req, res) => {
    db.get().collection('user').updateOne({_id: ObjectId(req.usuario._id)}, {$set: {"name": req.body.name }}).then((result) => {
        res.status(200).json(result.result);
    }).catch((err) => {
        res.status(500).json({errors: [{location: "users", msg: err, param: req.usuario._id}]})
    })
}

exports.deleteUserbyId = (req, res) => {
    db.get().collection('user').deleteOne({_id: ObjectId(req.usuario._id)}).then((result) => {
        res.status(204).end()
    }).catch((err) => {
        res.status(500).json({ errors:[{location: "users", msg: err, param: req.usuario._id}]})
    })
}