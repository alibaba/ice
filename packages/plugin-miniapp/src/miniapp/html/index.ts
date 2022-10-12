interface ComponentConfig {
  includes: Set<string>;
}

interface OnParseCreateElementArgs {
  nodeName: string;
  componentConfig: ComponentConfig;
}

const inlineElements = ['i', 'abbr', 'select', 'acronym', 'small', 'bdi', 'kbd', 'strong', 'big', 'sub', 'sup', 'br', 'mark', 'meter', 'template', 'cite', 'object', 'time', 'code', 'output', 'u', 'data', 'picture', 'tt', 'datalist', 'var', 'dfn', 'del', 'q', 'em', 's', 'embed', 'samp', 'b'];
const blockElements = ['body', 'svg', 'address', 'fieldset', 'li', 'span', 'article', 'figcaption', 'main', 'aside', 'figure', 'nav', 'blockquote', 'footer', 'ol', 'details', 'p', 'dialog', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'dd', 'header', 'section', 'div', 'hgroup', 'table', 'dl', 'hr', 'ul', 'dt', 'view', 'view-block'];
const specialElements = ['slot', 'form', 'iframe', 'img', 'audio', 'video', 'canvas', 'a', 'input', 'label', 'textarea', 'progress', 'button'];

// 收集使用到的小程序组件
export default function onParseCreateElement({ nodeName, componentConfig }: OnParseCreateElementArgs) {
  if (!(
    inlineElements.includes(nodeName) ||
    blockElements.includes(nodeName) ||
    specialElements.includes(nodeName)
  )) return;

  const simple = ['audio', 'button', 'canvas', 'form', 'label', 'progress', 'textarea', 'video'];
  const special = {
    a: ['navigator'],
    iframe: ['web-view'],
    img: ['image'],
    input: ['input', 'checkbox', 'radio'],
  };
  const { includes } = componentConfig;

  if (simple.includes(nodeName) && !includes.has(nodeName)) {
    includes.add(nodeName);
  } else if (nodeName in special) {
    const maps = special[nodeName];
    maps.forEach(item => {
      !includes.has(item) && includes.add(item);
    });
  }
}
