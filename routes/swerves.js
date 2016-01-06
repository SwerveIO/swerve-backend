"use strict";
import { passport } from '../auth';
import { fetchMostRecentSwerves, createSwerve, swerveOnSwerve, fetchSwerveById, reportSwerve } from '../models/Swerve';

export default function(routes) {
	// Most recent Swerves.
	routes.get('/feed', passport.authenticate('jwt'), function* (next) {
		let swerves = yield fetchMostRecentSwerves();

		this.response.status = 200;
		this.response.body = swerves;
	});

	routes.post('/swerve', passport.authenticate('jwt'), function* (next) {
		let swerve = {
			message: this.request.body.message,
			emojis: this.request.body.emojis
		};

		yield createSwerve(this.session.passport.user, swerve);

		this.response.status = 200;
		this.response.body = {
			type: 'success',
			message: 'Swerve successfully created.'
		};
	});

	routes.post('/swerve/:swerveid', passport.authenticate('jwt'), function* (next) {
		let swerve = yield fetchSwerveById(this.params.swerveid);

		if(swerve === null || typeof swerve === 'undefined') {
			this.response.status = 404;
			this.response.body = {
				type: 'failure',
				message: 'That Swerve can not be swerved because that Swerve does not exist'
			}
			return;
		}

		if(swerve.swerves.some(swerveItem => swerveItem.userId === this.session.passport.user.id)) {
			this.response.status = 304;
			this.response.body = {
				type: 'failure',
				message: 'That Swerve can not be swerved by you because you have already swerved it'
			};
			return;
		}

		yield swerveOnSwerve(this.session.passport.user, swerve, this.request.body.swerve);

		this.response.status = 200;
		this.response.body = {
			type: 'success',
			message: 'Swerve successfully swerved. Stay chill.'
		};
	});

	routes.post('/swerve/:swerveid/report', passport.authenticate('jwt'), function* (next) {
		let swerve = yield fetchSwerveById(this.params.swerveid);

		if(swerve === null || typeof swerve === 'undefined') {
			this.response.status = 404;
			this.response.body = {
				type: 'failure',
				message: 'That Swerve can not be swerved because that Swerve does not exist'
			}
			return;
		}

		let reason = this.request.body.reason;

		yield reportSwerve(this.session.passport.user.id, swerve.id, reason);

		this.response.status = 200;
		this.response.body = {
			type: 'success',
			message: 'Swerve reported.'
		};
	});
}
