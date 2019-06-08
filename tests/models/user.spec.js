// 'use strict';

// process.env.NODE_ENV = 'test';

// const mock = require('../mocks/mock-user');
// const UserSchema = require('../../src/models/user');

// const chai = require('chai');

// chai.should();

// describe('User - Schema validation', () => {
//     beforeEach(async () => {
//         await UserSchema.remove({});
//     });
    
//     afterEach(async () => {
//         await UserSchema.remove({});
//     });
//     it('it should be valid user', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.user);
//                 let validate = await user.validate();
//                 chai.expect(validate).to.be.an('undefined');
//                 done();
//             } catch (error) {
//                 done(error);
//             }
//         })();
//     });

//     it('it should be an invalid user [invalid field - email]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithInvalidEmail);
//                 await user.validate();
//                 done(new Error('Validate UserSchema email is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors.email).to.exist;
//                 done();
//             }
//         })();
//     });

//     it('it should be an invalid user [invalid field - telefone.numero]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithInvalidTelefoneNumero);
//                 await user.validate();
//                 done(new Error('Validate UserSchema telefone.numero is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors['telefones.0.numero']).to.exist;
//                 done();
//             }
//         })();
//     });

//     it('it should be an invalid user [invalid field - telefone ddd]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithInvalidTelefoneDDD);
//                 await user.validate();
//                 done(new Error('Validate UserSchema telefone.ddd is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors['telefones.0.ddd']).to.exist;
//                 done();
//             }
//         })();
//     });

//     it('it should be an invalid user [missing field - email]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithoutEmail);
//                 await user.validate();
//                 done(new Error('Validate UserSchema email is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors.email).to.exist;
//                 done();
//             }
//         })();
//     });

//     it('it should be an invalid user [missing field - nome]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithoutNome);
//                 await user.validate();
//                 done(new Error('Validate UserSchema nome is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors.nome).to.exist;
//                 done();
//             }
//         })();
//     });

//     it('it should be an invalid user [missing field - senha]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.userWithoutSenha);
//                 await user.validate();
//                 done(new Error('Validate UserSchema senha is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors.senha).to.exist;
//                 done();
//             }
//         })();

//     });

//     it('it should be an invalid user [duplicated field - email]', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.user);
//                 await user.save();

//                 let anotherUser = new UserSchema(mock.user);
//                 await anotherUser.save();
//                 done(new Error('Validate UserSchema unique email is not working properly'));
//             } catch (error) {
//                 chai.expect(error.errors.email).to.exist;
//                 done();
//             }
//         })();
//     });

// });

// describe('User - Schema password validation', () => {
//     beforeEach(async () => {
//         await UserSchema.remove({});
//     });

//     it('it should match password', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.user);
//                 await user.save();

//                 let validPassword = await user.comparePassword(mock.user.senha);
//                 chai.expect(validPassword).to.be.a('boolean');
//                 chai.expect(validPassword).to.be.true;
//                 done();
//             } catch (error) {
//                 done(error);
//             }
//         })();
//     });

//     it('it should not match password', (done) => {
//         (async () => {
//             try {
//                 let user = new UserSchema(mock.user);
//                 await user.save();

//                 let validPassword = await user.comparePassword('not match');
//                 chai.expect(validPassword).to.be.a('boolean');
//                 chai.expect(validPassword).to.be.false;
//                 done();
//             } catch (error) {
//                 done(error);
//             }
//         })();
//     });

// });