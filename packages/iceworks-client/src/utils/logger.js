import * as loglevel from 'loglevel';
import * as prefix from 'loglevel-plugin-prefix';
import alifeLogger from 'alife-logger';

const remote = {
  apply(logger) {
    const remoteConfig = {
      level: 'error'
    };
    const __bl = alifeLogger.singleton({
      pid: 'cippwynyfx@7e33275a2b3909b',
      enableSPA: true,
      useFmp: true,
      sendResource:true,
      imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?'
    });
    
    const originalFactory = logger.methodFactory;
    logger.methodFactory = function remoteMethodFactory(methodName, logLevel, loggerName) {
      const rawMethod = originalFactory(methodName, logLevel, loggerName);
      const levelVal = logger.levels[methodName.toUpperCase()];
      const needLog = levelVal >= logger.levels[remoteConfig.level.toUpperCase()];

      return (...args) => {
        if (needLog) {
          __bl.error(args[0]);
        }

        rawMethod(...args);
      };
    };
    logger.setLevel(logger.getLevel());

    return logger;
  }
};

prefix.reg(loglevel);
prefix.apply(loglevel, {
  template: '[%t] %l (%n):',
  levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter(name) {
    return name || 'iceworks';
  },
  timestampFormatter(date) {
    return date.toISOString();
  },
});
remote.apply(loglevel);

loglevel.setLevel('trace');

export default loglevel;