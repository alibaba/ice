import { transformSync } from '../../node';

describe('swc transform code', () => {
  it('should transform es6 code to es5', () => {
    const originalCode = `const a = {
      x: 1,
      y: 2,
    };
    const b = {
      z: 3,
      ...a,
    };
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

    expect(code).toEqual(`function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === \"function\") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
var a = {
    x: 1,
    y: 2
};
var b = _objectSpread({
    z: 3
}, a);
`);
  });

  it('should transform TypeScript to es2021', () => {
    const originalCode = `interface IType {
      name: string;
    }

    const a: IType = {
      name: 'Hello',
    };`;

    const { code } = transformSync(originalCode, {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        target: 'es2021'
      },
      sourceMaps: false,
    });

    expect(code).toEqual(`const a = {
    name: 'Hello'
};
`);
  });

  it('should transform JSX to createElement', () => {
    const originalCode = `import React from 'react';
    export default function Home() {
      return <div>home page</div>;
    }`;

    const { code } = transformSync(originalCode, {
      sourceMaps: false,
      jsc: {
        parser: {
          syntax: 'ecmascript',
          jsx: true,
        },
        target: 'es5'
      },
    });

    expect(code).toEqual(`import React from 'react';
export default function Home() {
    return(/*#__PURE__*/ React.createElement("div", null, "home page"));
};
`);
  });
});
