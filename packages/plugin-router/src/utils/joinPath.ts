/**
 * Join the route paths. Fork from url-join@4.0.1
 * @param strArray
 * @returns string
 */
function joinPath(...strArray: string[]): string {
  if (strArray.length === 0) {
    return '';
  }
  const resultArray = [];
  const filterStrArray = strArray.filter(str => str !== '');
  filterStrArray.forEach((str, index) => {
    if (typeof str !== 'string') {
      throw new Error(`path must be a string. Received ${str}`);
    }
    let path = str;
    if (index > 0) {
      path = path.replace(/^[/]+/, '');
    }
    if (index < filterStrArray.length - 1) {
      // Removing the ending slashes for each component but the last.
      path = path.replace(/[/]+$/, '');
    } else {
      // For the last component we will combine multiple slashes to a single one.
      path = path.replace(/[/]+$/, '/');
    }
    resultArray.push(path);
  });
  return resultArray.join('/');
}

export default joinPath;
