const pluginRequest = require('../src');

function sum(a, b) {
  return a + b;
}

describe('plugin-request', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
