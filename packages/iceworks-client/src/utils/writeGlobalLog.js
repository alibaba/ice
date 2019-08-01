import termManager from './termManager';

function writeGlobalLog(msg, isStdout) {
  const term = termManager.find('globalTerminal');
  if (isStdout) {
    term.writeChunk(msg);
  } else {
    term.writeLog(msg);
  }
}

export default writeGlobalLog;
