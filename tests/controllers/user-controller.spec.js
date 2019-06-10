require('jest');
require('dotenv').config();
const request = require('supertest');
const app = require('../../src/app');
const UserSchema = require('../../src/models/user');
const mockUser = require('../mocks/mock-user');
const mockCredentials = require('../mocks/mock-credentials');
const connection = require('../../src/config/connection');

process.env.NODE_ENV = 'test';

describe('User Controller', () => {
  describe('SignUp', () => {
    beforeEach(async () => {
      await connection.generate();
      await UserSchema.deleteMany({});
    });

    it('it should signup the user', (done) => {
      const user = mockUser.anotherUser;
      request(app)
        .post('/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).toBe(200);
          expect(response.body.id).not.toBeNull();
          expect(response.body.createdAt).not.toBeNull();
          expect(response.body.updatedAt).not.toBeNull();
          expect(response.body.ultimo_login).not.toBeNull();
          expect(response.body.token).not.toBeNull();
          done();
        });
    });

    it('it should not signup the user [invalid email]', (done) => {
      const user = mockUser.userWithInvalidEmail;
      request(app)
        .post('/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).toBe(400);
          expect(response.body.message)
            .toEqual(`${user.email} não é um email válido`);
          done();
        });
    });

    // it('it should not signup the user [invalid telefones.numero]', (done) => {
    //   const user = mockUser.userWithInvalidTelefoneNumero;
    //   request(app)
    //     .post('/signup')
    //     .send(user)
    //     .end((err, response) => {
    //       expect(response.status).toBe(400);
    //       expect(response.body.message).not.toBeNull();
    //       expect(response.body.message)
    //         .toEqual(`${user.telefones[0].numero} não é um número de telefone válido`);
    //       done();
    //     });
    // });

    // it('it should not signup the user [invalid telefones.ddd]', (done) => {
    //   const user = mockUser.userWithInvalidTelefoneDDD;
    //   request(app)
    //     .post('/signup')
    //     .send(user)
    //     .end((err, response) => {
    //       expect(response.status).toBe(400);
    //       expect(response.body.message).not.toBeNull();
    //       expect(response.body.message)
    //         .toEqual(`${user.telefones[0].ddd} não é um número de ddd válido`);
    //       done();
    //     });
    // });

    // it('it should not signup the user [invalid nome]', (done) => {
    //   const user = mockUser.userWithoutNome;
    //   request(app)
    //     .post('/signup')
    //     .send(user)
    //     .end((err, response) => {
    //       expect(response.status).toBe(400);
    //       expect(response.body.message).not.toBeNull();
    //       expect(response.body.message)
    //         .toEqual('nome é um campo obrigatório');
    //       done();
    //     });
    // });

    // it('it should not signup the user [missing senha]', (done) => {
    //   const user = mockUser.userWithoutSenha;
    //   request(app)
    //     .post('/signup')
    //     .send(user)
    //     .end((err, response) => {
    //       expect(response.status).toBe(400);
    //       expect(response.body.message).not.toBeNull();
    //       expect(response.body.message)
    //         .toEqual('senha é um campo obrigatório');
    //       done();
    //     });
    // });

    it('it should not signup the user [duplicated email]', (done) => {
      (async () => {
        const user = new UserSchema(mockUser.anotherUser);
        await user.save();
        request(app)
          .post('/signup')
          .send(mockUser.anotherUser)
          .end((err, response) => {
            expect(response.status).toBe(409);
            expect(response.body.message).not.toBeNull();
            expect(response.body.message).toEqual('E-mail já existente');
            done();
          });
      })();
    });
  });

  describe('SignIn', () => {
    beforeAll(async () => {
      await connection.generate();
    });

    beforeEach(async () => {
      await UserSchema.deleteMany({});
      const user = new UserSchema(mockUser.user);
      await user.save();
    });
    it('it should signin the user', (done) => {
      const { credentials } = mockCredentials;
      request(app)
        .post('/signin')
        .send(credentials)
        .end((err, response) => {
          expect(response.status).toBe(200);
          expect(response.body.id).not.toBeNull();
          expect(response.body.createdAt).not.toBeNull();
          expect(response.body.updatedAt).not.toBeNull();
          expect(response.body.ultimo_login).not.toBeNull();
          expect(response.body.token).not.toBeNull();
          done();
        });
    });

    it('it should not signin the user [email not registered]', (done) => {
      const credentials = mockCredentials.credentialsWithNotRegisteredEmail;
      request(app)
        .post('/signin')
        .send(credentials)
        .end((err, response) => {
          expect(response.status).toBe(401);
          expect(response.body.message).not.toBeNull();
          expect(response.body.message).toEqual('Usuário e/ou senha inválidos');
          done();
        });
    });

    it('it should not signin the user [senha not registered]', (done) => {
      const credentials = mockCredentials.credentialsWithNotRegisteredSenha;
      request(app)
        .post('/signin')
        .send(credentials)
        .end((err, response) => {
          expect(response.status).toBe(401);
          expect(response.body.message).not.toBeNull();
          expect(response.body.message).toEqual('Usuário e/ou senha inválidos');
          done();
        });
    });

    it('it should not signin the user [missing email]', (done) => {
      const credentials = mockCredentials.credentialsWithoutEmail;
      request(app)
        .post('/signin')
        .send(credentials)
        .end((err, response) => {
          expect(response.status).toBe(401);
          expect(response.body.message).not.toBeNull();
          expect(response.body.message).toEqual('Usuário e/ou senha inválidos');
          done();
        });
    });

    it('it should not signin the user [missing senha]', (done) => {
      const credentials = mockCredentials.credentialsWithoutSenha;
      request(app)
        .post('/signin')
        .send(credentials)
        .end((err, response) => {
          expect(response.status).toBe(401);
          expect(response.body.message).not.toBeNull();
          expect(response.body.message).toEqual('Usuário e/ou senha inválidos');
          done();
        });
    });
  });

  describe('User - /GET user/:id', () => {
    let savedUser = {};
    beforeEach(async () => {
      await UserSchema.remove({});
      const user = new UserSchema(mockUser.user);
      savedUser = await user.save();
    });

    it('it should get the user', (done) => {
      request(app)
        .get(`/user/${savedUser.id}`)
        .set('Authorization', `bearer ${savedUser.token}`)
        .end((err, response) => {
          expect(response.status).toBe(200);
          expect(response.body.token).not.toBeNull();
          done();
        });
    });

    it('it should not get the user [non-existent user identifier]', (done) => {
      request(app)
        .get('/user/59fbe35bec7e52694012da9b')
        .set('Authorization', `bearer ${savedUser.token}`)
        .end((err, response) => {
          expect(response.status).toBe(404);
          expect(response.body.message).not.toBeNull();
          done();
        });
    });

    it('it should not get the user [different user identifier]', (done) => {
      (async () => {
        let user = new UserSchema(mockUser.anotherUser);
        user = await user.save();
        request(app)
          .get(`/user/${user.id}`)
          .set('Authorization', `bearer ${savedUser.token}`)
          .end((err, response) => {
            expect(response.status).toBe(401);
            expect(response.body.message).not.toBeNull();
            done();
          });
      })();
    });

    it('it should not get the user [different user token]', (done) => {
      (async () => {
        let user = new UserSchema(mockUser.anotherUser);
        user = await user.save();
        request(app)
          .get(`/user/${user.id}`)
          .set('Authorization', `bearer ${savedUser.token}`)
          .end((err, response) => {
            expect(response.status).toBe(401);
            expect(response.body.message).not.toBeNull();
            done();
          });
      })();
    });

    it('it should not get the user [missing Authorization token]', (done) => {
      request(app)
        .get(`/user/${savedUser.id}`)
        .end((err, response) => {
          expect(response.status).toBe(401);
          expect(response.body.message).not.toBeNull();
          done();
        });
    });
  });
});
