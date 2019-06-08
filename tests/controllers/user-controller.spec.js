// 'use strict';

// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// const mock = require('../mocks/mock-user');
// const mockCredentials = require('../mocks/mock-credentials');
// const UserSchema = require('../../src/models/user');

// //Require the dev-dependencies
// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const server = require('../../src/index');

// chai.use(chaiHttp);
// chai.should();

// describe('User - /POST signup', () => {
//     beforeEach(async () => {
//         await UserSchema.remove({});
//     });

//     it('it should signup the user', (done) => {
//         let user = mock.user;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('token');
//                 done();
//             });
//     });

//     it('it should not signup the user [invalid email]', (done) => {
//         let user = mock.userWithInvalidEmail;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal(`${user.email} não é um email válido`);
//                 done();
//             });
//     });

//     it('it should not signup the user [invalid telefones.numero]', (done) => {
//         let user = mock.userWithInvalidTelefoneNumero;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal(`${user.telefones[0].numero} não é um número de telefone válido`);
//                 done();
//             });
//     });

//     it('it should not signup the user [invalid telefones.ddd]', (done) => {
//         let user = mock.userWithInvalidTelefoneDDD;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal(`${user.telefones[0].ddd} não é um número de ddd válido`);
//                 done();
//             });
//     });

//     it('it should not signup the user [missing email]', (done) => {
//         let user = mock.userWithoutEmail;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('email é um campo obrigatório');
//                 done();
//             });
//     });

//     it('it should not signup the user [missing nome]', (done) => {
//         let user = mock.userWithoutNome;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('nome é um campo obrigatório');
//                 done();
//             });
//     });

//     it('it should not signup the user [missing senha]', (done) => {
//         let user = mock.userWithoutSenha;
//         chai.request(server).post('/signup')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('senha é um campo obrigatório');
//                 done();
//             });
//     });

//     it('it should not signup the user [duplicated email]', (done) => {
//         (async () => {
//             let user = new UserSchema(mock.user);
//             await user.save();
//             chai.request(server).post('/signup')
//                 .send(mock.user)
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('mensagem');
//                     chai.expect(res.body.mensagem).to.equal('email já existente');
//                     done();
//                 });
//         })();
//     });
// });

// describe('User - /POST signin', () => {
//     before(async () => {
//         await UserSchema.remove({});
//         let user = new UserSchema(mock.user);
//         await user.save();
//     });

//     it('it should signin the user', (done) => {
//         let credentials = mockCredentials.credentials;
//         chai.request(server).post('/signin')
//             .send(credentials)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('token');
//                 done();
//             });
//     });

//     it('it should not signin the user [email not registered]', (done) => {
//         let credentials = mockCredentials.credentialsWithNotRegisteredEmail;
//         chai.request(server).post('/signin')
//             .send(credentials)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('Usuário e/ou senha inválidos');
//                 done();
//             });
//     });

//     it('it should not signin the user [senha not registered]', (done) => {
//         let credentials = mockCredentials.credentialsWithNotRegisteredSenha;
//         chai.request(server).post('/signin')
//             .send(credentials)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('Usuário e/ou senha inválidos');
//                 done();
//             });
//     });

//     it('it should not signin the user [missing email]', (done) => {
//         let credentials = mockCredentials.credentialsWithoutEmail;
//         chai.request(server).post('/signin')
//             .send(credentials)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('Usuário e/ou senha inválidos');
//                 done();
//             });
//     });

//     it('it should not signin the user [missing senha]', (done) => {
//         let credentials = mockCredentials.credentialsWithoutSenha;
//         chai.request(server).post('/signin')
//             .send(credentials)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 chai.expect(res.body.mensagem).to.equal('Usuário e/ou senha inválidos');
//                 done();
//             });
//     });

// });

// describe('User - /GET user/:id', () => {
//     let savedUser = {};
//     beforeEach(async () => {
//         await UserSchema.remove({});
//         let user = new UserSchema(mock.user);
//         savedUser = await user.save();
//     });

//     it('it should get the user', (done) => {
//         chai.request(server).get('/user/' + savedUser.id)
//             .set('Authorization', 'bearer ' + savedUser.token)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('token');
//                 done();
//             });
//     });

//     it('it should not get the user [non-existent user identifier]', (done) => {
//         chai.request(server).get('/user/59fbe35bec7e52694012da9b')
//             .set('Authorization', 'bearer ' + savedUser.token)
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 done();
//             });
//     });

//     it('it should not get the user [different user identifier]', (done) => {
//         (async () => {
//             let user = new UserSchema(mock.anotherUser);
//             user = await user.save();
//             chai.request(server).get('/user/' + user.id)
//                 .set('Authorization', 'bearer ' + savedUser.token)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('mensagem');
//                     done();
//                 });
//         })();
//     });

//     it('it should not get the user [different user token]', (done) => {
//         (async () => {
//             let user = new UserSchema(mock.anotherUser);
//             user = await user.save();
//             chai.request(server).get('/user/' + savedUser.id)
//                 .set('Authorization', 'bearer ' + user.token)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('mensagem');
//                     done();
//                 });
//         })();
//     });

//     it('it should not get the user [invalid user identifier]', (done) => {
//         chai.request(server).get('/user/invalid')
//             .set('Authorization', 'bearer ' + savedUser.token)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 done();
//             });
//     });

//     it('it should not get the user [missing Authorization token]', (done) => {
//         chai.request(server).get('/user/' + savedUser.id)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('mensagem');
//                 done();
//             });
//     });

// });