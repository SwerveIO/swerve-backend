import koa from 'koa';
import auth from './auth';

const app = koa();

auth(app);

app.listen(3000);

// Exporting app so things can bind to it. Swerve.
export default app;
