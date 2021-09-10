import * as path from 'path';
import { pathExistsSync } from 'fs-extra';

export default function hasWebManifest (rootDir: string) {
  return pathExistsSync(
    path.join(rootDir, 'public/manifest.json')
  );
}