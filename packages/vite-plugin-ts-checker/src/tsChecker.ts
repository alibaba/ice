import * as ts from 'typescript';
import * as os from 'os';
import { parentPort, Worker, isMainThread } from 'worker_threads';
import formatDiagnosticMessage from './formatDiagnosticMessage';

const initMainThread = () => {
  if (isMainThread) {
    return new Worker(__filename);
  }
};

const initWorkerThread = () => {
  if (!isMainThread) {
    if (!parentPort) throw Error('parentPort is missing, check file runs in worker thread');
    const port = parentPort.on('message', (action) => {
      switch (action.type) {
        case 'configTsCheck':
          createTsDiagnostic(action.payload.rootDir);
          break;
        case 'unref':
          port.unref();
          break;
        default:
          break;
      }
    });
  }
};

const createTsDiagnostic = (rootDir: string) => {
  const configFile = ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.json');
  if (configFile) {
    let logChunk = '';

    const reportDiagnostic = (diagnostic: ts.Diagnostic) => {
      logChunk += `${os.EOL}${formatDiagnosticMessage(diagnostic)}`;
    };
  
    const reportWatchStatus: ts.WatchStatusReporter = (
      diagnostic,
      newLine,
      options,
      errorCount
    ) => {
      // https://github.com/microsoft/TypeScript/issues/32542
      switch (diagnostic.code) {
        case 6031:  // Initial build
          // return function when it is unnecessary to log message when initial build
          return;
        case 6032:  // Incremental build
          // clear current error and use the newer errors
          logChunk = '';
          break;
        case 6193: // 1 Error
          break;
        case 6194: // 0 errors or 2+ errors
          if (errorCount === 0) {
            logChunk = '';
          }
          break;
        default:
          break;
      }
      console.log(`${logChunk}${os.EOL}${diagnostic.messageText.toString()}`);
    };
    const createProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram;
    const host = ts.createWatchCompilerHost(
      configFile,
      { noEmit: true },
      ts.sys,
      createProgram,
      reportDiagnostic,
      reportWatchStatus,
    );
    ts.createWatchProgram(host);
  }
};

const worker = initMainThread();
initWorkerThread();

export default worker;