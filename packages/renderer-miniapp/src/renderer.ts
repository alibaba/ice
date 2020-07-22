import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';

function renderer({ appConfig, createApp, createHistory, staticConfig }) {
  const env = { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp };
  createApp(appConfig, {}, { env });
  createHistory({ routes: staticConfig.routes });
};

export default renderer;
