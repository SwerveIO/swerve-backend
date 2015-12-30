"use strict";

import r from 'rethinkdb';
import co from 'co';
import runQuery, { runInsertQuery } from '../helpers/runQuery';

export function fetchMostRecentSwerves() {
	return co(function* fetchMostRecentSwervesCoroutine() {
		return yield runQuery(
			r.db('swerve').table('swerves').orderBy({ index: r.desc('date') })
		);
	}, function failure(err) {
		throw err;
	});
}

export function createSwerve(user, swerve) {
	return co(function* coRoutine() {
		let swerveObj = {
			date: new Date().toJSON(),
			message: swerve.message,

			swerves: [
				{
					swerve: swerve.emojis,
					userId: user.id,
					date: new Date().toJSON()
				}
			]
		};

		let createdSwerve = yield runInsertQuery(
			r.db('swerve').table('swerves').insert([ swerveObj ])
		);

		let mySwerveId = createdSwerve.generated_keys[0];

		yield runQuery(
			r.db('swerve').table('users').get(user.id)
				.update({ mySwerves: r.row('mySwerves').append(mySwerveId) })
		);
	});
}

export function swerveOnSwerve(user, theirSwerve, swerve) {
	return co(function* coRoutine() {
		yield runQuery(
			r.db('swerve').table('swerves').get(theirSwerve.id)
				.update({ swerves: r.row('swerves').append({
					swerve,
					userId: user.id,
					date: new Date().toJSON()
				})
		);

		yield runQuery(
			r.db('swerve').table('users').get(user.id)
				.update({ theirSwerves: r.row('theirSwerves').append(theirSwerve.id) })
		)
	});
}
