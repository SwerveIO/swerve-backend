"use strict";

import r from 'rethinkdb';
import co from 'co';
import runQuery, { runInsertQuery } from '../helpers/runQuery';

export function fetchMostRecentSwerves(nsfw) {
	return co(function* fetchMostRecentSwervesCoroutine() {
		if(nsfw) {
			return yield runQuery(
				r.db('swerve').table('swerves').orderBy({ index: r.desc('date') })
			);
		} else {
			return yield runQuery(
				r.db('swerve').table('swerves').orderBy({ index: r.desc('date') })
					.filter({ nsfw: false })
			);
		}
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
					date: new Date().toJSON(),
				}
			],

			reports: [],
			nsfw: false
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
			})
		);

		yield runQuery(
			r.db('swerve').table('users').get(user.id)
				.update({ theirSwerves: r.row('theirSwerves').append(theirSwerve.id) })
		)
	});
}

export function fetchSwerveById(id) {
	return co(function* coRoutine() {
		return yield runQuery(
			r.db('swerve').table('swerves').get(id)
		);
	});
}

export function reportSwerve(user, swerve, reason) {
	return co(function* coRoutine() {
		return yield runQuery(
			r.db('swerve').table('swerves').get(swerve)
			.update({
				reports: r.row('reports').append({
					userId: user,
					reason
				})
			})
		);
	});
}

export function flagSwerveNSFW(swerve) {
	return co(function* coRoutine() {
		return yield runQuery(
			r.db('swerve').table('swerves').get(swerve)
			.update({
				nsfw: true
			})
		);
	});
}
