
require('jest');
require('dotenv').config();
const mockUser = require('../mocks/mock-user');
const UserSchema = require('../../src/models/user');
const connection = require('../../src/config/connection');

process.env.NODE_ENV = 'test';
let conn;

describe('User Schema', () => {
  beforeAll(async () => {
    conn = await connection.generate();
    await UserSchema.deleteMany({});
  });

  afterAll(async () => {
    await UserSchema.deleteMany({});
    await conn.close();
    await conn.db.close();
  });

  describe('Validation schema', () => {
    it('it should is valid user', async () => {
      const user = new UserSchema(mockUser.user);

      const validate = await user.validate();

      expect(undefined).toEqual(validate);
    });

    it('it should be an invalid user [invalid field - email]', async () => {
      const user = new UserSchema(mockUser.userWithInvalidEmail);
      await expect(user.validate()).rejects.toThrow(`${mockUser.userWithInvalidEmail.email} não é um email válido`);
    });

    it('it should be an invalid user [invalid field - telefone.numero]', async () => {
      const user = new UserSchema(mockUser.userWithInvalidTelefoneNumero);
      await expect(user.validate()).rejects.toThrow(`${mockUser.userWithInvalidTelefoneNumero.telefones[0].numero} não é um número de telefone válido`);
    });

    it('it should be an invalid user [invalid field - telefone.ddd]', async () => {
      const user = new UserSchema(mockUser.userWithInvalidTelefoneDDD);
      await expect(user.validate()).rejects.toThrow(`${mockUser.userWithInvalidTelefoneDDD.telefones[0].ddd} não é um número de ddd válido`);
    });

    it('it should be an invalid user [missing field - email]', async () => {
      const user = new UserSchema(mockUser.userWithoutEmail);
      await expect(user.validate()).rejects.toThrow('email é um campo obrigatório');
    });

    it('it should be an invalid user [missing field - nome]', async () => {
      const user = new UserSchema(mockUser.userWithoutNome);
      await expect(user.validate()).rejects.toThrow('nome é um campo obrigatório');
    });

    it('it should be an invalid user [missing field - senha]', async () => {
      const user = new UserSchema(mockUser.userWithoutSenha);
      await expect(user.validate()).rejects.toThrow('senha é um campo obrigatório');
    });
  });

  describe('Password validation ', () => {
    it('it should match password', async () => {
      const user = new UserSchema(mockUser.user);
      await user.save();

      const validPassword = await user.comparePassword(mockUser.user.senha);

      expect(validPassword).toBeTruthy();
    });

    it('it should not match password', async () => {
      await UserSchema.deleteOne({ email: mockUser.user.email });

      const user = new UserSchema(mockUser.user);
      await user.save();

      const invalidPassword = await user.comparePassword('invalid password');

      expect(invalidPassword).not.toBeTruthy();
    });
  });
});
