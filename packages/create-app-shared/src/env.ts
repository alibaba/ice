import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isWeb } from 'universal-env';

export const isMiniAppPlatform = (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) && !isWeb;
export * from 'universal-env';
