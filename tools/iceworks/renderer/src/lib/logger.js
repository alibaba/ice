import electronLog from 'electron-log';

electronLog.transports.file.fileName = 'renderer.log';
electronLog.transports.file.level = 'info';

electronLog.transports.arms = (msg) => {
  // eslint-disable-next-line
  window.__bl && __bl.error(msg.data[0]);
};
electronLog.transports.arms.level = 'error';

export default electronLog;
