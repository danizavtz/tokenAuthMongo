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
})