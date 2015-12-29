"use strict";

import r from 'rethinkdb';
import co from 'co';

let connection = null;
r.connect({ host: 'localhost', port: 28015 }, function connectedToRethink(err, conn) {
	if(err) throw err;

	connection = conn;
});

function runQuery(query) {
	return co(function* runQueryCoroutine() {
		let cursor = yield new Promise(function runQueryPromise(resolve, reject) {
			query.run(connection, function(err, cursor) {
				if(err) reject(cursor);
				resolve(cursor);
			});
		});

		return yield new Promise(function runQueryPromise(resolve, reject) {
			cursor.toArray(function arrayCallback(err, result) {
				if(err) reject(err);

				resolve(result)
			});
		});
	}, function errorCatch(err) {
		throw err;
	});
}

export function findUserBy(property, value) {
	return co(function* findUserByCoroutine() {
		let result = yield runQuery(
			r.db('swerve').table('users')
				.filter(r.row(property).eq(value))
		);

		return result[0];
	}, function errorCatch(err) {
		throw err;
	});
};

export function createUser(user) {
	return co(function* createUserCoroutine() {
		return yield runQuery(r.db('swerve').table('users').insert([
			user
		]));
	});
}
