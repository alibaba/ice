// Select part from https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/possibleStandardNames.js#L11
const possibleStandardNames = [
  // Common
  'className',
  'innerHTML',
  'autoFocus',
  'inputMode',
  // script
  'crossOrigin',
  // input
  'autoPlay',
  'autoComplete',
  'defaultChecked',
  'defaultValue',
  'htmlFor',
  'maxLength',
  'minLength',
  'readOnly',
  // video
  'playsInline',
  // frame
  'marginWidth',
  'marginHeight',
  // meta
  'charSet',
].reduce((records: Record<string, string>, iter: string) => {
  records[iter.toLowerCase()] = iter;
  return records;
}, {
  // Special cases.
  class: 'className',
  for: 'htmlFor',
});

export default possibleStandardNames;
