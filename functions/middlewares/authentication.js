// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
module.exports = function(admin) {

	return function(req, res, next) {

		if (req.method === 'OPTIONS') {
			return res.status(204).send();
		}

		const token = req.headers.idtoken;

		// console.log(`HEADERS: ${JSON.stringify(req.headers)}`);

		if (!token) {
			return res.status(401).send('Unauthorized');
		}

		admin
			.auth()
			.verifyIdToken(token)
			.then(decodedIdToken => {

				req.user = decodedIdToken;

				isAdmin(req.user.email, function(isAdmin) {

					req.user.isAdmin = isAdmin;

					console.log('User:', req.user.email, isAdmin ? "[ADMIN]" : "");

					next();
				});
			})
			.catch(error => {
				res.status(401).send('Unauthorized');
			});
	}

	function isAdmin(userEmail, callback) {

		const db = admin.database();
		const dbRef = db.ref("Admins");

		let isAdmin = false;

		dbRef.once("value", snapshot => {

			let res = false;

			snapshot.forEach(email => {

				if (userEmail === email.val()) {
					res = true;
				}
			});

			callback(res);
		});
	}
}