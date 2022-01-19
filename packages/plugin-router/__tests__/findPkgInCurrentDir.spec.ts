import * as path from 'path';
import { findPkgInCurrentDir } from '../src/utils/findPkgInCurrentDir';


describe('plugin-router', () => {

  test('exist', () => {
    const a = findPkgInCurrentDir('plugin-test-a', __dirname)
    expect(a[0]).toBeTruthy();
    expect(a[1]).toBe(path.join(__dirname, 'a'));
  })

  test('non-exist', () => {
    const a = findPkgInCurrentDir('plugin-test-b', __dirname)
    expect(a[0]).toBeFalsy();
    expect(a[1]).toBe('');
  })
})