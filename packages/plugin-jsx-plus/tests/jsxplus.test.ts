import { expect, it, describe } from 'vitest';
import { default as jsxPlus, idFilter } from '../src';

describe('JSX Plus Plugin', () => {
  describe('Id filter', () => {
    it('default', () => {
      expect(idFilter({}, '/bar/a.tsx')).toBeFalsy();
    });

    it('include', () => {
      const options = {
        include: [/bar/, 'foo'],
        extensions: ['.jsx', '.tsx'],
      };

      expect(idFilter(options, '/bar/a.tsx')).toBeTruthy();
      expect(idFilter(options, '/foo/a.tsx')).toBeTruthy();
    });

    it('exclude', () => {
      expect(idFilter({
        exclude: ['foo'],
        include: [/bar/],
        extensions: ['.jsx', '.tsx'],
      }, '/foo/bar/a.tsx')).toBeFalsy();

      expect(idFilter({
        exclude: [/foo/],
        include: [/bar/],
        extensions: ['.jsx', '.tsx'],
      }, '/foo/bar/a.tsx')).toBeFalsy();
    });

    it('extensions', () => {
      const options = {
        include: [/bar/],
        extensions: ['.jsx', '.tsx', '.custom.ext'],
      };
      expect(idFilter(options, '/foo/bar/a.tsx.custom.ext')).toBeTruthy();
    });
  });

  describe('Plugin', () => {
    it('default', () => {
      const plugin = jsxPlus({
        include: ['foo'],
      });
      // @ts-ignore
      expect(plugin.name).toBe('@ice/plugin-jsx-plus');
      const fakeConfig = {};
      function onGetConfig(fn) {
        fn(fakeConfig);
      }
      const context = {
        rootDir: '/foo/bar',
      };
      // @ts-ignore
      plugin.setup({ onGetConfig, context });
      expect(fakeConfig['alias']['babel-runtime-jsx-plus']).toBeDefined();
      expect(Array.isArray(fakeConfig['transforms'])).toBeTruthy();
      expect(fakeConfig['transforms'].length).toBe(1);
    });

    it('transformer', () => {
      const plugin = jsxPlus({
        include: ['foo'],
      });
      const fakeConfig = {};
      function onGetConfig(fn) {
        fn(fakeConfig);
      }
      const context = {
        rootDir: '/foo/bar',
      };
      // @ts-ignore
      plugin.setup({ onGetConfig, context });

      const transformer = fakeConfig['transforms'][0];
      const ret = transformer('<div x-if={false} />', '/foo/bar/a.tsx');
      expect(ret.code).toBe(`import { createCondition as __create_condition__ } from "babel-runtime-jsx-plus";

__create_condition__([[() => false, () => <div />]]);`);
    });
  });
});
