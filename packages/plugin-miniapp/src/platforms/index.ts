import { WECHAT_MINIPROGRAM, ALI_MINIAPP, BAIDU_SMARTPROGRAM, BYTEDANCE_MICROAPP } from '../constant.js';
import type { PlatformConfig } from '../types.js';
import wechat from './wechat/index.js';
import bytedance from './bytedance/index.js';
import baidu from './baidu/index.js';
import ali from './ali/index.js';

// TODO:缺少快手小程序
export default function getMiniappPlatformConfig(platform: string): PlatformConfig {
  switch (platform) {
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
