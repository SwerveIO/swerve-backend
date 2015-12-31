"use strict";
import { passport } from '../auth';
import { accessControlMiddleware } from '../auth/accessControlMiddleware';
import { fetchAllUsers, updateUser, deleteUser } from '../models/User';

export default function(routes) {
	// Gets a full list of users. Locking it down.
	routes.get('/users',
		passport.authenticate('jwt'), accessControlMiddleware([ 'admin' ]),
		function* usersRoute() {
			let users = yield fetchAllUsers();

			this.response.status = 200;
			this.response.body = users;
		}
	);

	routes.put('/user/:id', passport.authenticate('jwt'), function* userUpdate() {
		if(this.session.passport.user.id !== this.params.id && this.session.passport.user.role !== 'admin') {
			this.response.status = 401;
			this.response.body = {
				type: 'unauthorized',
				message: 'That is a forbidden action. Swerve.'
			};
		}

		let username = this.request.body.username;
		let email = this.request.body.email;

		yield updateUser(this.params.id, {
			username,
			email
		});

		this.response.status = 201;
		this.response.body = {
			type: 'success',
			message: 'User successfully updated.'
		};
	});

	routes.delete('/user/:id',
		passport.authenticate('jwt'), accessControlMiddleware([ 'admin' ]),
		function* deleteUserRoute() {
			yield deleteUser(this.params.id);

			this.response.status = 201;
			this.response.body = {
				type: 'success',
				message: 'User successfully deleted.'
			};
		}
	);
};
