import { type AppConfig, runApp } from 'ice';

const appConfig: AppConfig = {
  getInitialData: function() {
    return {};
  },
  auth: {
    NoAuthFallback: <>no auth</>,
  },
}

runApp(appConfig);