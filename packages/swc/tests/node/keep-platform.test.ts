import { transformSync } from '../../node';

describe('swc remove multiple ends code', () => {
  it('should keep original code with not config removeMultipleEndsCode', () => {
    const originalCode = `import { isWeb } from 'universal-env';
    if (isWeb) {
      console.log('This is web');
    } else {
      console.log('This is others');
    }
    `;

    const { code } = transformSync(originalCode, {
      sourceMaps: false,
      jsc: {
        parser: {
          syntax: 'ecmascript',
        },
        target: 'es5'
      }
    });

    expect(code).toEqual(`import { isWeb } from 'universal-env';
if (isWeb) {
    console.log('This is web');
} else {
    console.log('This is others');
}
`);
  });

  it('should assign isWeb as true', () => {
    const originalCode = `import { isWeb } from 'universal-env';
    if (isWeb) {
      console.log('This is web');
    } else {
      console.log('This is others');
    }
    `;

    const { code } = transformSync(originalCode, {
      sourceMaps: false,
      jsc: {
        parser: {
          syntax: 'ecmascript',
        },
        target: 'es5'
      },
      keepPlatform: 'web'
    });

    expect(code).toEqual(`var isWeb = true;
if (isWeb) {
    console.log('This is web');
} else {
    console.log('This is others');
}
`);
  });

  it('should save web code', () => {
    const originalCode = `import { isWeb, isWeex } from 'universal-env';
    if (isWeb) {
      console.log('This is web');
    } else if (isWeex) {
      console.log('This is weex');
    } else {
      console.log('others');
    }
    `;

    const { code } = transformSync(originalCode, {
      sourceMaps: false,
      jsc: {
        minify: {
          compress: true,
          mangle: true
        },
        parser: {
          syntax: 'ecmascript',
        },
        target: 'es5',
        transform: {
          optimizer: {
            simplify: true
          }
        }
      },
      keepPlatform: 'web',
      minify: true
    });

    expect(code).toEqual('console.log("This is web")');
  });
});
