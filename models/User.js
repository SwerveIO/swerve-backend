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
	user.role = 'swerver';

	return co(function* createUserCoroutine() {
		let insert = yield runInsertQuery(r.db('swerve').table('users').insert([
			user
		]));

		return yield runQuery(
			r.db('swerve').table('users').get(insert.generated_keys[0])
		);
	});
}

export function fetchAllUsers() {
	return co(function* fetchAllUsersCoroutine() {
		return yield runQuery(
			r.db('swerve').table('users')
		);
	});
}

export function updateUser(id, update) {
	return co(function* updateUserCoroutine() {
		return yield runQuery(
			r.db('swerve').table('users').get(id).update(update)
		);
	});
}

export function deleteUser(id) {
	return co(function* deleteUserCoroutine() {
		return yield runQuery(
			r.db('swerve').table('users').get(id).delete()
		)
	});
}
