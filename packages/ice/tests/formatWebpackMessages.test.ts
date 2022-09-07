import { expect, it, describe } from 'vitest';
import formatWebpackMessages from '../src/utils/formatWebpackMessages';

describe('webpack message formatting', () => {
  it('format syntax error', () => {
    const result = formatWebpackMessages({
      errors: [{ message: 'Syntax error: Unterminated JSX contents (8:13)' }, { message: 'Module error' }],
      warnings: [],
    });
    expect(result.errors.length).toBe(1);
  });

  it('formats aliased unknown export 1', () => {
    const result = formatWebpackMessages({
      errors: [{ message: 'export \'bar\' (imported as \'bar2\') was not found in \'./AppUnknownExport\'' }],
      warnings: [],
    });
    expect(result.errors[0]).toBe('Attempted import error: \'bar\' is not exported from \'./AppUnknownExport\' (imported as \'bar2\').');
  });

  it('formats cannot find module sass', () => {
    const result = formatWebpackMessages({
      errors: [{ message: '\nCannot find module.import sass from \'sass\'' }],
      warnings: [],
    });
    expect(result.errors[0]).toBe('To import Sass files, you first need to install sass.\nRun `npm install sass` or `yarn add sass` inside your workspace.');
  });

  it('formats module no found', () => {
    const result = formatWebpackMessages({
      errors: [{ message: '\nModule not found: Cannot find file: \'./ThisFileSouldNotExist\' in \'./src\'' }],
      warnings: [],
    });
    expect(result.errors[0]).toBe('Cannot find file: \'./ThisFileSouldNotExist\' in \'./src\'');
  });

  it('remove leading newline', () => {
    const result = formatWebpackMessages({
      errors: [{ message: 'line1\n\n\n\nline3' }],
      warnings: [],
    });
    expect(result.errors[0]).toBe('line1\n\nline3');
  });

  it('nested message', () => {
    const result = formatWebpackMessages({
      // @ts-ignore
      errors: [[{ message: 'line1' }, { message: 'line2\nline3' }]],
      warnings: [],
    });
    expect(result.errors[0]).toBe('line2\nline3');
  });

  it('string message', () => {
    const result = formatWebpackMessages({
      // @ts-ignore
      errors: ['line2\nline3'],
      warnings: [],
    });
    expect(result.errors[0]).toBe('line2\nline3');
  });

  it('eslint error', () => {
    const result = formatWebpackMessages({
      errors: [{ message: 'Line 4:13: Parsing error: \'b\' is not defined  no-undef' }],
      warnings: [],
    });
    expect(result.errors[0]).toBe('Syntax error: \'b\' is not defined  no-undef (4:13)');
  });
});

