const npmUtil = require('../../lib/scaffold/npm');

test('getRegistry', () => {
  const aliRegistry = 'https://registry.npm.alibaba-inc.com';
  const taobaoRegistry = 'https://registry.npm.taobao.org';

  expect(npmUtil.getRegistry('@alife/next')).toBe(aliRegistry);
  expect(npmUtil.getRegistry('@ali/next')).toBe(aliRegistry);
  expect(npmUtil.getRegistry('@alipay/next')).toBe(aliRegistry);

  expect(npmUtil.getRegistry('@icedesign/base')).toBe(taobaoRegistry);
});

test('getLatestVersion should throw error when no dist-tags', () => {
  return npmUtil.getLatestVersion('http')
          .catch(err => expect(err).toMatch('error'));
});

test('getLatestVersion', () => {
  // 找一个非常稳定的包
  return npmUtil.getLatestVersion('co').then((version) => {
    expect(version).toBe('4.6.0');
  });
});
