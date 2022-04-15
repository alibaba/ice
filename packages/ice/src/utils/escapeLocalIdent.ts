// Fork from https://github.com/webpack-contrib/css-loader/blob/v6.7.1/src/utils.js#L315

const regexSingleEscape = /[ -,.\\/:-@[\]\\^`{-~]/;
const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
const filenameReservedRegex = /[<>:"/\\|?*]/g;

export default function escapeLocalIdent(localident: string) {
  return escape(localident // For `[hash]` placeholder
    .replace(/^((-?[0-9])|--)/, '_$1').replace(filenameReservedRegex, '-').replace(/[\u0000-\u001f\u0080-\u009f]/g, '-').replace(/\./g, '-'));
}

/** transform and remove some special characters */
function escape(string: string) {
  let output = '';
  let counter = 0;

  while (counter < string.length) {
    const character = string.charAt(counter++);
    let value;

    if (/[\t\n\f\r\x0B]/.test(character)) {
      const codePoint = character.charCodeAt(0);
      value = `\\${codePoint.toString(16).toUpperCase()} `;
    } else if (character === '\\' || regexSingleEscape.test(character)) {
      value = `\\${character}`;
    } else {
      value = character;
    }

    output += value;
  }

  const firstChar = string.charAt(0);

  if (/^-[-\d]/.test(output)) {
    output = `\\-${output.slice(1)}`;
  } else if (/\d/.test(firstChar)) {
    output = `\\3${firstChar} ${output.slice(1)}`;
  }
  // Remove spaces after `\HEX` escapes that are not followed by a hex digit,
  // since they’re redundant. Note that this is only possible if the escape
  // sequence isn’t preceded by an odd number of backslashes.

  output = output.replace(regexExcessiveSpaces, ($0, $1, $2) => {
    if ($1 && $1.length % 2) {
      // It’s not safe to remove the space, so don’t.
      return $0;
    } // Strip the space.

    return ($1 || '') + $2;
  });
  return output;
}