import levels from '../levels';

export default class Logger {
  private level: number;

  constructor() {
    ['trace', 'log', 'debug', 'info', 'warn', 'error'].forEach((methodName) => {
      const originalMethod = console[methodName];
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      Object.defineProperty(console, methodName, {
        enumerable: true,
        get() {
          return function (...args) {
            if (self.level > levels[methodName]) return () => {};
            return originalMethod(...args);
          };
        }
      });
    });
  }

  public setLevel(level :string) {
    this.level = levels[level.toLowerCase()];
  }
}
