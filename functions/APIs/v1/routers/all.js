const express      = require('express');
const utils        = require('../utils');
const errorHandler = require('../errorHandler');

const router  = express();

module.exports = function(admin, firebase) {

	/*router.post('/', (req, res, next) => {

		isValidSchedule(req)
			.then(createUserSchedule)
			.then(() => res.status(200).send())
			.catch((error) => errorHandler.end(res, error.code || 500, error.message));
	});*/

	router.get('/', (req, res, next) => {

		getAllData()
			.then(allData => res.status(200).send(allData))
			.catch((error) => errorHandler.end(res, error.code || 500, error.message));
		
	});

	/*router.put('/:id', (req, res, next) => {

		isScheduleExists(req)
			.then(isValidSchedule)
			.then(updateSchedule)
			.then(() => res.status(200).send())
			.catch((error) => errorHandler.end(res, error.code || 500, error.message));
	});

	router.delete('/:id', (req, res, next) => {

		deleteUserSchedule(req)
			.then(() => res.status(200).send())
			.catch((error) => errorHandler.end(res, error.code || 500, error.message));
	});*/

	function createUserSchedule(req) {

		return new Promise((resolve, reject) => {

			const DB = admin.database().ref("");

			DB.push(req.body)
				.then(resolve())
				.catch(error => reject({message: error, code: 500}));

		});
	}

	function getAllData(req) {

		return new Promise((resolve, reject) => {

			const DB = admin.database().ref('2017');

			DB.once('value').then(snapshot => {

				if (snapshot == null || snapshot == undefined) {
					return reject({message: null, code: 404});
				}

				let allData = snapshot.val() || [];

				for (let i in allData) {
					console.log(i +" : ", allData[i]);
				}

				resolve(allData);
			});
		})
	}

	function update(req) {
		let id = req.params.id;

		return new Promise((resolve, reject) => {

			const DB = admin.database().ref(`2017/janeiro/foods/${id}`);

			DB.update(req.body)
				.then(resolve())
				.catch(error => reject({message: error, code: 500}));
		})
	}

	function deleteFood(req) {

		let id = req.params.id;

		return new Promise((resolve, reject) => {

			const DB = admin.database().ref(`2017/janeiro/foods/${id}`);

			DB.remove()
				.then(resolve())
				.catch(error => reject({message: error, code: 404}));
		})
	}

	return router;
}
