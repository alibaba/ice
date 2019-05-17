/**
 * component dev routers
 */
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

const DEMO_TEMPLATE = path.join(__dirname, '../template/demo.hbs');
const HOME_TEMPLATE = path.join(__dirname, '../template/home.hbs');
const ADAPTOR_TEMPLATE = path.join(__dirname, '../template/adaptor.html.hbs');

function compile(hbsPath) {
  const hbsTemplateContent = fs.readFileSync(hbsPath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  return compileTemplateContent;
}

module.exports = ({
  context,
  markdownParser,
  demos,
  pkg,
  hasAdaptor,
}) => {
  return function router(app) {
    const pkgName = pkg.name;

    app.get('/preview', async (req, res) => {
      const { demo } = req.query;

      if (undefined === demo) {
        res.redirect('/');
        return;
      }

      const demoFile = path.join(context, 'demo', `${demo}.md`);
      if (!fs.existsSync(demoFile)) {
        res.redirect('/');
        return;
      }

      const demoContent = fs.readFileSync(demoFile, 'utf-8');
      const { highlightedCode, content, meta, highlightedStyle } = markdownParser(demoContent, {
        sliceCode: true,
      });

      const compileTemplateContent = compile(DEMO_TEMPLATE);

      const jsTemplateContent = compileTemplateContent({
        demoName: demo,
        name: pkgName, // 组件 npm名
        meta: Object.keys(meta).map((key) => ({ key, value: meta[key] })),
        highlightedCode,
        markdownContent: content,
        demos,
        highlightedStyle,
      });

      res.send(jsTemplateContent);
    });

    if (hasAdaptor) {
      app.get('/adaptor', async (req, res) => {
        const compileTemplateContent = compile(ADAPTOR_TEMPLATE);
        const jsTemplateContent = compileTemplateContent({});
        res.send(jsTemplateContent);
      });
    }

    app.get('/', async (req, res) => {
      const compileTemplateContent = compile(HOME_TEMPLATE);

      const jsTemplateContent = compileTemplateContent({
        demos,
        pkg: pkgName,
        hasAdaptor,
      });

      res.send(jsTemplateContent);
    });
  };
};
