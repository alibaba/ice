import termManager from './termManager';

function writeGlobalLog(msg, isStdout = true) {
  let term = termManager.find(isStdout ? 'globalProcessLog' : 'globalOperationLog');
  if (term) {
    term[isStdout ? 'writeChunk' : 'writeLog'](msg);
  }
}

export default writeGlobalLog;
