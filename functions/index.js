// Imports
const express    = require('express');
const firebase   = require('firebase');
const bodyParser = require('body-parser');
const admin      = require('firebase-admin');
const functions  = require('firebase-functions');

// Inicialização
admin.initializeApp(functions.config().firebase);
firebase.initializeApp(functions.config().firebase);

const app = express();

// Middlewares
const cors   = require('./middlewares/cors');
const logger = require('./middlewares/logger');

app.use(cors);
app.use(logger);
app.use(bodyParser.json());

const ensureAuthenticated = require('./middlewares/authentication');
app.use(ensureAuthenticated(admin));

// APIs
const v1 = require('./APIs/v1/API')(admin, firebase);

app.use('/api/v1/', v1);

// Error Handling
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Internal Server Error');
});

// Exports
exports.api = functions.https.onRequest(app);

// Método que iniciará quando o sistema criar o usuário no firebase.
exports.cloneUser = functions.auth.user().onCreate(event => {

	const user = event.data;

	var json = {
		email: user.email,
		name: user.displayName,
		isAvaliable: false
	};

	const emailEncoded = Buffer.from(user.email).toString('base64');

	admin.database().ref('Users/'+ emailEncoded).set(json);
});