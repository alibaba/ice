/**
 * 扫描项目目录下的 layouts
 */
import fs from 'fs';
import path from 'path';
import uppercamelcase from 'uppercamelcase';

import { getLayouts } from './materials';

/**
 * 返回 layout[] 数据
 * 扫描规则: 根据 layouts 目录中的文件夹名称进行匹配
 * 1. 优先匹配
 */
const defaultImage =
  'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';

async function scanLayout({ targetPath }) {
  const layoutsPath = path.join(targetPath, 'layouts');

  let localCustomLayoutNames = [];
  if (!fs.existsSync(layoutsPath)) {
    localCustomLayoutNames = [];
  } else {
    localCustomLayoutNames = fs
      .readdirSync(layoutsPath)
      .filter((name) => !/^\./.test(name))
      .filter((file) => {
        const fullPath = path.join(layoutsPath, file);
        const stat = fs.statSync(fullPath);
        return stat.isDirectory();
      });
  }

  return localCustomLayoutNames.map((layoutName) => {

    const layoutPath = path.join(layoutsPath, layoutName);
    const readmePath = path.join(layoutPath, 'README.md');

    return {
      // 将驼峰名统一成 - 分隔符
      name: layoutName,
      title: layoutName,
      description: fs.existsSync(readmePath)
        ? fs.readFileSync(readmePath, 'utf-8')
        : '用户自定义布局 - ' + layoutName,
      customLayout: true,
      localization: true,
      folderName: layoutName,
      screenshot: defaultImage,
      thumbnail: defaultImage,
    };
  });
}

scanLayout.layoutValidate = (targetPath) => {
  return fs.existsSync(path.join(targetPath, 'layouts'));
};

export default scanLayout;
