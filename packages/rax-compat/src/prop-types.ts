// @ts-nocheck Doesnot take effect in runtime validation, for imports compatibility only.
/*
 * Current PropTypes only export some api with react, not validate in runtime.
 */

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    return typeChecker;
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    // Noop
  }
  return createChainableTypeChecker(validate);
}

let typeChecker = createTypeChecker();

export default {
  array: typeChecker,
  bool: typeChecker,
  func: typeChecker,
  number: typeChecker,
  object: typeChecker,
  string: typeChecker,
  symbol: typeChecker,
  element: typeChecker,
  node: typeChecker,
  any: typeChecker,
  arrayOf: typeChecker,
  instanceOf: typeChecker,
  objectOf: typeChecker,
  oneOf: typeChecker,
  oneOfType: typeChecker,
  shape: typeChecker,
};
