import path from 'path';
import { fileURLToPath } from 'url';

import type { NormalizedRaxCompatPluginOptions, PluginAPI } from '../typings';

const dirname = __dirname ?? path.dirname(fileURLToPath(import.meta.url));

export class TypingsService {
  public static provide(api: PluginAPI, options: NormalizedRaxCompatPluginOptions) {
    api.generator.addRenderFile(path.join(dirname, '../templates/rax-compat.d.ts'), 'rax-compat.d.ts', {});

    api.generator.addExport({
      // Avoid value import to cause Webpack compilation error:
      // 'Export assignment cannot be used when targeting ECMAScript modules.'
      specifier: ['type __UNUSED_TYPE_FOR_IMPORT_EFFECT_ONLY__'],
      source: './rax-compat.d',
      type: false,
    });
  }
}
