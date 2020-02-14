import * as path from 'path';
import generateStore from './generateStore';

export default async function ({
  context,
  getValue,
  applyMethod,
  onHook,
  onGetWebpackConfig,
}) {
  const { rootDir } = context;
  const targetPath = path.join(getValue('ICE_TEMP'), 'store.ts');
  const templatePath = path.join(__dirname, './template/store.ts.ejs');
  const storesDir = path.join(rootDir, 'src/stores');

  onGetWebpackConfig((config: any) => {
    // add alias for module.ts use $ice/helpers
    config.resolve.alias.set('$ice/store', targetPath);
  });

  handleStoresDirChange(targetPath, templatePath, storesDir, applyMethod);
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /stores\/.*/, (event, filepath) => {
      console.log('wacthFileChange', filepath);
      handleStoresDirChange(targetPath, templatePath, storesDir, applyMethod);
    });
  });
}

async function handleStoresDirChange(targetPath, templatePath, storesDir, applyMethod) {
  console.log('handleStoresDirChange', targetPath, templatePath)

  // 生成 .ice/store.ts
  await generateStore(targetPath, templatePath, storesDir);

  // .ice/index.ts: export connect for view
  // import { connect } from 'react-redux';
  // export { connect }
  applyMethod('addIceExport', { source: 'react-redux', specifier: '{ connect }', exportName: 'connect' });
}
