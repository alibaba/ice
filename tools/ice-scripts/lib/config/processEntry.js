const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const hotDevClientPath = require.resolve('react-dev-utils/webpackHotDevClient');

function entryWithApp(item) {
  if (typeof item === 'string') {
    // 绝对路径直接返回
    if (path.isAbsolute(item)) {
      return item;
    }
    return path.resolve(appDirectory, item);
  } else if (Array.isArray(item)) {
    return item.map((file) => entryWithApp(file));
  }
}

function unshiftHotClient(item) {
  if (typeof item === 'string') {
    return [hotDevClientPath, item];
  } else if (Array.isArray(item)) {
    return [hotDevClientPath, ...item];
  }
}

function entryApplyHotdev(entries) {
  const hotEntries = {};

  Object.keys(entries).forEach((key) => {
    hotEntries[key] = unshiftHotClient(entries[key]);
  });

  return hotEntries;
}

module.exports = (entry) => {
  // 需要区分项目类型，新版的项目直接返回 src/index.js
  let entries = {};
  if (Array.isArray(entry) || typeof entry === 'string') {
    entries = {
      index: entryWithApp(entry),
    };
  } else {
    Object.keys(entry).forEach((key) => {
      entries[key] = entryWithApp(entry[key]);
    });
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.HOT_RELOAD !== 'false'
  ) {
    entries = entryApplyHotdev(entries);
  }

  return entries;
};
