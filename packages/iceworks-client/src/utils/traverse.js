/**
 * loop tree
 * @param root {object} tree object
 * @param callback {function} callback
 * @param isBreak {bool} is break loop
 */
function traverse(nodeList, callback, isBreak) {
  function loop(list) {
    let childrenRes = false;
    list.some((node, index) => {
      const result = callback(node, list, index);
      // end node loop
      if (result) {
        return {
          node,
          list,
          index,
        };
      }

      if (Array.isArray(node.children)) {
        const childLoopRes = loop(node.children);
        // end
        if (isBreak && childLoopRes) {
          childrenRes = childLoopRes;
          return true;
        }
      }
      return false;
    });

    if (childrenRes) {
      return childrenRes;
    }
    return null;
  }

  return loop(nodeList, null);
}

export default traverse;
