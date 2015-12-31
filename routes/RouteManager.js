"use strict";

import Router from 'koa-router';
import app from '../server';
import auth from './auth';
import swerve from './swerves';
import users from './users';

const routes = new Router();

auth(routes);
swerve(routes);
users(routes);

app.use(routes.middleware());
