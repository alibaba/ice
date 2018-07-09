const Router = require('koa-router');
const router = new Router();
const getDemos = require('./getDemos');
const { join, resolve } = require('path');

router.get('/preview', async (ctx) => {
  const { demo } = ctx.params;
  if (undefined === demo) {
    ctx.redirect('/');
    return;
  }

  const demoFile = join();
  if (!existsSync()) { }

  const compiled = ;

  await ctx.render('component/demo.hbs', {
    compiled
  });
});

router.get('/', async (ctx) => {
  const demos = getDemos(ctx.projectDir);

  await ctx.render('component/home.hbs', {
    demos
  });
});

module.exports = router.routes();
