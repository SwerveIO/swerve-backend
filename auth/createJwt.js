"use strict";
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } from '../config';

export default function* authorizeRequest(next) {
	let user = this.session.passport.user;

	this.token = jwt.sign(user, JWT_SECRET, {
		audience: JWT_AUDIENCE,
		issuer: JWT_ISSUER,
		subject: user.id
	});

	yield next;
}
