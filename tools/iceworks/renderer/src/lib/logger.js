import electronLog from 'electron-log';

electronLog.transports.file.fileName = 'renderer.log';
electronLog.transports.file.level = 'info';

electronLog.transports.arms = (msg) => {
  if (window.__bl && (typeof window.__bl.error === 'function')) {
    window.__bl.error(msg.data[0]);
  }
};
electronLog.transports.arms.level = 'error';

export default electronLog;
