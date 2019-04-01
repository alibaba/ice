const {
  getNpmRegistry,
  getUnpkgHost,
  getNpmLatestSemverVersion,
  getLatestVersion,
  getNpmInfo,
  getNpmClient,
  checkAliInternal,
} = require('../lib/index');

jest.setTimeout(10 * 1000);

test('getNpmRegistry custom registry', () => {
  const customRegistry = 'https://registry.custom.com';

  process.env.REGISTRY = customRegistry;

  expect(getNpmRegistry('koa')).toBe(customRegistry);
  expect(getNpmRegistry('@ali/ice-test')).toBe(customRegistry);

  delete process.env.REGISTRY;
});

test('getNpmRegistry', () => {
  const defaultRegistry = 'https://registry.npm.taobao.org';
  const aliRegistry = 'https://registry.npm.alibaba-inc.com';

  expect(getNpmRegistry('koa')).toBe(defaultRegistry);
  expect(getNpmRegistry('@ali/ice-test')).toBe(aliRegistry);
  expect(getNpmRegistry('@alife/ice-test')).toBe(aliRegistry);
  expect(getNpmRegistry('@alipay/ice-test')).toBe(aliRegistry);
  expect(getNpmRegistry('@alixxx/ice-test')).toBe(defaultRegistry);
});


test('getUnpkgHost custom host', () => {
  const custom = 'https://unpkg.example.com';

  process.env.UNPKG = custom;

  expect(getUnpkgHost('koa')).toBe(custom);
  expect(getUnpkgHost('@ali/ice-test')).toBe(custom);

  delete process.env.UNPKG;
});

test('getUnpkgHost', () => {
  const defaultRegistry = 'https://unpkg.com';
  const aliRegistry = 'https://unpkg.alibaba-inc.com';

  expect(getUnpkgHost('koa')).toBe(defaultRegistry);
  expect(getUnpkgHost('@ali/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alife/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alipay/ice-test')).toBe(aliRegistry);
  expect(getUnpkgHost('@alixxx/ice-test')).toBe(defaultRegistry);
});

test('getLatestVersion should throw error when no dist-tags', () => {
  return getLatestVersion('http')
          .catch(err => expect(err).toMatch('error'));
});

test('getLatestVersion', () => {
  // 找一个非常稳定的包
  return getLatestVersion('co').then((version) => {
    expect(version).toBe('4.6.0');
  });
});

test('getNpmLatestSemverVersion', () => {
  // 找一个非常稳定的包
  return getNpmLatestSemverVersion('co', '3.0.0').then((version) => {
    expect(version).toBe('3.1.0');
  });
});


test('getNpmInfo 404 error case', () => {
  return getNpmInfo('not-exis-npm-error').catch(err => {
    expect(err.message).toMatch('Request failed');
  });
});

test('getNpmClient custom registry', () => {
  const custom = 'cnpm';
  process.env.NPM_CLIENT = custom;

  expect(getNpmClient('koa')).toBe(custom);
  expect(getNpmClient('@ali/ice-test')).toBe(custom);

  delete process.env.NPM_CLIENT;
});

test('getNpmClient', () => {
  const defaultData = 'npm';
  const ali = 'tnpm';

  expect(getNpmClient('koa')).toBe(defaultData);
  expect(getNpmClient('@ali/ice-test')).toBe(ali);
  expect(getNpmClient('@alife/ice-test')).toBe(ali);
  expect(getNpmClient('@alipay/ice-test')).toBe(ali);
  expect(getNpmClient('@alixxx/ice-test')).toBe(defaultData);
});


test('checkAliInternal', () => {
  return checkAliInternal().then((internal) => {
    console.log('checkAliInternal', internal);
    expect(internal).toBeBoolean();
  });
});
