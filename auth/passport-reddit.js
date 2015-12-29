"use strict";

import RedditStrategy from 'passport-reddit';
import co from 'co';
import crypto from 'crypto';
import { REDDIT_API_KEY, REDDIT_API_SECRET, REDDIT_CALLBACK_URL } from '../config';

import { findUserBy, createUser } from '../models/User';

export default new RedditStrategy.Strategy({
	clientID: REDDIT_API_KEY,
	clientSecret: REDDIT_API_SECRET,
	callbackURL: REDDIT_CALLBACK_URL,
	state: 'test'
}, function verify(accessToken, refreshToken, profile, done) {
	co(function* verifyCoroutine() {
		let user = yield findUserBy('redditId', profile.id);

		if(typeof user === 'undefined' || user === null) {
			user = yield createUser({
				redditId: profile.id,
				username: profile.name
			});
		}

		done(null, user);
	}, function(err) {
		throw err;
	});
});
