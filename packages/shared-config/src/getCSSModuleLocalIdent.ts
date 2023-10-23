import { createHash } from 'crypto';
import { getCssModulesLocalIdent as getIdentByRust } from '@ice/bundles';

export default function getCSSModuleLocalIdent(filename: string, localName: string, localIdentName: string): string {
  // https://webpack.js.org/loaders/css-loader/#localidentname
  if (localIdentName) {
    return getIdentByRust(filename, localName, localIdentName);
  }

  const hash = createHash('md5');
  hash.update(Buffer.from(filename + localName, 'utf8'));
  const localIdentHash = hash.digest('base64')
    // Remove all leading digits
    .replace(/^\d+/, '')
    // Replace all slashes with underscores (same as in base64url)
    .replace(/\//g, '_')
    // Remove everything that is not an alphanumeric or underscore
    .replace(/[^A-Za-z0-9_]+/g, '')
    .slice(0, 8);

  return `${localName}--${localIdentHash}`;
}
