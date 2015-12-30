"use strict";

import { passport } from '../auth';
import createJwt from '../auth/createJwt';
import { SUCCESSFUL_LOGIN_REDIRECT, FAILURE_LOGIN_REDIRECT } from '../config';

function* redirectToFeed(next) {
	this.response.redirect(SUCCESSFUL_LOGIN_REDIRECT + '?qt=' + this.token);
}

export default function(routes) {
	routes.get('/auth/facebook', passport.authenticate('facebook'));
	routes.get('/auth/facebook/authorized', passport.authenticate('facebook', {
		failureRedirect: FAILURE_LOGIN_REDIRECT
	}), createJwt, redirectToFeed);

	routes.get('/auth/twitter', passport.authenticate('twitter'));
	routes.get('/auth/twitter/authorized', passport.authenticate('twitter', {
		failureRedirect: FAILURE_LOGIN_REDIRECT
	}), createJwt, redirectToFeed);

	routes.get('/auth/reddit', passport.authenticate('reddit'));
	routes.get('/auth/reddit/authorized', passport.authenticate('reddit', {
		failureRedirect: FAILURE_LOGIN_REDIRECT
	}), createJwt, redirectToFeed);
};
