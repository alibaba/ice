/* eslint-disable react-hooks/rules-of-hooks */
import * as path from 'path';
import * as fse from 'fs-extra';
import { useInject, useContext } from '@midwayjs/hooks';
import generateCSRHTML from './generateCSRHTML';
import { generateSSRLocalHTML, generateSSRProdHTML } from './generateSSRHTML';
import replaceUrl from './replaceUrl';
import formatHTML from './formatHTML';
import type { IHTMLOptions } from './formatHTML';

interface RenderOptions extends IHTMLOptions {
  initialData?: object;
  template?: string;
}

export default async function render(options?: RenderOptions) {
  const { template = 'index', initialData } = options || {};
  const devEnvs = ['local', 'development', 'dev'];
  const baseDir = await useInject('baseDir');
  const ctx = useContext();
  let htmlContent = '';
  // read build config from temp folder
  const buildConfig = fse.readJSONSync(process.env.BUILD_CONFIG_PATH);
  const replaceCDN = buildConfig?.cloud && !devEnvs.includes(ctx.env) && ctx.env !== 'prod';

  if (buildConfig?.ssrBundle) {
    if (devEnvs.includes(ctx.env)) {
      htmlContent = await generateSSRLocalHTML(ctx, initialData, buildConfig?.ssrBundle);
    } else {
      const assetsPath = replaceCDN ? replaceUrl(buildConfig?.assetsPath) : buildConfig?.assetsPath;
      htmlContent = await generateSSRProdHTML(ctx, initialData, assetsPath);
    }
  } else {
    const htmlPath = path.join(buildConfig.htmlPath, `${template}.html`);
    // csr render
    // 仅在云端预发环境下替换
    htmlContent = generateCSRHTML(htmlPath, { replaceCDN, baseDir });
  }

  htmlContent = formatHTML(htmlContent, {
    ...options,
    faasEnv: ctx.env,
  });

  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = htmlContent;
}