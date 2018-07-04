'use strict'

var secret = 'my_secret_key';

function ensureToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
	  const bearer = bearerHeader.split(" ");
	  const bearerToken = bearer[1];
	  req.token = bearerToken;
	  next();
	} else {
		return	res.status(403).send({
			message:'The token has not been provided correctly :('
		});
	}
}

module.exports={
	ensureToken
};