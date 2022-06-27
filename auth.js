const jwt = require("jsonwebtoken");
// JSON Web Tokens - is used for sending secured transaction.

// Token Creation
/*
	Analogy
		Pack the gift and provide a lock with the secret code as the key.
*/
const secret = "crushAkoNgCrushKo"

module.exports.createAccessToken = (user) => {
	// When the user logs in, a token will be created with the user's information.
	// This will be used for the token payload
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
												// To set limits for client login
	//Syntax: jwt.sign(payload, secretOrPrivateKey, [options/callBackFunction]);
	return jwt.sign(data, secret, {});
}

