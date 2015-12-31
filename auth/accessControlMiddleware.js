"use strict";

export function accessControlMiddleware(rolesPermitted) {
	return function* actualACMiddleware(next) {
		if(rolesPermitted.some(role => this.session.passport.user.role === role)) {
			yield next;
		} else {
			this.response.status = 401;
			this.response.message = {
				type: 'unauthorized',
				message: 'That is a forbidden action. Swerve.'
			};
		}
	};
}
