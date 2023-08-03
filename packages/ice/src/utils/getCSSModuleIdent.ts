import * as path from 'path';
import { getCSSModuleLocalIdent } from '@ice/webpack-config';
import { getCssModulesLocalIdent as getIdentByRust } from '@ice/css-modules-hash';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';

interface Options {
  rootDir?: string;
  rule?: string;
  mode?: 'development' | 'production';
  fileName: string;
  localIdentName: string;
}

const getCSSModuleIdent = (options: Options) => {
  const { rootDir, fileName, localIdentName, rule, mode } = options;
  if (rule === 'native') {
    const template = mode === 'development' ? '[path][name][ext]__[local]' : '[hash]';
    const relativePath = path.isAbsolute(fileName) ? path.relative(rootDir, fileName) : fileName;
    return getIdentByRust(relativePath, localIdentName, template);
  } else {
    return escapeLocalIdent(getCSSModuleLocalIdent(fileName, localIdentName));
  }
};

export default getCSSModuleIdent;
