"use strict";

import TwitterStrategy from 'passport-twitter';
import co from 'co';

import { findUserBy, createUser } from '../models/User';
import { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_CALLBACK_URL } from '../config';

export default new TwitterStrategy({
	consumerKey: TWITTER_API_KEY,
	consumerSecret: TWITTER_API_SECRET,
	callbackURL: TWITTER_CALLBACK_URL
}, function(token, tokenSecret, profile, done) {
	co(function* verifyCoroutine() {
		let user = yield findUserBy('twitterId', profile.id);

		if(typeof user === 'undefined' || user === null) {
			user = yield createUser({
				twitterId: profile.id,
				username: profile.username
			});
		}

		done(null, user);
	}, function(err) {
		throw err;
	});

});
