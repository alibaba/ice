const fs = require('fs');
const path = require('path');
const { cloneDeep } = require('lodash');
const findDef = require('./findDef');
const treeToJSON = require('./treeToJSON');
const meta = require('./getComponentMeta')();

function parse(arg, output) {
  const definitions = findDef(arg, process.cwd());
  const propsSchema = treeToJSON(definitions);
  if (!propsSchema.name && meta && meta.title) {
    propsSchema.name = meta.title;
  }
  if (!propsSchema.description && meta && meta.chinese) {
    propsSchema.description = meta.chinese;
  }
  return propsSchema;
}

module.exports = parse;
