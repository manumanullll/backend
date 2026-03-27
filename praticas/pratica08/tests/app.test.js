const request = require('supertest');
const app = require('../app');

describe('API REST Tests', () => {
  let token;
  let novoToken;

  // Teste 1: GET /produtos sem token
  test('GET /produtos sem token deve retornar 401', async () => {
    const response = await request(app)
      .get('/produtos')
      .expect(401)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  // Teste 2: GET /produtos com token inválido
  test('GET /produtos com token inválido deve retornar 401', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', '123456789')
      .expect(401)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  // Teste 3: POST /usuarios/login
  test('POST /usuarios/login deve retornar token', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({
        usuario: 'email@exemplo.com',
        senha: 'abcd1234'
      })
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // Teste 4: GET /produtos com token válido
  test('GET /produtos com token válido deve retornar 200', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // Teste 5: POST /usuarios/renovar
  test('POST /usuarios/renovar deve retornar novo token', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('token');
    novoToken = response.body.token;
  });

  // Teste 6: GET /produtos com novo token
  test('GET /produtos com novo token deve retornar 200', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', novoToken)
      .expect(200)
      .expect('Content-Type', /json/);
  });
});