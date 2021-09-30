import * as path from 'path';
import * as fse from 'fs-extra';
import axios from 'axios';
import type { FaaSContext } from '@midwayjs/faas';

export async function generateSSRLocalHTML(
  ctx: FaaSContext, initialData: any, bundlePath: string
): Promise<string> {
  delete require.cache[bundlePath];
  const htmlContent = await renderSSR(bundlePath, {
    ctx,
    pathname: ctx.req.path,
    initialData,
  });

  return htmlContent;
}

export async function generateSSRProdHTML(
  ctx: FaaSContext, initialData: any, assetsPath: string,
): Promise<string> {
  const tmpDir = '/tmp';
  const serverBundle = 'server/index.js';
  const loadableStats = 'loadable-stats.json';

  const serverBundlePath = path.join(tmpDir, serverBundle);
  const loadableStatsPath = path.join(tmpDir, loadableStats);

  const loadableStatsFiles = [serverBundle, loadableStats];
  await Promise.all(loadableStatsFiles.map((statsFile) => {
    const filePath = path.join(tmpDir, statsFile);
    const bundleUrl = `${assetsPath}/${statsFile}`;
    return ensureBundleExists(bundleUrl, filePath);
  }));
  
  // download other server bundles
  const serverLoadableStatsContent = fse.readJSONSync(loadableStatsPath);
  const { assetsByChunkName } = serverLoadableStatsContent;

  await Promise.all(assetsByChunkName.map((chunkName: string) => {
    const bundleFileName = `server/${assetsByChunkName[chunkName]}`;

    const filePath = path.join(tmpDir, bundleFileName);
    const bundleUrl = `${assetsPath}/${bundleFileName}`;
    return ensureBundleExists(bundleUrl, filePath);
  }));

  const htmlContent = await renderSSR(serverBundlePath, {
    ctx,
    pathname: ctx.req.path,
    initialData,
    loadableStatsPath,
    publicPath: assetsPath,
  });

  return htmlContent;
}

async function ensureBundleExists(bundleUrl: string, filePath: string) {
  if (!fse.existsSync(filePath)) {
    console.log('[SSR]', 'start download sever bundle', bundleUrl, filePath);
    fse.ensureFileSync(filePath);
    await downloadFile(bundleUrl, filePath);
    console.log('[SSR]', 'download sever bundle success', filePath);
  }
}

function downloadFile(url: string, filepath: string) {
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url,
      responseType: 'stream',
    }).then((response: any) => {
      response.data.pipe(fse.createWriteStream(filepath));
      response.data.on('end', resolve);
    });
  });
}

interface SSROptions {
  htmlTemplate?: string;
  pathname: string;
  initialData: any;
  ctx: FaaSContext;
  loadableStatsPath?: string;
  publicPath?: string;
}

async function renderSSR(serverBundlePath: string, options: SSROptions): Promise<string> {
  console.log('[SSR]', 'start server render');
  // eslint-disable-next-line
  const serverRender = require(serverBundlePath);
  const { html, error } = await serverRender.default(options);
  if (error) {
    console.log('[SSR ERROR]', 'serverRender error', error);
  }
  console.log('[SSR]', 'output html content\n');
  return html;
}