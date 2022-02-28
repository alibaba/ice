import { getEntryFiles, getEntries } from '../src/entryHelper';

describe('entry-helper', () => {
  test('start', () => {
    const entries = {
      index: {
        values: () => [
          '/icestark-demo/ice-browser-var/child/node_modules/_react-dev-utils@10.2.1@react-dev-utils/webpackHotDevClient.js',
          '/demo-project/icestark-demo/ice-browser-var/child/src/app'
        ]
      }
    };

    expect(getEntryFiles(entries)).toEqual(['/demo-project/icestark-demo/ice-browser-var/child/src/app'])
    expect(getEntries(entries)).toEqual({
      index: '/demo-project/icestark-demo/ice-browser-var/child/src/app'
    })
  })

  test('start-single-string', () => {
    const entries = {
      index: {
        values: () => '/demo-project/icestark-demo/ice-browser-var/child/src/app'
      }
    };

    expect(getEntryFiles(entries)).toEqual(['/demo-project/icestark-demo/ice-browser-var/child/src/app'])
    expect(getEntries(entries)).toEqual({
      index: '/demo-project/icestark-demo/ice-browser-var/child/src/app'
    })
  })

  test('multi-entries', () => {
    const entries = {
      index: {
        values: () => [
          '/icestark-demo/ice-browser-var/child/node_modules/_react-dev-utils@10.2.1@react-dev-utils/webpackHotDevClient.js',
          '/demo-project/icestark-demo/ice-browser-var/child/src/app'
        ]
      },
      test: {
        values: () => [
          '/icestark-demo/ice-browser-var/child/node_modules/_react-dev-utils@10.2.1@react-dev-utils/webpackHotDevClient.js',
          '/demo-project/icestark-demo/ice-browser-var/child/src/test'
        ]
      },
    };

    expect(getEntryFiles(entries)).toEqual(['/demo-project/icestark-demo/ice-browser-var/child/src/app', '/demo-project/icestark-demo/ice-browser-var/child/src/test'])
    expect(getEntries(entries)).toEqual({
      index: '/demo-project/icestark-demo/ice-browser-var/child/src/app',
      test: '/demo-project/icestark-demo/ice-browser-var/child/src/test'
    })
  })
})