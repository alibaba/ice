import type { MiniappWebpackOptions, MiniappWebpackConfig } from '../../types.js';
import { MiniCombination } from './combination.js';

export default function getMiniappWebpackConfig(rawConfig: MiniappWebpackOptions): MiniappWebpackConfig {
  const combination = new MiniCombination(rawConfig.rootDir, rawConfig);

  return combination.process();
}
