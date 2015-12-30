"use strict";

import passport from 'koa-passport';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';

import FacebookStrategy from './auth/passport-facebook';
import TwitterStrategy from './auth/passport-twitter';
import RedditStrategy from './auth/passport-reddit';
import JwtStrategy from './auth/passport-jwt';

import User from './models/User';

import app from './server';

import { APP_SESSION_SECRET } from './config';

passport.serializeUser(function serialize(user, done) {
	done(null, user);
});

passport.deserializeUser(function deserialize(user, done) {
	done(null, user);
});

passport.use(FacebookStrategy);
passport.use(TwitterStrategy);
passport.use(RedditStrategy);
passport.use(JwtStrategy);

// Proxy is allowed.
app.proxy = true;

// Session, swerve
app.keys = [ APP_SESSION_SECRET ];
app.use(session(app));

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

export { passport };
