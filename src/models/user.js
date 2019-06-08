const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwtFunctions = require('../jwt/functions');

const { Schema } = mongoose;

const { SALT } = process.env;

const TelefoneSchema = new Schema({
  numero: {
    type: String,
    validate: [
      validators.isNumeric({ message: '{VALUE} não é um número de telefone válido' }),
      validators.isLength({ message: '{VALUE} não é um número de telefone válido' }, 8, 9)],
  },
  ddd: {
    type: String,
    validate: [
      validators.isNumeric({ message: '{VALUE} não é um número de {PATH} válido' }),
      validators.isLength({ message: '{VALUE} não é um número de {PATH} válido' }, 2, 2)],
  },
});

const UserSchema = new Schema({
  nome: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  email: {
    type: String,
    unique: true,
    required: [true, '{PATH} é um campo obrigatório'],
    validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' }),
  },
  senha: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  telefones: [TelefoneSchema],
  ultimo_login: Date,
  token: String,
}, { timestamps: true });

UserSchema.plugin(unique, { message: '{PATH} já existente' });


UserSchema.pre('save', async function (next) {

  try {
    this.ultimo_login = this.updatedAt;

    this.token = jwtFunctions.getToken(this);

    if (!this.isModified('senha')) return next();

    const currentSalt = await bcrypt.genSalt(parseInt(SALT));

    const hash = await bcrypt.hash(this.senha, currentSalt);

    this.senha = hash;

    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword || '', this.senha);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
