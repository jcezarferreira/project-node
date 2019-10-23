
const {
  ResourceNotFound, InvalidCredentials, AlreadyExists,
} = require('../exceptions/exception');
const { getToken } = require('../config/jwt-configuration');
const UserSchema = require('../models/user');

module.exports.findById = async (req, res, next) => {
  try {
    const { params: { _id } } = req;

    const user = await UserSchema.findOne({ _id });

    if (!user) { throw new ResourceNotFound(); }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const { query: { page, size } } = req;

    const users = await UserSchema.find({ }).skip((page || 0) * (size || 10)).lean();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;

    let user = await UserSchema.findOne({ email });

    if (!user) { throw new InvalidCredentials(); }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) { throw new InvalidCredentials(); }

    user = await UserSchema.findByIdAndUpdate({ _id: user.id },
      {
        $set: { lastLogin: Date.now(), token: getToken(user) },
      }, { new: true });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;

    const existingUser = await UserSchema.findOne({ email: body.email });

    if (existingUser) { throw new AlreadyExists(); }

    let user = new UserSchema(body);

    user = await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};
