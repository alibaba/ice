import chalk from 'chalk';

import type { NormalizedRaxCompatPluginOptions, PluginAPI } from '../../typings';

import { applyClientSideStyleProcessor } from './applyClientSideProcessor.js';
import { applyJSXClassNameTransformer } from './applyJSXClassNameTransormer.js';
import { applyServerSideStyleProcessor } from './applyServerSideProcessor.js';

/**
 * Handle inline style related.
 */
export class StyleService {
  private static inlineStyleWarnOnce = false;

  public static provide(api: PluginAPI, options: NormalizedRaxCompatPluginOptions) {
    if (!options.inlineStyle) return;

    const logger = api.createLogger('rax-compat-plugin:style');

    if (!StyleService.inlineStyleWarnOnce && options.inlineStyle === true) {
      logger.warn(`通常情况下你不应该全量启用内联样式。请考虑使用函数式的写法来控制内联样式的影响范围：
      ${chalk.green("inlineStyle: (id) => id.includes('inline-style-module')")}`);
      StyleService.inlineStyleWarnOnce = true;
    }

    applyJSXClassNameTransformer(api, options);

    applyClientSideStyleProcessor(api, options);
    applyServerSideStyleProcessor(api, options);
  }
}
