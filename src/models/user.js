/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const unique = require('mongoose-unique-validator');
const crypto = require('crypto');
const { getToken } = require('../config/jwt-configuration');

const { Schema } = mongoose;

const SALT = 16;

const PhoneSchema = new Schema({
  phoneNumber: {
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
  name: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  email: {
    type: String,
    unique: true,
    required: [true, '{PATH} é um campo obrigatório'],
    validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' }),
  },
  password: { type: String, required: [true, '{PATH} é um campo obrigatório'] },
  phones: [PhoneSchema],
  lastLogin: Date,
  salt: String,
  token: String,
}, { timestamps: true });

UserSchema.plugin(unique, { message: '{PATH} já existente' });

UserSchema.pre('save', function (next) {
  try {
    this.lastLogin = this.updatedAt;

    this.token = getToken(this);

    if (!this.isModified('password')) return next();

    this.salt = crypto.randomBytes(SALT).toString('hex');

    const hash = crypto.pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512').toString('hex');

    this.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const hash = crypto.pbkdf2Sync(candidatePassword || '', this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
