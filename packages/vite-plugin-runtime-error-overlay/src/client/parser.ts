import StackFrame from './stack-frame';

const regexExtractLocation = /\(?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;

type Location = [string, number, number];
function extractLocation(token: string): Location {
  return (
    regexExtractLocation
      .exec(token)?.slice(1)
      .map(v => {
        const p = Number(v);
        if (!isNaN(p)) {
          return p;
        }
        return v;
      }) as Location
  );
}

const regexValidFrameChrome = /^\s*(at|in)\s.+(:\d+)/;
const regexValidFrameFireFox = /(^|@)\S+:\d+|.+line\s+\d+\s+>\s+(eval|Function).+/;

function parseStack(stack: string[]): StackFrame[] {
  const frames = stack
    .filter(
      e => regexValidFrameChrome.test(e) || regexValidFrameFireFox.test(e)
    )
    .map(e => {
      if (regexValidFrameFireFox.test(e)) {
        // Strip eval, we don't care about it
        let isEval = false;
        if (/ > (eval|Function)/.test(e)) {
          e = e.replace(
            / line (\d+)(?: > eval line \d+)* > (eval|Function):\d+:\d+/g,
            ':$1'
          );
          isEval = true;
        }
        const data = e.split(/[@]/g);
        const last = data.pop();
        return new StackFrame(
          data.join('@') || (isEval ? 'eval' : null),
          ...extractLocation(last as string)
        );
      } else {
        // Strip eval, we don't care about it
        if (e.indexOf('(eval ') !== -1) {
          e = e.replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
        }
        if (e.indexOf('(at ') !== -1) {
          e = e.replace(/\(at /, '(');
        }
        const data = e.trim().split(/\s+/g).slice(1);
        const last = data.pop();
        return new StackFrame(data.join(' ') || null, ...extractLocation(last));
      }
    });
  return frames;
}

function parseError(error: Error | string | string[]): StackFrame[] {
  if (error == null) {
    throw new Error('You cannot pass a null object.');
  }
  if (typeof error === 'string') {
    return parseStack(error.split('\n'));
  }
  if (Array.isArray(error)) {
    return parseStack(error);
  }
  if (typeof error.stack === 'string') {
    return parseStack(error.stack.split('\n'));
  }
  throw new Error('The error you provided does not contain a stack trace.');
}

export default parseError;
