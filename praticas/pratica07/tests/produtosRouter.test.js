const request = require('supertest');
const app = require('../app');

describe('Recurso /produtos', () => {
    let produtoID;

    Test('POST /produtos deve criar um produto', async () => {
        const response = await request(app)
        .post('/produtos')
        .send({ nome: 'Laranja', preco: '10.0'})
        .expect(201)
        .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).tobe(10.0);

        produtoID = response.body._id;
    });

    Test('POST /produtos sem dados deve retornar erro', async () => {
        const response = await request(app)
        .post('/produtos')
        .send({})
        .expect(422)
        .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');    
    });

    test(`GET /produtos/${produtoID} deve retornar produto`, async () => {
        const response = await request(app)
        .post('/produtos')
        .send({ nome: 'Laranja', preco: '10.0'})
        .expect(201)
        .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0);

        produtoID = response.body._id;
    });

    test('Post /produtos sem dados devem retornar erro', async() => {
        const response = await request(app)
        .post('/produtos')
        .send({})
        .expect(422)
        .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    test('GET /produtos devem retornar array', async () => {
        const response = await request(app)
        .get('/produtos')
        .expect(200)
        .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test(`GET /produtos/${produtoID} deve retornar produto`, async () => {
        const response = await request(app)
        .get(`/produtos/${produtoId}`)
        .expect
    } )



});