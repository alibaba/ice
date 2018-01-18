const tsfmt = require('typescript-formatter');

const Interface = require('./types/Interface');
const Component = require('./types/Component');

function run(schema) {
  let subComponents = schema.subComponents;
  schema.isEntry = true;
  let entryComponent = _run(schema);

  if (Array.isArray(subComponents)) {
    // submodules is nullable
    subComponents = subComponents.map(component => _run(component));
  } else {
    subComponents = [];
  }


  return tsfmt.processString('', _createHead() + subComponents.join('\n') + entryComponent, {});
}

function _run(component) {

  const name = component.name;
  const subComponents = component.subComponents;
  const isEntry = component.isEntry;

  const reactProps = new Interface({
    name,
    props: component.props || {},
    methods: component.methods || {}
  });
  const reactComponent = new Component({
    name,
    subComponents,
    isEntry
  });
  return reactProps.toString() + reactComponent.toString();
}

function _createHead() {
  return `
    /// <reference types="react" />\n
    import React from 'react';\n
  `;
}

module.exports = run;