const { statStorage } = require('./services/storage');
const logger = require('./logger');
const glodlog = require('./glodlog');
const settings = require('./services/settings');

module.exports = {
  record() {
    const isAlibaba = settings.get('isAlibaba');
    const currentDate = new Date().toDateString();
    const prevDate = statStorage.get();
    if (prevDate !== currentDate) {
      logger.debug('dav record');
      statStorage.set(currentDate);
      glodlog.record({
        type: 'app', 
        action: 'dau',
        group: isAlibaba ? 'alibaba' : 'outer',
      });
    }
  },
};
