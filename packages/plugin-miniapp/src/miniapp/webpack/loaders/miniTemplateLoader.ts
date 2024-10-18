import loaderUtils from '@ice/bundles/compiled/loader-utils/index.js';
import sax from 'sax';

const { isUrlRequest, urlToRequest } = loaderUtils;
export default function miniTemplateLoader(source: string) {
  this.cacheable && this.cacheable();
  /**
   * 两种fix方案：
   * 1. 用任意xml标签包裹source，使之变成较标准的xml格式（含有一个根节点）
   * 2. 修改 sax.parser 的第一个参数为 true，启用严格模式
   *    2.1 该模式下小程序模板中的标签或属性不会处理（例如写入<Import SrC="..." />不会处理成<import src="..." />，而是保持原样
   *    2.2 该模式将认为传入的xml为非标准的，无需标准化，且不按照以根节点模式处理，因此可以正常解析小程序模板
   *
   * 推荐方案1，这样在构建时会正常打入需要的包，但是若用户有 SrC 类似的写法导致引用失败，则可直接修正，不会认为是打包出现了问题
   * */
  const sourceWithRoot = `<root>${source}</root>`;
  const parser = sax.parser(false, { lowercase: true });
  const requests = new Map<string, {
    url: string;
    // attribute name
    name: string;
  }>();
  const callback = this.async();
  const loadModule = (request) => this.importModule(request);

  parser.onattribute = (attr) => {
    const { name, value } = attr;
    if (value && (name === 'src' || name === 'from') && isUrlRequest(value) && !requests.has(value)) {
      const request = urlToRequest(value);
      requests.set(value, {
        url: request,
        name: name,
      });
    }
  };
  parser.onend = async () => {
    try {
      const requestsArray = Array.from(requests.values()).map(req => req.url);
      if (requestsArray.length) {
        for (let i = 0; i < requestsArray.length; i++) {
          await loadModule(requestsArray[i]);
        }
      }
      for (let url of requests.keys()) {
        if (url.indexOf('node_modules/') !== -1) {
          const changedUrl = url.replace(/^.*node_modules\//, '/npm/');
          source = source.replace(url, changedUrl);
        }
      }
      callback(null, source);
    } catch (error) {
      callback(error, source);
    }
  };
  parser.write(sourceWithRoot).close();
}
