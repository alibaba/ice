import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';

export default async function(targetPath, templatePath, storesDir) {

  let stores = [];
  try {
    // TODO: 过滤、嵌套
    stores = await fse.readdir(storesDir);
    stores = stores.map(item => path.parse(item).name);
  } catch(err) {
    console.error('read stores err', err);
  }

  let importCodes = '';
  let storesString = '';
  stores.forEach((storeFileName) => {
    importCodes += `\nimport ${storeFileName} from '${storesDir}/${storeFileName}';`;
    storesString += `${storeFileName},`;
  });

  // 遍历 stores 目录
  const templateContent = fse.readFileSync(templatePath, 'utf-8');
  const content = ejs.render(templateContent, {
    importCodes,
    storesString,
  });

  fse.writeFileSync(targetPath, content, 'utf-8');
}
