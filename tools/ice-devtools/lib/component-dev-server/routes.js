const Router = require('koa-router');
const router = new Router();
const getDemos = require('./getDemos');
const colors = require('colors');
const detective = require('detective-module');
const { existsSync, readFileSync } = require('fs');
const { join, resolve } = require('path');
const { compileES5 } = require('./utils');



router.get('/preview', async (ctx) => {
  const CODE_REG = /(````)(?:jsx?)([^\1]*?)(\1)/g;
  const { demo } = ctx.query;
  if (undefined === demo) {
    ctx.redirect('/');
    return;
  }

  const demoFile = join(ctx.projectDir, 'demo', demo + '.md');
  let jsCode = '';
  if (existsSync(demoFile)) {
    const demoContent = readFileSync(demoFile, 'utf-8');
    jsCode = CODE_REG.exec(demoContent);
    jsCode = compileES5(jsCode && jsCode[2] || '');

    var deps = [];
    if (jsCode) {
      try {
        deps = detective(jsCode);
      } catch (error) {
        console.log(colors.green(demoFile), colors.red('jsx 语法存在错误'));
        console.log(colors.red(error.name + ':' + error.message));
      }
    } else {
      console.log(colors.green(demoFile), colors.red('不包含任何源码！请使用 ````jsx 格式书写。'));
    }
  }

  const { name } = ctx.componentPackage;
  await ctx.render('component/demo.hbs', {
    compiled: jsCode,
    name, // 组件 npm名
  });
});

router.get('/', async (ctx) => {
  const demos = getDemos(ctx.projectDir);

  await ctx.render('component/home.hbs', {
    demos
  });
});

module.exports = router.routes();
