import type { ESLint as TypeESLint } from 'eslint';
import { parentPort, Worker, isMainThread } from 'worker_threads';
import type { Options } from './index';

function createESLintEngine(options: Options) {
  let eslint: TypeESLint;
  try {
    // eslint-disable-next-line global-require
    const { ESLint } = require('eslint');
    const overrideConfigFile = options.configFile
      ? { overrideConfigFile: options.configFile }
      : {};
    const lintOptions = {
      cache: !!options.cache,
      fix: !!options.fix,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      ...overrideConfigFile,
    };
    eslint = new ESLint(lintOptions);
  } catch (e) {
    // make sure message output after clearConsole by vite server
    setTimeout(() => {
      console.log('some error occurred in eslint checker. please check dependencies of eslint(>7.0.0) and your eslint config, see: https://www.yuque.com/hedgqh/quality/lint');
      console.log('');
      console.log('');
    });
  }

  return eslint;
}

async function lintFile(eslint: TypeESLint, formatter: string | TypeESLint.Formatter, file: string): Promise<void> {
  if (!await eslint.isPathIgnored(file)) {
    const report = await eslint.lintFiles(file);
    let eslintFormatter: TypeESLint.Formatter;
    switch (typeof formatter) {
      case 'string':
        eslintFormatter = await eslint.loadFormatter(formatter);
        break;
      case 'function':
        eslintFormatter = formatter;
        break;
      default:
        eslintFormatter = await eslint.loadFormatter('stylish');
    }
    console.log(eslintFormatter.format(report));
  }
}

const initMainThread = () => {
  return new Worker(__filename);
};

const initWorkerThread = () => {
  if (!parentPort) throw Error('parentPort is missing, check file runs in worker thread');
  let eslint: TypeESLint;
  const port = parentPort.on('message', (action) => {
    switch (action.type) {
      case 'configESLint': {
        const options = action.payload as Options;
        eslint = createESLintEngine(options);
        break;
      }
      case 'lintFile': {
        const { formatter, file } = action.payload as Pick<Options, 'formatter'> & { file: string};
        if (eslint && file) {
          lintFile(eslint, formatter, file);
        }
        break;
      }
      case 'unref':
        port.unref();
        break;
      default:
        break;
    }
  });
};

// run initWorkerThread in worker thread
if (!isMainThread) {
  initWorkerThread();
}

export default initMainThread;
