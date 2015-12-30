"use strict";
import { passport } from '../auth';
import { accessControlMiddleware } from '../auth/accessControlMiddleware';

export default function(routes) {
	// Gets a full list of users. Locking it down.
	routes.get('/users',
		passport.authenticate('jwt'), accessControlMiddleware([ 'admin' ]),
		function* usersRoute() {

		}
	);
};
