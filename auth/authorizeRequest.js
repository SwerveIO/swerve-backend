"use strict";

export default function* authorizeRequest(next) {
	console.log(this.session.passport.user);
	yield next;
}
