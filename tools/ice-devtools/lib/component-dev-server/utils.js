// const babelPluginImport = require.resolve('babel-plugin-import');
const babel = require('babel-core');
const compileES5 = exports.compileES5 = function compileES5(source) {
  const babelrc = getBabelRC();
  const { code } = babel.transform(source, babelrc);
  return code;
};

const getBabelConfig = require('../config/getBabelConfig');
function getBabelRC() {
  const babelConfig = getBabelConfig();
  // babelConfig.plugins.push([babelPluginImport, {
  //   libraryName: '@alife/next',
  //   style: true
  // }]);
  // babelConfig.plugins.push([babelPluginImport, {
  //   libraryName: '@icedesign/base',
  //   style: true
  // }]);
  return babelConfig;
}


const marked = require('marked');
const prismjs = require('prismjs');
require('prismjs/components/prism-jsx');
const renderer = new marked.Renderer();
renderer.code = function (code, lang = 'jsx') {
  return prismjs.highlight(code, prismjs.languages[lang]);
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

const yaml = require('js-yaml');
exports.parseMarkdownParts = function parseMarkdownParts(md) {

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
    content: '',
    code: ''
  };

  if (splited) {
    result.meta = yaml.safeLoad(splited[0]);
    result.content = splited[1];
  }

  const CODE_REG = /(````)(?:jsx?)([^\1]*?)(\1)/g;
  const codeMatched = CODE_REG.exec(result.content);
  if (codeMatched) {
    result.code = codeMatched[2] || '';
    result.content = result.content.slice(0, codeMatched.index);
  }

  result.content = marked(result.content);
  result.highlightedCode = prismjs.highlight(result.code.trim(), prismjs.languages.jsx);
  result.compiledCode = compileES5(result.code);

  return result;
}
