const __import_a__ = await __ice_import__('./a.js');
const __import_b__ = await __ice_import__('./b.js');

__ice_exports__.foo = function() {
  return 'test';
}

__ice_exports__.default = {
  a: __import_a__.a(),
  b: __import_b__.b(),
}
