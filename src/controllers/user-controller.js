
const exception = require('../exception');
const jwtFunctions 	= require('../jwt/functions');
const UserSchema = require('../models/user');

module.exports.findById = async (req, res, next) => {
	try {
        const { params: { id } } = req;

		let user = await UserSchema.findById(id);

		if (!user)
			throw new exception.ResourceNotFound();

		if (user.token != req.token)
			throw new exception.Unauthorized();

		return res.json(user);
	} catch (error) {
		next(exception.getKnownError(error));
	}
};

module.exports.signIn = async (req, res, next) => {
	try {
        const { body: { email } } = req;

        let user = await UserSchema.findOne({ email });
        
		if(!user)
			throw new exception.InvalidCredentials();

		let isValidPassword = await user.comparePassword(req.body.senha);
		if(!isValidPassword)
			throw new exception.InvalidCredentials();

		user = await UserSchema.findByIdAndUpdate({ '_id': user.id }, 
			{ $set: 
				{ ultimo_login: Date.now(), token: jwtFunctions.getToken(user) }
			}, { new: true });

		return res.json(user);

	} catch(error)  {
		next(exception.getKnownError(error));
	}
};

module.exports.signUp = async (req, res, next) => {
	try {
		const { body } = req;

		const existingUser = await UserSchema.findOne({ email: body.email });
        
		if(existingUser)
			throw new exception.AlreadyRegistered();
		
		let user = new UserSchema(body);

		user = await user.save();
		return res.json(user);
	} catch(error) {
		next(exception.getKnownError(error));
	}
};
