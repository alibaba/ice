import { WECHAT_MINIPROGRAM, ALI_MINIAPP, BAIDU_SMARTPROGRAM, BYTEDANCE_MICROAPP } from '../constant.js';
import type { TargetConfig } from '../types.js';
import wechat from './wechat/index.js';
import bytedance from './bytedance/index.js';
import baidu from './baidu/index.js';
import ali from './ali/index.js';

// TODO: Add KUAISHOU_MINIPROGRAM.
export default function getMiniappTargetConfig(target: string): TargetConfig {
  switch (target) {
    case WECHAT_MINIPROGRAM:
      return wechat;
    case ALI_MINIAPP:
      return ali;
    case BYTEDANCE_MICROAPP:
      return bytedance;
    case BAIDU_SMARTPROGRAM:
      return baidu;
    default:
      return wechat;
  }
}
