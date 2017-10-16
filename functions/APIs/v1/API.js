const express = require('express');
const router  = express();

module.exports = function(admin, firebase) {

	// Routers
	const all = require('./routers/all') (admin, firebase);
	
	router.use('/all', all);

	return router;
}