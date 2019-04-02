/* Deprecated */
/* eslint-disable */
const util = require('util');
const marked = require('marked');
const prismjs = require('prismjs');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');

const yaml = require('js-yaml');

const compileES5 = require('./compile-es5');

const renderer = new marked.Renderer();

const LANGS = [
  'css',
  'style',
  'bash',
  'json',
  'jsx',
  'js',
  'html'
];

var styleTemplate = `
  <div class="markdown">
    <div class="highlight highlight-%s">
      <pre><code language="%s">%s</code></pre>
    </div>
  </div>
  <style>%s</style>
`;

renderer.code = function (code, lang) {
  // lang = ''
  if (!lang) {
    lang = 'jsx';
  }

  var html = prismjs.highlight(code, prismjs.languages[lang]);
  if (LANGS.indexOf(lang) > -1) {
    return util.format(styleTemplate, lang, lang, html, code);
  }

  return html;
};

renderer.heading = function (text, level) {
  var escapedText = text.replace(/\s+/g, '-');
  escapedText = escapedText.toLowerCase();
  escapedText = escapedText.replace(/^-+?|-+?$/, '');
  return '<h' + level + '>' + text + '<a id="user-content-' + escapedText + '" name="' +
    escapedText +
    '" class="anchor" aria-hidden="true" href="#' +
    escapedText +
    '"><span class="octicon octicon-link"></span></a></h' + level + '>';
};

renderer.link = function (href, title, text) {
  if (href.indexOf('http') === 0) {
    return '<a href="' + href + '" title="' + title + '">' + text + '</a>';
  }
  var fileindex = href.lastIndexOf('/');
  var filename = href.substr(fileindex + 1);
  if (/^([-\w]+)\.md$/.test(filename)) {
    href = href.replace(/\.md$/, '.html');
  }
  title = title || text;
  return '<a href="' + href + '" title="' + title + '">' + text + '</a>';
};

marked.setOptions({
  renderer
});

exports.formatMarkdown = function formatMarkdown(md) {
  var markdownHtml = marked(md);
  return markdownHtml;
}

exports.parseMarkdownParts = function parseMarkdownParts(md, options = {}) {
  // 获取 meta 信息
  function split(str) {
    if (str.slice(0, 3) !== '---') return;
    var matcher = /\n(\.{3}|-{3})/g;
    var metaEnd = matcher.exec(str);
    return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
  }

  const splited = split(md);
  const result = {
    meta: {},
    content: md,
    code: ''
  };

  if (splited) {
    result.meta = yaml.safeLoad(splited[0]);
    result.content = splited[1];
  }

  if (options.sliceCode) {
    const CODE_REG = /(````)(?:jsx?)([^\1]*?)(\1)/g;

    const codeMatched = CODE_REG.exec(result.content);
    if (codeMatched) {
      result.code = codeMatched[2] || '';
      result.content = result.content.slice(0, codeMatched.index);
    }

    result.highlightedCode = prismjs.highlight(result.code.trim(), prismjs.languages.jsx);
    result.compiledCode = compileES5(result.code);
  }

  result.content = marked(result.content);

  return result;
}
