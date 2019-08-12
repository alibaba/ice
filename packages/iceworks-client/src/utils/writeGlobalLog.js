import termManager from './termManager';

function writeGlobalLog(msg, isStdout = true) {
  const logType = isStdout ? 'globalProcessLog' : 'globalOperationLog';
  const term = termManager.find(logType);
  if (term) {
    const writeLogType = isStdout ? 'writeChunk' : 'writeLog';
    term[writeLogType](msg);
  }
}

export default writeGlobalLog;
