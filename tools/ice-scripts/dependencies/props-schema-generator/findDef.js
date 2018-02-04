const codeToAST = require('./codeToAST');
const traverse = require('babel-traverse');
const types = require('babel-types');
const path = require('path');
const fs = require('fs');
const getPath = require('./getPath');

class Seacher {
  constructor(code, dirname, filepath) {
    this.filepath = filepath;
    this.code = code.toString();
    this.dirname = dirname;

    this.ast = codeToAST(this.code);
    this.exportInfo = this._findExportInfo();
    this.output;

    this._parseExportInfo();
    this._recursionParse();
  }

  _findAssignInfo(name) {
    const assigns = [];
    traverse.default(this.ast, {
      MemberExpression(path) {
        try {
          if (
            path.node.object.name === name &&
            types.isProgram(path.parentPath.parentPath.parentPath)
          ) {
            assigns.push(path);
          }
        } catch (e) {}
      },
    });
    return assigns;
  }
  _findExportInfo() {
    const exportArray = [];
    traverse.default(this.ast, {
      enter(path) {
        if (
          types.isExportDefaultDeclaration(path) ||
          types.isExportNamedDeclaration(path)
        ) {
          exportArray.push(path);
        }
      },
    });
    return exportArray;
  }
  _parseExportInfo() {
    const output = {};

    this.exportInfo.forEach((path) => {
      const info = this._getRealExport(path);

      if (types.isExportDefaultDeclaration(path)) {
        output['default'] = info[0];
      } else {
        info.forEach((item) => {
          item.root.name && (output[item.root.name] = item);
        });
      }
    });

    this.output = output;
  }
  _getRealAssign(path) {
    try {
      const node = path.parent.right;
      const name = this._getNodeName(node);

      const ret = {
        node,
        path,
        code: this.code,
        filepath: this.filepath,
        type: node.type,
        leadingComments: path.parentPath.parent.leadingComments,
      };

      name && (ret.name = name);

      return ret;
    } catch (e) {}
  }
  _getRealExport(path) {
    const specifiers = path.node.specifiers;
    const declaration = path.node.declaration;
    const node = path.node;

    if (node.soruce) {
    }

    if (declaration) {
      return [this._createNode(path, declaration, declaration.type)];
    }

    if (specifiers) {
      return specifiers.map((node) => {
        return this._createNode(path, node.exported, node.exported.type);
      });
    }

    return [];
  }
  _createNode(path, node, type) {
    const name = this._getNodeName(node);
    const ret = {
      root: {
        node,
        path,
        code: this.code,
        filepath: this.filepath,
        type,
        leadingComments: path.node.leadingComments,
      },
      refs: {},
    };

    const assigns = this._findAssignInfo(name);
    assigns.forEach((item) => {
      ret.refs[item.node.property.name] = this._getRealAssign(item);
    });

    name && (ret.root.name = name);

    return ret;
  }
  _getNodeName(node) {
    if (types.isFunctionDeclaration(node) || types.isClassDeclaration(node)) {
      return node.id && node.id.name;
    }

    if (types.isIdentifier(node)) {
      return node.name;
    }

    if (types.isCallExpression(node)) {
      return node.arguments[0];
    }

    if (types.isVariableDeclaration(node)) {
      try {
        return node.declarations[0].id.name;
      } catch (e) {
        return '';
      }
    }

    return '';
  }
  /**
   * 递归解析暴露的节点
   */
  _recursionParse() {
    Object.keys(this.output).forEach((key) => {
      const target = this.output[key];
      this._inject(target, 'root');

      Object.keys(target.refs).forEach((key) => {
        this._inject(target.refs, key);
      });
    });
  }
  _inject(target, key) {
    const parsed = this._parseNode(target[key]) || {};
    if (Object.keys(parsed.refs || {}).length > 0 && target[key].refs) {
      target[key].refs = Object.assign(target[key].refs, parsed.refs);
    }
    if (parsed.root) {
      target[key] = parsed.root;
    } else {
      target[key] = parsed;
    }
  }
  _parseNode(node) {
    if (node && types.isIdentifier(node.node)) {
      return this._findIdentifier(node.name, node.path);
    }
    return node;
  }
  _findIdentifier(name, path) {
    const target = path.scope.bindings[name];
    const targetPath = target && target.path;

    let soruce;
    if (path.node.source) {
      soruce = path.node.source.value;
    }
    /**
     * export xx from 的情况
     */
    if (soruce) {
      return run(soruce, this.dirname).output[name];
    }

    if (types.isImportDefaultSpecifier(targetPath)) {
      soruce = targetPath.parent.source.value;
      const parsed = run(soruce, this.dirname);
      if (!parsed) {
        return null;
      }
      return parsed.output.default;
    }
    if (types.isImportSpecifier(targetPath)) {
      soruce = targetPath.parent.source.value;
      try {
        return run(soruce, this.dirname).output[targetPath.node.imported.name];
      } catch (e) {
        return {};
      }
    }

    try {
      return {
        node: targetPath.node,
        code: this.code,
        path: targetPath,
        filepath: this.filepath,
        leadingComments:
          targetPath.parent.leadingComments || targetPath.node.leadingComments,
      };
    } catch (e) {}

    return {};
  }
}

const parsedPathMap = {};
function run(codePath, dir) {
  if (codePath === undefined) {
    throw new Error('请指定入口路径');
  }
  const fullPath = getPath(dir, codePath);
  if (parsedPathMap[fullPath]) {
    return parsedPathMap[fullPath];
  }
  parsedPathMap[fullPath] = true;
  // console.log(`正在解析 ${fullPath} .......`);
  const dirname = path.dirname(fullPath);
  const code = fs.readFileSync(fullPath);
  parsedPathMap[fullPath] = new Seacher(code, dirname, fullPath);
  return parsedPathMap[fullPath];
}

module.exports = run;
