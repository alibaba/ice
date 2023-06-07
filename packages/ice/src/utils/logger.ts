import type { Consola, ConsolaLogObject } from 'consola';
import consola from 'consola';

// In ice.js, we use DEBUG_TAG instead of DEBUG to avoid other libs which use `DEBUG` as their flag log debug info.
const { DEBUG_TAG, npm_lifecycle_event } = process.env;

function getEnableAndDisabledNamespaces(namespaces?: string) {
  const enabledNamespaces: RegExp[] = [];
  const disabledNamespaces: RegExp[] = [];
  // Support namespace wildcards rules which are same as https://github.com/debug-js/debug#wildcards
  const namespaceSplits = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  for (const namespaceSplit of namespaceSplits) {
    if (!namespaceSplit) {
      // ignore empty strings
      continue;
    }
    const formatNamespace = namespaceSplit.replace(/\*/g, '.*?');

    if (formatNamespace[0] === '-') {
      disabledNamespaces.push(new RegExp(`^${formatNamespace.slice(1)}$`));
    } else {
      enabledNamespaces.push(new RegExp(`^${formatNamespace}$`));
    }
  }
  return { enabledNamespaces, disabledNamespaces };
}

const { enabledNamespaces, disabledNamespaces } = getEnableAndDisabledNamespaces(DEBUG_TAG);

function enabled(namespace: ICELogNamespace) {
  for (const disabledNamespace of disabledNamespaces) {
    if (disabledNamespace.test(namespace)) {
      return false;
    }
  }
  for (const enabledNamespace of enabledNamespaces) {
    if (enabledNamespace.test(namespace)) {
      return true;
    }
  }
}

export type ICELogNamespace = string;
export type CreateLoggerReturnType = Pick<Consola, |
  'fatal' |
  'error' |
  'warn' |
  'log' |
  'info' |
  'start' |
  'success' |
  'ready' |
  'debug' |
  'trace'
> & { briefError?: (message: ConsolaLogObject | any, ...args: any[]) => void };
export type CreateLogger = (namespace?: ICELogNamespace) => CreateLoggerReturnType;

export const createLogger: CreateLogger = (namespace) => {
  function briefError(message: ConsolaLogObject | any, ...args: any[]) {
    consola.error(message, ...args);
    if (!DEBUG_TAG) {
      consola.log(`run \`DEBUG_TAG=${namespace || '*'} npm run ${npm_lifecycle_event || 'start'}\` to view error details`);
    }
  }
  function extendLoggerInstance(instance: Consola): CreateLoggerReturnType {
    const logger = {} as CreateLoggerReturnType;
    ['fatal', 'error', 'warn', 'log', 'info', 'start', 'success', 'ready', 'debug', 'trace'].forEach((method) => {
      logger[method] = instance[method];
    });
    logger.briefError = briefError;
    return logger;
  }

  if (DEBUG_TAG) {
    consola.level = 4;
  }

  if (!namespace) {
    return extendLoggerInstance(consola);
  }

  if (DEBUG_TAG) {
    if (enabled(namespace)) {
      return extendLoggerInstance(consola.withTag(namespace));
    } else {
      return {
        fatal() { },
        error() { },
        warn() { },
        log() { },
        info() { },
        start() { },
        success() { },
        ready() { },
        debug() { },
        trace() { },
        briefError() {},
      };
    }
  } else {
    return extendLoggerInstance(consola.withTag(namespace));
  }
};

export const logger = createLogger();
