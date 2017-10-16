
const ERRORS = {
	'400': 'Bad Request',
	'401': 'Unathorized',
	'403': 'Forbidden',
	'404': 'Not Found',
	'500': 'Internal Server Error',
}

module.exports = {

	end: function end(res, statusCode, error) {

		if (error) {
			console.error(error, error.stack);
		}

		res.status(statusCode).end(ERRORS[statusCode] || 'Unkwon Error');
	}
}