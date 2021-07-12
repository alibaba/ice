import convertCharStr2CSS from '../convertCharStr';

export default (source: string) => {
  return source.replace(/content:\s*(?:'|")([\u0080-\uffff])(?:'|")/g, (str, $1) => {
    return `content: "${convertCharStr2CSS($1)}"`;
  });
};
