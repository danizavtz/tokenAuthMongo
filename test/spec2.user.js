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
            const usuario = {nome: "nome1", login: "login1", senha: "123"}
            dbi.get().collection('user').insertOne(usuario).then((result) => {
                insertedUserId = result.insertedId
                done()
            })
        })
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
                expect(res.body).to.have.property('nome')
                expect(res.body.nome).equal('nome1')
                expect(res.body).to.have.property('login')
                expect(res.body.login).equal('login1')
                expect(res.body).to.have.property('senha')
                expect(res.body.senha).equal('123')
                done()
            })
        })
    })
    describe('POST', () => {
        it('Check post with success', (done) => {
            api.post('/users')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nome: "nome1",
                login: "login1",
                senha: "123"
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
        it('Check put does not exist', (done) => {
            api.put('/users/000000000000000000000000')
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nome: "nome1",
                login: "login1",
                senha: "123"
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
        it('Check put update nome with success', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nome: "nome2",
                login: "login1",
                senha: "123"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('n')
                expect(res.body.n).equal(1)
                expect(res.body).to.have.property('nModified')
                expect(res.body.nModified).equal(1)
                expect(res.body).to.have.property('ok')
                expect(res.body.ok).equal(1)
                api.get(`/users/${insertedUserId}`)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err
                   expect(res.body).to.have.property('nome')
                   expect(res.body.nome).equal('nome2')
                   expect(res.body).to.have.property('login')
                   expect(res.body.login).equal('login1')
                   expect(res.body).to.have.property('senha')
                   expect(res.body.senha).equal('123')
                   done()
                })
            })
        })
        it('Check put update login with success', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nome: "nome2",
                login: "login2",
                senha: "123"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('n')
                expect(res.body.n).equal(1)
                expect(res.body).to.have.property('nModified')
                expect(res.body.nModified).equal(1)
                expect(res.body).to.have.property('ok')
                expect(res.body.ok).equal(1)
                api.get(`/users/${insertedUserId}`)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err
                   expect(res.body).to.have.property('nome')
                   expect(res.body.nome).equal('nome2')
                   expect(res.body).to.have.property('login')
                   expect(res.body.login).equal('login2')
                   expect(res.body).to.have.property('senha')
                   expect(res.body.senha).equal('123')
                   done()
                })
            })
        })
        it('Check put update senha with success', (done) => {
            api.put(`/users/${insertedUserId}`)
            .set('Accept', 'application/json; charset=utf-8')
            .send({
                nome: "nome2",
                login: "login2",
                senha: "1234"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body).to.have.property('n')
                expect(res.body.n).equal(1)
                expect(res.body).to.have.property('nModified')
                expect(res.body.nModified).equal(1)
                expect(res.body).to.have.property('ok')
                expect(res.body.ok).equal(1)
                api.get(`/users/${insertedUserId}`)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err
                   expect(res.body).to.have.property('nome')
                   expect(res.body.nome).equal('nome2')
                   expect(res.body).to.have.property('login')
                   expect(res.body.login).equal('login2')
                   expect(res.body).to.have.property('senha')
                   expect(res.body.senha).equal('1234')
                   done()
                })
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