import formatPath from './formatPath';

// entry: src/app -> srcDir: src
// entry: client/app -> srcDir: client
// mpa entry: {dashboard: 'src/pages/Dashboard/app.ts'} -> src
function getSourceDir (entry): string {
  let entryStr = 'src/app';
  if (typeof entry === 'string') {
    entryStr = entry;
  } else if (typeof entry === 'object') {
    const values = Object.values(entry);
    if (typeof values[0] === 'string') {
      entryStr = values[0];
    }
  }

  entryStr = formatPath(entryStr);

  return entryStr.split('/')[0];
}

export default getSourceDir;
