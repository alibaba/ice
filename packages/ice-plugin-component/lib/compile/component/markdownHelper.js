const util = require('util');
const marked = require('marked');
const prismjs = require('prismjs');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');

const yaml = require('js-yaml');

const bableCompile = require('./bableCompile');

const renderer = new marked.Renderer();

let importStyle = false;

// css 注入到页面中
const styleTemplate = '<style>%s</style>';
const codeTemplate = `
  <div class="markdown">
    <div class="highlight highlight-%s">
      <pre><code language="%s">%s</code></pre>
    </div>
  </div>
`;

renderer.code = function (code, lang) {
  // lang = ''
  if (!lang) {
    lang = 'jsx';
  }
  const html = prismjs.highlight(code, prismjs.languages[lang] || prismjs.languages.html);

  if (importStyle) {
    if (lang === 'css' || lang === 'style') {
      return util.format(styleTemplate, code);
    }
  }
  return util.format(codeTemplate, lang, lang, html);
};

renderer.heading = function (text, level) {
  let escapedText = text.replace(/\s+/g, '-');
  escapedText = escapedText.toLowerCase();
  escapedText = escapedText.replace(/^-+?|-+?$/, '');
  return `<h${level}>${text}<a id="user-content-${escapedText}" name="${escapedText}" class="anchor" aria-hidden="true" href="#${escapedText}"><span class="octicon octicon-link"></span></a></h${level}>`;
};

renderer.link = function (href, title, text) {
  if (href.indexOf('http') === 0) {
    return `<a href="${href}" title="${title}">${text}</a>`;
  }
  const fileindex = href.lastIndexOf('/');
  const filename = href.substr(fileindex + 1);
  if (/^([-\w]+)\.md$/.test(filename)) {
    href = href.replace(/\.md$/, '.html');
  }
  title = title || text;
  return `<a href="${href}" title="${title}">${text}</a>`;
};

marked.setOptions({
  renderer,
});

exports.formatMarkdown = function formatMarkdown(md) {
  const markdownHtml = marked(md);
  return markdownHtml;
};

exports.parseMarkdownParts = function parseMarkdownParts(babelConfig) {
  return function (md, options = {}) {
    // 获取 meta 信息
    function split(str) {
      if (str.slice(0, 3) !== '---') return;
      const matcher = /\n(\.{3}|-{3})/g;
      const metaEnd = matcher.exec(str);
      return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
    }

    const splited = split(md);
    const result = {
      meta: {},
      content: md,
      code: '',
    };

    if (splited) {
      result.meta = yaml.safeLoad(splited[0]);
      result.content = splited[1];
    }

    importStyle = !!result.meta.importStyle;

    if (options.sliceCode) {
      const JSX_REG = /(````)(?:jsx?)([^\1]*?)(\1)/g;
      const STYLE_REG = /(````)(?:css|style?)([^\1]*?)(\1)/g;

      const jsxMatched = JSX_REG.exec(result.content);
      const styleMatched = STYLE_REG.exec(result.content);

      if (jsxMatched) {
        result.code = jsxMatched[2] || '';
        result.content = result.content.replace(jsxMatched[0], '');
      }

      if (styleMatched) {
        const styleCode = styleMatched[2] || '';
        result.highlightedStyle = prismjs.highlight(styleCode.trim(), prismjs.languages.css);
      }

      result.highlightedCode = prismjs.highlight(result.code.trim(), prismjs.languages.jsx);
      result.compiledCode = bableCompile(result.code, babelConfig);
    }
    result.content = marked(result.content);

    return result;
  };
};
