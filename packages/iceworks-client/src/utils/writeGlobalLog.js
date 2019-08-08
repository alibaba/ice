import termManager from './termManager';

function writeGlobalLog(msg, isStdout = true) {
  let term;
  if (isStdout) {
    term = termManager.find('globalProcessLog');
    if (term) {
      term.writeChunk(msg);
    }
  } else {
    term = termManager.find('globalOperationLog');
    if (term) {
      term.writeLog(msg);
    }
  }
}

export default writeGlobalLog;
