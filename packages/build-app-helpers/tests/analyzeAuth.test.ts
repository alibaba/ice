import * as path from 'path';
import analyzeAuth from '../src/analyzeAuth';

describe('analyze auth', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeAuth/');
  it('entry app.js', () => {
    const hasAuth = analyzeAuth(path.join(rootDir, 'app.js'));
    expect(hasAuth).toBe(false);
  });

  it('entry app.jsx', () => {
    const hasAuth = analyzeAuth(path.join(rootDir, 'app.jsx'));
    expect(hasAuth).toBe(true);
  });

  it('entry app.ts', () => {
    const hasAuth = analyzeAuth(path.join(rootDir, 'app.ts'));
    expect(hasAuth).toBe(false);
  });

  it('entry app.tsx', () => {
    const hasAuth = analyzeAuth(path.join(rootDir, 'app.tsx'));
    expect(hasAuth).toBe(false);
  });
});