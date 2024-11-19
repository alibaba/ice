import loaderUtils from '@ice/bundles/compiled/loader-utils/index.js';

const { isUrlRequest, urlToRequest } = loaderUtils;
export default async function (source) {
  const REG_REQUIRE = /require\(['"](.+\.wxs)['"]\)/g;
  const callback = this.async();
  const importings: any[] = [];
  let res;

  try {
    while ((res = REG_REQUIRE.exec(source)) !== null) {
      const dep = res[1];
      if (isUrlRequest(dep)) {
        const request = urlToRequest(dep);
        importings.push(this.importModule(request));
      }
    }
    await Promise.all(importings);
    callback(null, source);
  } catch (error) {
    callback(error, source);
  }
}
