import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isWeb, isBaiduSmartProgram, isKuaishouMiniprogram } from 'universal-env';

export const isMiniAppPlatform = (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaishouMiniprogram) && !isWeb;
export * from 'universal-env';
