process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');
      app.listen();
const api = supertest(app)
const dbi = require('../db/index')
let insertedUserId = null

describe('#User', () => {
    before((done) => {
        dbi.connect(()=> {
            const usuario = {name: "nome1", login: "login1", password: "123"}
            dbi.get().collection('user').insertOne(usuario).then((result) => {
                insertedUserId = result.insertedId
                done()
            })
        })
    })
    after((done) => {
        dbi.get().collection('user').deleteMany()//clear collateral effects
        done()
    })
    describe('GET', () => {
        it('Check fallback route exist', (done) => {
            api.get('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.be.an('array')
                done()
            })
        })
        it('Check get by id does not exist', (done) => {
            api.get('/users/000000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0].msg).equal('Not found')
                done()
            })
        })
        it('Check get by id with success', (done) => {
            api.get(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('name')
                expect(res.body.name).equal('nome1')
                expect(res.body).to.have.property('login')
                expect(res.body.login).equal('login1')
                expect(res.body).to.have.property('password')
                expect(res.body.password).equal('123')
                done()
            })
        })
    })
    describe('POST', () => {
        it('Check post validation key name exists', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nam: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it('Check post validation value name is empty', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it('Check post validation value name is null', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: null,
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it('Check post validation key login exists', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                logi: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('login is required')
                done()
            })
        })
        it('Check post validation value login is empty', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                login: "",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('login is required')
                done()
            })
        })
        it('Check post validation value login is null', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                login: null,
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('login is required')
                done()
            })
        })
        it('Check post validation key password exists', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                login: "asdasdadsa",
                passwor: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('password is required')
                done()
            })
        })
        it('Check post validation value password empty', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                login: "asdasdadasd",
                password: ""
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('password is required')
                done()
            })
        })
        it('Check post validation value password null', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "asdadad",
                login: "asdsaddssadas",
                password: null
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('password is required')
                done()
            })
        })
        it('Check post with success', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.header).to.have.property('location')
                expect(res.header.location).not.equal(null)
                done()
            })
        })
    })
    describe('PUT', () => {
        it('Check put validation error in params length lesser then 24 characters', (done) => {
            api.put('/users/00000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('id must be an hexadecimal (0 to F) with 24 characters')
                done()
            })
        })
        it('Check put validation error in params length greater then 24 characters', (done) => {
            api.put('/users/00000000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('id must be an hexadecimal (0 to F) with 24 characters')
                done()
            })
        })
        it('Check put does not exist', (done) => {
            api.put('/users/000000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('Not found')
                done()
            })
        })
        it('Check put key name exists', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nam: "nome1",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it('Check put value name is empty', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "",
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it('Check put value name is null', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: null,
                login: "login1",
                password: "123"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('name is required')
                done()
            })
        })
        it.skip('Check put update nome with success', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome2",
                login: "login1",
                password: "123"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('name')
                expect(res.body.name).equal('nome2')
                expect(res.body).to.have.property('login')
                expect(res.body.login).equal('login1')
                expect(res.body).to.have.property('password')
                expect(res.body.password).equal('123')
                done()
            })
        })
        it('Check put update login must not work', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome2",
                login: "login2",
                password: "123"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                expect(res.body).to.have.property('name')
                expect(res.body.name).equal('nome2')
                expect(res.body).to.have.property('login')
                expect(res.body.login).equal('login1')
                expect(res.body).to.have.property('password')
                expect(res.body.password).equal('123')
                done()
            })
        })
        it('Check put update senha must not update password', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                name: "nome2",
                login: "login2",
                password: "1234"
            })
            .expect(200)
            .end((err, res) => {                
                if (err) throw err
                expect(res.body).to.have.property('name')
                expect(res.body.name).equal('nome2')
                expect(res.body).to.have.property('login')
                expect(res.body.login).equal('login1')
                expect(res.body).to.have.property('password')
                expect(res.body.password).equal('123')
                done()
            })
        })
    })
    describe('DELETE', () => {
        it('Check delete not found', (done) => {
            api.delete('/users/000000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if(err) throw err
                expect(res.status).equal(404)
                done()
            })
        })
        it('Check delete with success', (done) => {
            api.delete(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .expect(204)
            .end((err, res) => {
                if(err) throw err
                expect(res.status).equal(204)
                done()
            })
        })
    })
})