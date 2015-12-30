"use strict";

import Router from 'koa-router';
import app from '../server';
import auth from './auth';
import swerve from './swerves';

const routes = new Router();

auth(routes);
swerve(routes);

app.use(routes.middleware());
