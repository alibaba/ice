import * as path from 'path';
import { fileURLToPath } from 'url';
import * as htmlparser2 from 'htmlparser2';
import ejs from 'ejs';
import fse from 'fs-extra';
import __createElement from './domRender.js';
import { generateSourceMap } from './sourcemap.js';

let dirname;
if (typeof __dirname === 'string') {
  dirname = __dirname;
} else {
  dirname = path.dirname(fileURLToPath(import.meta.url));
}

export async function renderHTMLToJS(html) {
  let jsOutput = '';
  const dom = htmlparser2.parseDocument(html);
  const sourceMapInfo = {
    sourceMapFileList: [],
  };

  let headElement;
  let bodyElement;
  function findElement(node) {
    if (headElement && bodyElement) return;

    if (node.name === 'head') {
      headElement = node;
    } else if (node.name === 'body') {
      bodyElement = node;
    }

    const {
      children = [],
    } = node;
    children.forEach(findElement);
  }
  findElement(dom);

  const extraScript = [];
  function parse(node) {
    const {
      name,
      attribs,
      data,
      children,
    } = node;
    let resChildren = [];

    if (children) {
      if (name === 'script' && children[0] && children[0].data) {
        extraScript.push(`(function(){${children[0].data}})();`);
        if (attribs['data-sourcemap']) {
          sourceMapInfo.sourceMapFileList.push(attribs['data-sourcemap']);
        }
      } else {
        resChildren = node.children.map(parse);
      }
    }

    return {
      tagName: name,
      attributes: attribs,
      children: resChildren,
      text: data,
    };
  }

  const head = parse(headElement);
  const body = parse(bodyElement);

  const templateContent = fse.readFileSync(path.join(dirname, '../templates/js-entry.js.ejs'), 'utf-8');
  jsOutput = ejs.render(templateContent, {
    createElement: __createElement,
    head,
    body,
    extraScript,
  });

  // Generate souceMap for entry js.
  const sourceMap = await generateSourceMap(sourceMapInfo);

  return {
    jsOutput,
    sourceMap,
  };
}