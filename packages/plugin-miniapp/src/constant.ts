export const WEB = 'web';
export const ALI_MINIAPP = 'ali-miniapp';
export const WECHAT_MINIPROGRAM = 'wechat-miniprogram';
export const BYTEDANCE_MICROAPP = 'bytedance-microapp';
export const BAIDU_SMARTPROGRAM = 'baidu-smartprogram';
export const KUAISHOU_MINIPROGRAM = 'kuaishou-miniprogram';

export const MINIAPP_TARGETS = [
  ALI_MINIAPP,
  WECHAT_MINIPROGRAM,
  BYTEDANCE_MICROAPP,
  BAIDU_SMARTPROGRAM,
  KUAISHOU_MINIPROGRAM,
];
export const ALL_TARGETS = [WEB, ...MINIAPP_TARGETS];

export const MINIAPP_TARGET_FOLDER_NAMES = {
  [ALI_MINIAPP]: 'ali',
  [WECHAT_MINIPROGRAM]: 'wechat',
  [BYTEDANCE_MICROAPP]: 'bytedance',
  [BAIDU_SMARTPROGRAM]: 'baidu',
  // TODO: add kuaishou
};
