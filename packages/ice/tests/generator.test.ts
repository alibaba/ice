import { expect, it, describe } from 'vitest';
import { generateExports, checkExportData, removeExportData } from '../src/service/runtimeGenerator';

describe('generateExports', () => {
  it('basic usage', () => {
    const { importStr, exportStr } = generateExports([{
      source: 'react-router',
      specifier: 'Router',
      type: false,
    }]);
    expect(importStr).toBe('import Router from \'react-router\';');
    expect(exportStr).toBe('Router,')
  });
  it('type export', () => {
    const { importStr, exportStr } = generateExports([{
      source: 'react-router',
      specifier: 'Router',
      type: true,
    }]);
    expect(importStr).toBe('import type Router from \'react-router\';');
    expect(exportStr).toBe('Router;')
  });
  it('named exports', () => {
    const { importStr, exportStr } = generateExports([{
      source: 'react-router',
      specifier: ['Switch', 'Route'],
    }]);
    expect(importStr).toBe('import { Switch, Route } from \'react-router\';');
    expect(exportStr).toBe(['Switch,', 'Route,'].join('\n'));
  });

  it('aliased exports', () => {
    const { importStr, exportStr } = generateExports([{
      source: 'react-helmet',
      specifier: 'Helmet',
      exportAlias: {
        'Helmet': 'Head',
      },
    }]);
    expect(importStr).toBe('import Helmet from \'react-helmet\';');
    expect(exportStr).toBe('Head: Helmet,');
  });
});

const defaultExportData = [{
  source: 'react-router',
  specifier: ['Switch', 'Route'],
}, {
  source: 'react-helmet',
  specifier: 'Helmet',
}];

describe('checkExportData', () => {
  it('basic usage', () => {
    try {
      checkExportData(defaultExportData, { source: 'react-dom', specifier: 'react-dom' }, 'test-api');
      expect(true).toBe(true);
    } catch (err) {
      expect(true).toBe(false);
    }
  });

  it('duplicate named export', () => {
    try {
      checkExportData(defaultExportData, defaultExportData[0], 'test-api');
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  })

  it('duplicate exports', () => {
    try {
      checkExportData(defaultExportData, defaultExportData, 'test-api');
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  })

  it('duplicate default export', () => {
    try {
      checkExportData(defaultExportData, { source: 'react-dom', specifier: 'Switch' }, 'test-api');
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  })
});

describe('removeExportData', () => {
  it('basic usage', () => {
    const removed = removeExportData(defaultExportData, 'react-router');
    expect(removed.length).toBe(1);
    expect(removed[0].source).toBe('react-helmet');
  });
  it('fail to remove', () => {
    const removed = removeExportData(defaultExportData, ['react-dom']);
    expect(removed.length).toBe(2);
  });
  it('remove exports', () => {
    const removed = removeExportData(defaultExportData, ['react-router', 'react-helmet']);
    expect(removed.length).toBe(0);
  });
})