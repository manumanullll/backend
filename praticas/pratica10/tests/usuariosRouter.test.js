const request = require('supertest');
const app = require('../app');

describe('Recurso /usuarios', () => {
  let token;
  const emailTeste = `usuario${Date.now()}@email.com`;
  const senhaTeste = "abcd1234";

  test('POST /usuarios deve criar usuário', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ 
        email: emailTeste, 
        senha: senhaTeste 
      });
    
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(emailTeste);
  });

  test('POST /usuarios sem dados deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send();
    
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe('Email e Senha são obrigatórios');
  });

  test('POST /usuarios com email duplicado deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ 
        email: emailTeste, 
        senha: senhaTeste 
      });
    
    expect(response.status).toBe(422);
  });

  test('POST /usuarios/login deve retornar token', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ 
        usuario: emailTeste, 
        senha: senhaTeste 
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    
    token = response.body.token;
  });

  test('POST /usuarios/login sem credenciais deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send();
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Credenciais inválidas');
  });

  test('POST /usuarios/login com senha errada deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ 
        usuario: emailTeste, 
        senha: "senhaerrada" 
      });
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Credenciais inválidas');
  });

  test('POST /usuarios/login com usuário não existente deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ 
        usuario: "naoexiste@email.com", 
        senha: senhaTeste 
      });
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Credenciais inválidas');
  });

  test('POST /usuarios/renovar com token válido', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    
    token = response.body.token;
  });

  test('POST /usuarios/renovar sem autorização deve retornar erro', async () => {
    const response = await request(app)
      .post('/usuarios/renovar');
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token necessário');
  });

  test('POST /usuarios/renovar com formato de token inválido', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('Authorization', 'TokenInvalido');
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token necessário');
  });

  test('POST /usuarios/renovar com token inválido', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('Authorization', 'Bearer 123456789');
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token inválido');
  });

  test('DELETE /usuarios com token válido', async () => {
    const response = await request(app)
      .delete('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        usuario: emailTeste 
      });
    
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('DELETE /usuarios sem token deve retornar erro', async () => {
    const response = await request(app)
      .delete('/usuarios')
      .send({ 
        usuario: emailTeste 
      });
    
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token necessário');
  });

  test('DELETE /usuarios sem especificar usuário', async () => {
    const novoEmail = `teste${Date.now()}@email.com`;
    
    await request(app)
      .post('/usuarios')
      .send({ 
        email: novoEmail, 
        senha: senhaTeste 
      });

    const loginResponse = await request(app)
      .post('/usuarios/login')
      .send({ 
        usuario: novoEmail, 
        senha: senhaTeste 
      });
    
    const newToken = loginResponse.body.token;

    const response = await request(app)
      .delete('/usuarios')
      .set('Authorization', `Bearer ${newToken}`)
      .send();
    
    expect(response.status).toBe(400);
  });

  test('DELETE /usuarios com usuário inexistente', async () => {
    const response = await request(app)
      .delete('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        usuario: "naoexiste@email.com" 
      });
    
    expect(response.status).toBe(404);
  });
});