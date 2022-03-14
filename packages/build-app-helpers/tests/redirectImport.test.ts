import redirectImport from "../src/redirectImport";

describe('Redirect import', () => {
  it('should remove original import with only one import', async (done) => {
    const code = `import { runApp } from 'ice'`;
    const result = await redirectImport(code, {
      source: 'ice',
      redirectImports: [
        {
          name: 'runApp',
          redirectPath: 'ice/entries/home/runApp',
          default: false,
        }
      ]
    });
    expect(result).toEqual(`\nimport { runApp } from 'ice/entries/home/runApp'`);
    done();
  });
  it('should retain original import with multiple import', async (done) => {
    const code = `import { runApp, usePageShow } from 'ice'`;
    const result = await redirectImport(code, {
      source: 'ice',
      redirectImports: [
        {
          name: 'runApp',
          redirectPath: 'ice/entries/home/runApp',
          default: false,
        }
      ]
    });
    expect(result).toEqual(`import { usePageShow } from 'ice';
import { runApp } from 'ice/entries/home/runApp'`);
    done();
  });

  it('should add multiple import with more than one redirectImports', async (done) => {
    const code = `import { runApp, usePageShow } from 'ice'`;
    const result = await redirectImport(code, {
      source: 'ice',
      redirectImports: [
        {
          name: 'runApp',
          redirectPath: 'ice/entries/home/runApp',
          default: false,
        },
        {
          name: 'usePageShow',
          redirectPath: 'ice/entries/home/publicAPI',
          default: false,
        }
      ]
    });
    expect(result).toEqual(`\nimport { runApp } from 'ice/entries/home/runApp';
import { usePageShow } from 'ice/entries/home/publicAPI'`);
    done();
  });

  it('should transform export default', async (done) => {
    const code = `import runApp from 'ice'`;
    const result = await redirectImport(code, {
      source: 'ice',
      redirectImports: [
        {
          name: 'runApp',
          redirectPath: 'ice/entries/home/runApp',
          default: true,
        }
      ]
    });
    expect(result).toEqual(`import runApp from 'ice/entries/home/runApp'`);
    done();
  });
});
