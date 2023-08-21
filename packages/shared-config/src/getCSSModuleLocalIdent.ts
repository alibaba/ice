import { createHash } from 'crypto';

export default function getCSSModuleLocalIdent(filename: string, localName: string) {
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
