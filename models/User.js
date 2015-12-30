"use strict";

import r from 'rethinkdb';
import co from 'co';
import runQuery, { runInsertQuery } from '../helpers/runQuery';

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

export function findById(value) {
	return co(function* findUserByCoroutine() {

		let result = yield runQuery(
			r.db('swerve').table('users')
				.get(value)
		);

		return result;
	}, function errorCatch(err) {
		throw err;
	});
};

export function createUser(user) {
	user.mySwerves = [];
	user.theirSwerves = [];

	return co(function* createUserCoroutine() {
		let insert = yield runInsertQuery(r.db('swerve').table('users').insert([
			user
		]));

		return yield runQuery(
			r.db('swerve').table('users').get(insert.generated_keys[0])
		);
	});
}
