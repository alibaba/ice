import fetch from 'node-fetch';

export async function getNpmInfos(packageName) {
  const response = await fetch(`https://registry.npmmirror.com/${packageName}/latest`);
  const res = (JSON.parse(await response.text()) || {});
  return res;
}
