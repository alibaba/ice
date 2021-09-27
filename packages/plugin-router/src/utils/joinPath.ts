/**
 * Join the route paths.
 * @param strArray
 * @returns string
 */
function joinPath(...strArray: string[]): string {
  if (strArray.length === 0) {
    return '';
  }
  const resultArray: any[] = [];
  const filterStrArray = strArray.filter(str => str !== '');
  filterStrArray.forEach((str, index) => {
    if (typeof str !== 'string') {
      throw new Error(`Path must be a string. Received ${str}`);
    }
    let routePath = str;
    // Fork from https://github.com/jfromaniello/url-join@4.0.1
    if (index > 0) {
      routePath = routePath.replace(/^[/]+/, '');
    }
    if (index < filterStrArray.length - 1) {
      // Removing the ending slashes for each component but the last.
      routePath = routePath.replace(/[/]+$/, '');
    } else {
      // For the last component we will combine multiple slashes to a single one.
      routePath = routePath.replace(/[/]+$/, '/');
    }
    resultArray.push(routePath);
  });
  return resultArray.join('/');
}

export default joinPath;
