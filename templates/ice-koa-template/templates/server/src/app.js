const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const respond = require('koa-respond');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

require('./router')(router);

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(respond())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(process.cwd(), '../client/build')))
  .listen(port, () => {
    console.log('The server is running at:');
    console.log(
      `    - Local:  http://localhost:${port}`
    );
  });
