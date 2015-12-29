"use strict";

import FacebookStrategy from 'passport-facebook';
import co from 'co';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } from '../config';

import { findUserBy, createUser } from '../models/User';

export default new FacebookStrategy({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: FACEBOOK_CALLBACK_URL
}, function verify(accessToken, refreshToken, profile, done) {
	co(function* verifyCoroutine() {
		let user = yield findUserBy('facebookId', profile.id);

		if(typeof user === 'undefined' || user === null) {
			user = yield createUser({
				facebookId: profile.id,
				email: profile._json.email,
				gender: profile._json.gender,
				timezone: profile._json.timezone
			});
		}

		done(null, user);
	}, function(err) {
		throw err;
	});
});
