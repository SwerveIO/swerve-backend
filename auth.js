import passport from 'koa-passport';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';

import app from './server';

// Proxy is allowed.
app.proxy = true;

// Session, swerve
app.keys = [''];
app.use(session());

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());
