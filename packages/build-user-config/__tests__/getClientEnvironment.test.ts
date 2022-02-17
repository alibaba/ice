import getClientEnvironment from '../src/utils/getClientEnvironment';

describe('get client environment', () => {
  it('get client environment with server env', () => {
    const clientEnvironment = getClientEnvironment({ 'TEST_STRING': 'test' });
    expect(clientEnvironment.raw).toStrictEqual({});
  });

  it('get client environment with ice prefix', () => {
    const clientEnvironment = getClientEnvironment({ 'ICE_STRING': 'ice' });
    expect(clientEnvironment.raw).toStrictEqual({ ICE_STRING: 'ice' });
    expect(clientEnvironment.stringified).toStrictEqual({ 'process.env.ICE_STRING': '"ice"' });
  });
});