const Router = require('koa-router');
const router = new Router();
const getDemos = require('./getDemos');
const colors = require('colors');
const { existsSync, readFileSync } = require('fs');
const { join, resolve } = require('path');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const webpackHotClient = require.resolve('webpack-hot-client/client');
const { parseMarkdownParts } = require('./utils');

const cachedChunks = {};
let watchingHandler;

router.get('/preview', async (ctx) => {
  const { demo } = ctx.query;

  if (undefined === demo) {
    ctx.redirect('/');
    return;
  }

  const demoFile = join(ctx.projectDir, 'demo', demo + '.md');
  if (!existsSync(demoFile)) {
    ctx.redirect('/');
    return;
  }

  if (!(demoFile in cachedChunks)) {
    ctx.compiler.running = false;
    ctx.compiler.apply(
      new MultiEntryPlugin(ctx.projectDir, [webpackHotClient, demoFile], `__Component_Dev__.${demo}`)
    );
    await new Promise((resolve) => {
      const watchOpts = {
        aggregateTimeout: 20,
      };
      if (watchingHandler) {
        watchingHandler.close(() => {
          watchingHandler = ctx.compiler.watch(watchOpts, handler);
        });
      } else {
        watchingHandler = ctx.compiler.watch(watchOpts, handler);
      }

      function handler(err) {
        if (err) {
          resolve(err);
        } else {
          cachedChunks[demoFile] = [demoFile];
          resolve();
        }
      }
    });
    ctx.compiler.running = true;
  }

  const demoContent = readFileSync(demoFile, 'utf-8');
  const { code, compiledCode, highlightedCode, content, meta } = parseMarkdownParts(demoContent);

  const { name } = ctx.componentPackage;
  const demos = getDemos(ctx.projectDir);
  await ctx.render('component/demo.hbs', {
    demoName: demo,
    name, // 组件 npm名
    meta: Object.keys(meta).map((key) => ({ key, value: meta[key] })),
    highlightedCode: highlightedCode,
    markdownContent: content,
    demos,
  });
});

router.get('/', async (ctx) => {
  const demos = getDemos(ctx.projectDir);

  await ctx.render('component/home.hbs', {
    demos,
    pkg: ctx.componentPackage,
  });
});

module.exports = router.routes();
