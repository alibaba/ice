import * as path from 'path';
import * as fse from 'fs-extra';

const PLUFIN_AUTH_DIR = 'auth';

export default async function (api) {
  const { getValue, onGetWebpackConfig, applyMethod } = api;
  const iceTemp = getValue('ICE_TEMP');

  // 复制模板到 .ice/auth 目录下
  const templateSourceDir = path.join(__dirname, '../template');
  const TemplateTargetDir = path.join(iceTemp, PLUFIN_AUTH_DIR);
  fse.ensureDirSync(TemplateTargetDir);
  fse.copySync(templateSourceDir, TemplateTargetDir);

  onGetWebpackConfig((config) => {
    // 设置 $ice/authStore -> .ice/auth/store.ts
    config.resolve.alias.set('$ice/authStore', path.join(iceTemp, PLUFIN_AUTH_DIR, 'store.ts'));
  });

  // 导出接口
  applyMethod('addIceExport', { source: './auth' });
}
