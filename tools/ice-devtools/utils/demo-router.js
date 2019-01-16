const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

const getDemos = require('./get-demos');
const { getPkgJSON } = require('./pkg-json');
const { parseMarkdownParts } = require('./markdown-helper');

const DEMO_TEMPLATE = path.join(__dirname, '../template/component/demo.hbs');
const HOME_TEMPLATE = path.join(__dirname, '../template/component/home.hbs');

function compile(hbsPath) {
  const hbsTemplateContent = fs.readFileSync(hbsPath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  return compileTemplateContent;
}

module.exports = function router(app, cwd) {
  const demos = getDemos(cwd);
  const pkg = getPkgJSON(cwd);
  const pkgName = pkg.name;

  app.get('/preview', async (req, res, next) => {
    const { demo } = req.query;

    if (undefined === demo) {
      res.redirect('/');
      return;
    }
  
    const demoFile = path.join(cwd, 'demo', demo + '.md');
    if (!fs.existsSync(demoFile)) {
      res.redirect('/');
      return;
    }

    const demoContent = fs.readFileSync(demoFile, 'utf-8');
    const { highlightedCode, content, meta } = parseMarkdownParts(demoContent);

    const compileTemplateContent = compile(DEMO_TEMPLATE);

    const jsTemplateContent = compileTemplateContent({ 
      demoName: demo,
      name: pkgName, // 组件 npm名
      meta: Object.keys(meta).map((key) => ({ key, value: meta[key] })),
      highlightedCode: highlightedCode,
      markdownContent: content,
      demos,
     });

     res.send(jsTemplateContent);
  });

  app.get('/', async (req, res, next) => {
    const compileTemplateContent = compile(HOME_TEMPLATE);

    const jsTemplateContent = compileTemplateContent({ 
      demos,
      pkg: pkgName
     });

     res.send(jsTemplateContent);
  });
}