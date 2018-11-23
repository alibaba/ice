const { statStorage } = require('./services/storage');
const logger = require('./logger');
const settings = require('./services/settings');

module.exports = {
  record: function() {
    const isAlibaba = settings.get('isAlibaba');
    const currentDate = new Date().toDateString();
    const prevDate = statStorage.get();
    if (prevDate !== currentDate) {
      logger.debug('dav record');
      statStorage.set(currentDate);
      logger.report('app', {
        action: 'dau',
        group: isAlibaba ? 'alibaba' : 'outer',
      });
    }
  },
};
