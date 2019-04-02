import electronLog from 'electron-log';

electronLog.transports.file.fileName = 'renderer.log';
electronLog.transports.file.level = 'info';

export default electronLog;