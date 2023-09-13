import * as path from 'path';
import { getCSSModuleLocalIdent } from '@ice/shared-config';
import { getCssModulesLocalIdent as getIdentByRust } from '@ice/bundles';
import { CSS_MODULES_LOCAL_IDENT_NAME, CSS_MODULES_LOCAL_IDENT_NAME_DEV } from '../constant.js';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';

interface Options {
  rootDir?: string;
  rule?: string;
  mode?: 'development' | 'production';
  fileName: string;
  localName: string;
  localIdentName: string;
}

// TODO: move this logic to getCSSModuleLocalIdent.
const getCSSModuleIdent = (options: Options) => {
  const { rootDir, fileName, localName, localIdentName, rule, mode } = options;
  if (rule === 'native') {
    const template = mode === 'development' ? CSS_MODULES_LOCAL_IDENT_NAME_DEV : CSS_MODULES_LOCAL_IDENT_NAME;
    const relativePath = path.isAbsolute(fileName) ? path.relative(rootDir, fileName) : fileName;
    return getIdentByRust(relativePath, localName, localIdentName || template);
  } else {
    return escapeLocalIdent(getCSSModuleLocalIdent(fileName, localName, localIdentName));
  }
};

export default getCSSModuleIdent;
