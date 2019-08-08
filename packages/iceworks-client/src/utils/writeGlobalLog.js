import termManager from './termManager';

function writeGlobalLog(msg, isStdout = true) {
  let term;
  if (isStdout) {
    term = termManager.find('globalProcessLog');
    term.writeChunk(msg);
  } else {
    term = termManager.find('globalOperationLog');
    term.writeLog(msg);
  }
}

export default writeGlobalLog;
