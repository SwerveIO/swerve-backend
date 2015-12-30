"use strict";

import JwtStrategy from 'passport-jwt';
import co from 'co';

import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } from '../config';

export default new JwtStrategy.Strategy({
	secretOrKey: JWT_SECRET,
	issuer: JWT_ISSUER,
	audience: JWT_AUDIENCE
}, function(payload, done) {
	co(function* jwtVerifyCoroutine() {
		let user = yield User.findById(payload.sub);

		done(null, user);
	});
});
