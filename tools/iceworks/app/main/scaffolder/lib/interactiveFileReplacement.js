const fs = require('fs');

class InteractiveFileReplacement {
  constructor(options) {
    this.file = options.file;
    this.tagPrefix = options.tagPrefix || '// <!-- replace start -->';
    this.tagSuffix = options.tagSuffix || '// <!-- replace end -->';
    this.regPrefix = new RegExp(this.tagPrefix);
    this.regSuffix = new RegExp(this.tagSuffix);
  }

  getFileContent() {
    const rawContent = fs.readFileSync(this.file, 'utf-8');
    const splited = rawContent.split(/\r?\n/);
    let startRow = -1;
    let endRow = 0;
    splited.forEach((row, rowCount) => {
      if (this.regPrefix.test(row)) {
        startRow = rowCount;
      }
      if (this.regSuffix.test(row)) {
        endRow = rowCount;
      }
    });
    return splited.slice(startRow + 1, endRow).join('\n');
  }

  transformRawContentToNewContent(rawContent, replacement) {
    const splited = rawContent.split(/\r?\n/);
    let startRow = -1;
    let endRow = 0;
    let matched = 0;
    splited.forEach((row, rowCount) => {
      if (this.regPrefix.test(row)) {
        startRow = rowCount;
        matched++;
      }
      if (this.regSuffix.test(row)) {
        endRow = rowCount;
        matched++;
      }
    });
    // 没有匹配上下标记
    if (matched !== 2) {
      return rawContent;
    }
    const newContentSplited = splited
      .slice(0, startRow + 1)
      .concat(replacement)
      .concat(splited.slice(endRow, splited.length));

    return newContentSplited.join('\n');
  }

  replace(replacement) {
    const rawContent = fs.readFileSync(this.file, 'utf-8');
    const newContent = this.transformRawContentToNewContent(
      rawContent,
      replacement
    );
    fs.writeFileSync(this.file, newContent, 'utf-8');
    return newContent;
  }
}

module.exports = InteractiveFileReplacement;
