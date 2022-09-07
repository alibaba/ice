import { expect, it, describe } from 'vitest';
import openBrowser from '../src/utils/openBrowser';

describe('openBrowser in node', () => {
  it('open localhost', () => {
    process.env.BROWSER = 'none';
    const result = openBrowser('http://localhost/');
    expect(result).toBe(false);
  });

  // TODO simulate open browser in node
});