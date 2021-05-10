import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isWeb, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';

export const isMiniAppPlatform = (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) && !isWeb;
export * from 'universal-env';
