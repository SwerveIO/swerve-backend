"use strict";

import Router from 'koa-router';
import app from '../server';
import auth from './auth';

const routes = new Router();

auth(routes);

app.use(routes.middleware());
