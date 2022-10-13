---
title: 单元测试
order: 8
---

<details open>
  <summary>示例</summary>
  <ul>
    <li>
      <a href="https://github.com/ice-lab/ice-next/tree/master/examples/with-jest" target="_blank" rel="noopener noreferrer">
        with-jest
      </a>
    </li>
    <li>
      <a href="https://github.com/ice-lab/ice-next/tree/master/examples/with-vitest" target="_blank" rel="noopener noreferrer">
        with-vitest
      </a>
    </li>
  </ul>
</details>

ice.js 不耦合任何一个测试框架，开发者可自由选择。目前提供开箱即用的 [jest](https://jestjs.io/) 和 [vitest](https://vitest.dev/) 配置，以便快速开始单元测试。

## Jest

### 依赖安装

```bash
$ npm i jest -D
```

> 如果使用 TypeScript 编写单元测试，推荐接入使用 [@swc/jest](https://swc.rs/docs/usage/jest) 或 [ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)

### 配置

首先需要在项目的根目录下新建 `jest.config.mjs` 文件，并加入以下内容：

```js title="jest.config.mjs"
import { defineJestConfig } from '@ice/app';

export default defineJestConfig({});
```

`defineJestConfig` 方法返回的是 ice.js 默认配置好的 Jest 配置，支持传入自定义的 [Jest 配置](https://jestjs.io/docs/configuration)。

`defineJestConfig` 入参支持两种写法：

- `jest.Config`
- `() => Promise<jest.Config>`

以添加 `@swc/jest` 为例：
```diff title="jest.config.mjs"
import { defineJestConfig } from '@ice/app';

export default defineJestConfig({
+ transform: {
+   '^.+\\.(t|j)sx?$': [
+     '@swc/jest',
+     {
+       // swc 配置
+       jsc: {
+         transform: {
+           react: {
+             runtime: 'automatic',
+           },
+         },
+       },
+     },
+   ],
+ },
});
```

然后在 `package.json` 中加入 `test` 脚本：

```diff title="package.json"
{
  "scripts": {
+   "test": "jest"
  }
}
```

配置完成后，就可以开始编写单元测试了。

### 非 UI 测试

假设现在要测试 `add` 函数如下：

```ts title="src/utils/add.ts"
export default function add(a, b) {
  return a + b;
}
```

新建一个测试用例：

```ts title="tests/add.spec.ts"
import add from '../src/add';

test('add function', () => {
  expect(add(1, 2)).toBe(3);
});
```

这时，运行 `npm run test` 查看测试结果了。

### UI 测试

组件 UI 测试推荐使用 [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) 和 [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)。

首先安装依赖：

```bash
$ npm i @testing-library/react jest-environment-jsdom @testing-library/jest-dom -D
```

然后在项目根目录下新建 `jest-setup.ts` 并写入以下内容，以扩展匹配器(matchers)：
```ts title="jest-setup.ts"
import '@testing-library/jest-dom';
```

最后在 `jest.config.mjs` 中加入以下内容：
```diff title="jest.config.mjs"
import { defineJestConfig } from '@ice/app';

export default defineJestConfig({
+ setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
+ testEnvironment: 'jest-environment-jsdom',
});
```

假设现在要测试一个 Header 组件：
```tsx title="src/components/Header.tsx"
export default function Header() {
  return (
    <h2 data-testid="title">Jest Test</h2>
  );
}
```

编写组件的测试用例：
```tsx title="tests/Header.spec.tsx"
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

test('test Header component', () => {
  render(<Header />);
  expect(screen.getByTestId('title')).toHaveTextContent('Jest Test');
});
```

最后，运行 `npm run test` 就可以查看测试结果了。

## Vitest

### 依赖安装

```bash
$ npm i vitest -D
```

### 配置

首先需要在项目的根目录下新建 vitest.config.mjs 文件，并加入以下内容：

```js title="vitest.config.mjs"
import { defineVitestConfig } from '@ice/app';

export default defineVitestConfig({});
```
`defineVitestConfig` 方法返回的是 ice.js 默认配置好的 vitest 配置，支持传入自定义的 [vitest 配置](https://vitest.dev/config/)。

defineVitestConfig 入参支持三种写法：

- `vitest.UserConfig`
- `Promise<vitest.UserConfig>`
- `(env) => Promise<vitest.UserConfig>`

以修改 `include` 参数为例：

```diff title="vitest.config.mjs"
import { defineVitestConfig } from '@ice/app';

export default defineVitestConfig({
+ test: {
+   include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
+ }
});
```
然后在 `package.json` 中加入 `test` 脚本：

```diff title="package.json"
{
  "scripts": {
+   "test": "vitest"
  }
}
```
### 非 UI 测试

同样测试 [Jest 非 UI 测试章节](#非-ui-测试) 中的 `Header` 组件，编写以下的测试用例：

```ts title="tests/add.spec.ts"
import { test, expect } from 'vitest';
import add from '../src/add';

test('add', () => {
  expect(add(1, 2)).toBe(3);
});
```

现在可以运行 `npm run test` 查看测试结果。

### UI 测试

首先安装依赖：

```bash
$ npm i @testing-library/react jsdom @testing-library/jest-dom @vitejs/plugin-react@1.3.2 -D
```

然后在项目根目录下新建 `vitest-setup.js` 并写入以下内容，以扩展匹配器(matchers)：

```ts title="vitest-setup.js"
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

最后在 `vitest.config.mjs` 中加入以下内容：

```diff title="vitest.config.mjs"
import { defineVitestConfig } from '@ice/app';
+ import react from '@vitejs/plugin-react';

export default defineVitestConfig({
+ test: {
+   environment: 'jsdom',
+   setupFiles: ['./vitest-setup.js'],
+   plugins: [react()],                // 支持解析 JSX 语法
+ },
});
```

假设现在测试一个 Header 组件：

```tsx title="src/components/Header.tsx"
export default function Header() {
  return (
    <h2 data-testid="title">Vitest Test</h2>
  );
}
```

编写组件的测试用例：

```tsx title="tests/Header.spec.tsx"
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

test('test Header component', () => {
  render(<Header />);
  expect(screen.getByTestId('title')).toHaveTextContent('Vitest Test');
});
```

最后，运行 `npm run test` 就可以查看测试结果了。