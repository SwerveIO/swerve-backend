"use strict";

import koa from 'koa';
import bunyan from 'bunyan';

const app = koa();
const log = bunyan.createLogger({ name: 'swerve-backend' });

app.listen(3000);

// Exporting app so things can bind to it. Swerve.
export default app;

require('./auth');
require('./routes/RouteManager');

log.info('swerve-backend up and running! Swerve.');
