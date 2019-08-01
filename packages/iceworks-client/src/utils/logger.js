import * as loglevel from 'loglevel';
import * as prefix from 'loglevel-plugin-prefix';
import alifeLogger from 'alife-logger';

const remote = {
  apply(logger) {
    const remoteConfig = {
      level: 'error',
    };
    const remoteLog = alifeLogger.singleton({
      pid: 'cippwynyfx@7e33275a2b3909b',
      enableSPA: true,
      useFmp: true,
      sendResource: true,
      imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
    });

    const originalFactory = logger.methodFactory;
    // eslint-disable-next-line
    logger.methodFactory = function (methodName, logLevel, loggerName) {
      const rawMethod = originalFactory(methodName, logLevel, loggerName);
      const levelVal = logger.levels[methodName.toUpperCase()];
      const needLog = levelVal >= logger.levels[remoteConfig.level.toUpperCase()];

      return (...args) => {
        if (needLog) {
          remoteLog.error(args[0]);
        }

        rawMethod(...args);
      };
    };
    logger.setLevel(logger.getLevel());

    return logger;
  },
};

const GLOBAL_NAEME = 'iceworks';
prefix.reg(loglevel);
prefix.apply(loglevel, {
  template: '[%t] %l (%n):',
  levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter(name) {
    return name || GLOBAL_NAEME;
  },
  timestampFormatter(date) {
    return date.toISOString();
  },
});

if (process.env.NODE_ENV === 'development') {
  loglevel.setLevel('trace');
} else {
  remote.apply(loglevel);

  loglevel.setLevel('info');
}

export default loglevel;
