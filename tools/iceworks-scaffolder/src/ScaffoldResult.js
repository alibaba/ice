/**
 * Scaffold 创建后的返回对象
 */

class ScaffoldResult {
  constructor() {
    this.files = [];
    this.dependencies = {};
    this.output = {};
  }

  appendDependencies(dpes = {}) {
    this.dependencies = Object.assign(this.dependencies, dpes);
  }

  appendOutput(output = {}) {
    this.output = Object.assign(this.output, output);
  }

  appendFiles(files) {
    if (Array.isArray(files)) {
      Array.prototype.push.apply(this.files, files);
    } else {
      this.files.push(files);
    }
  }

  append(scaffoldResult) {
    this.appendFiles(scaffoldResult.files);
    this.appendDependencies(scaffoldResult.dependencies);
    this.appendOutput(scaffoldResult.output);
  }

  setOutput(key, value) {
    this.output[key] = value;
  }
}

module.exports = ScaffoldResult;
