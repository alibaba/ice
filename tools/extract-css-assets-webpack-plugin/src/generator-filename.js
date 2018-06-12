/**
 * 通过 url 地址生成文件名，提取文件名使用
 */

export default function generatorFilename(url) {
  const fileDirectory = url.split('/');

  return fileDirectory.pop();
}
