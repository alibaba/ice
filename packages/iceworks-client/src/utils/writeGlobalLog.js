import termManager from './termManager';

function writeGlobalLog(msg) {
  const term = termManager.find('globalTerminal');
  term.writeLog(msg);
}

export default writeGlobalLog;
