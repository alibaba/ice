'use strict';
module.exports = function normalizeEntry(entry, preparedChunks) {
  const preparedName = preparedChunks
    .filter((module) => {
      return typeof module.name !== 'undefined';
    })
    .map((module) => module.name);

  return Object.keys(entry).concat(preparedName);
};
