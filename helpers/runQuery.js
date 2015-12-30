"use strict";
import r from 'rethinkdb';
import Promise from 'bluebird';
import co from 'co';

let connection = null;
r.connect({ host: 'localhost', port: 28015 }, function connectedToRethink(err, conn) {
	if(err) throw err;

	connection = conn;
});

export default function runQuery(query) {
	return co(function* runQueryCoroutine() {
		let promise = yield new Promise(function runQueryPromise(resolve, reject) {
			query.run(connection, function(err, cursor) {
				if(err) reject(cursor);
				resolve(cursor);
			});
		});

		if(typeof promise.toArray === 'function') {
			return yield new Promise(function runQueryPromise(resolve, reject) {
				promise.toArray(function arrayCallback(err, result) {
					if(err) reject(err);

					resolve(result)
				});
			});
		}

		return promise;
	}, function errorCatch(err) {
		throw err;
	});
}

export function runInsertQuery(query) {
	return co(function* runQueryCoroutine() {
		return yield new Promise(function runQueryPromise(resolve, reject) {
			query.run(connection, function(err, cursor) {
				if(err) reject(cursor);
				resolve(cursor);
			});
		});
	}, function errorCatch(err) {
		throw err;
	});
}
