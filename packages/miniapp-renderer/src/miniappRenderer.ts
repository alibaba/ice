import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';

function miniappRenderer({ appConfig, createBaseApp, createHistory, staticConfig }) {
  const env = { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp };
  createBaseApp(appConfig, {}, { env });
  createHistory({ routes: staticConfig.routes });
};

export default miniappRenderer;
