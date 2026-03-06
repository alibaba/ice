# ice.js React 19 升级方案

> 结合 AI 编程的完整升级路线图

## 重要决策：移除 Rax 兼容层

**决策背景**：Rax 已进入下线阶段，ice v4 不再提供 Rax 兼容支持。

**影响范围**：
- `packages/rax-compat/` - 删除
- `packages/plugin-rax-compat/` - 删除
- `packages/jsx-runtime/` - 清理 Rax 相关代码
- Examples 和文档 - 移除 Rax 相关内容

**用户迁移策略**：
- 短期：继续使用 ice v3.x（维护到 2026-12）
- 长期：使用 Rax-to-React 迁移工具或重写

---

## 项目现状分析

```
ice-monorepo
├── @ice/app (v3.6.5)          # 核心框架，peer: react>=18.0.0
├── @ice/runtime (v1.5.7)      # 运行时，peer: react^18.1.0
├── @ice/bundles (v0.2.9)      # 构建依赖
├── ~~rax-compat (v0.4.1)~~    # ❌ 删除
├── ~~@ice/plugin-rax-compat~~ # ❌ 删除
├── @ice/jsx-runtime (v0.3.2)  # JSX 运行时，清理 Rax 代码
├── @ice/miniapp-react-dom     # 小程序 reconciler (react-reconciler@0.27.0)
└── 20+ plugins...
```

**当前依赖**: React 18.2.0, react-router-dom 6.21.3

---

## React 19 核心变化（影响 ice 的部分）

### 1. Breaking Changes
- `forwardRef` 被废弃 → ref 直接作为 prop
- `ReactDOM.render` 彻底移除 → 已使用 createRoot 的无影响
- `useCallback` 在 React 19 中默认稳定
- Context.Provider → 可直接使用 Context
- `useFormState` 重命名为 `useActionState`

### 2. New Features（ice 可受益）
- **Actions**: 原生支持异步表单提交
- **useOptimistic**: 乐观更新
- **Document Metadata**: 原生支持 `<title>`, `<meta>`
- **Stylesheet Support**: 内置样式表管理
- **Async Scripts**: 更好的脚本加载
- **Server Components**: 改进的 SSR 支持

### 3. TypeScript 变化
- `React.FC` 类型变化
- JSX 命名空间调整
- ref 类型更宽松

---

## 升级里程碑规划

### 阶段 0: 基础设施准备 (Week 1)
**目标**: 建立 AI 编程环境，创建自动化工具

**任务清单**:
- [ ] 创建 `react-19-upgrade` 分支
- [ ] 搭建 AI Coding Agent 环境
- [ ] 创建类型检查脚本
- [ ] 创建依赖分析脚本
- [ ] 创建 Rax 代码扫描脚本
- [ ] 设置 CI 流水线验证

**AI Prompt 模板**:
```
你正在协助 ice.js 框架升级到 React 19。
请分析以下代码文件，找出所有与 React 18 相关的 API 调用，
并列出需要修改的地方：

文件: {file_path}
内容: {content}

请按以下格式输出：
1. 使用的 React 18 API 列表
2. React 19 的对应替代方案
3. 风险等级 (high/medium/low)
4. 建议的代码修改
```

---

### 阶段 1: 依赖升级 (Week 1-2)
**目标**: 升级 package.json 依赖，解决版本冲突

**涉及 Packages**:

| Package | 当前版本 | 目标版本 | 风险 |
|---------|----------|----------|------|
| react | 18.2.0 | 19.x | medium |
| react-dom | 18.2.0 | 19.x | medium |
| @types/react | 18.x | 19.x | low |
| @types/react-dom | 18.x | 19.x | low |
| react-router-dom | 6.21.3 | 7.x | **high** |
| react-reconciler | 0.27.0 | 0.31.0 | **high** |

**删除的 Packages**:
- `rax-compat` - 不再维护
- `@ice/plugin-rax-compat` - 不再维护

**AI 任务**:
```
请分析 monorepo 中的所有 package.json，
找出所有与 React 相关的依赖，并生成升级后的版本。

要求：
1. 保持 workspace 协议不变
2. peerDependencies 要兼容 React 18 和 19
3. 标记需要手动检查的依赖
4. 移除所有 rax-compat 相关依赖

输出格式：JSON 格式的依赖映射表
```

**关键决策点**:
- react-router-dom v6 → v7 是重大版本升级，需要单独处理
- react-reconciler 升级可能影响小程序渲染

---

### 阶段 2: 核心运行时改造 (Week 2-4)
**目标**: 升级 @ice/runtime 和 @ice/app

#### 2.1 @ice/runtime 改造清单

**文件**: `packages/runtime/src/Document.tsx`
```typescript
// React 19 后可以直接使用 Context 作为 Provider
// 当前代码：
<Context.Provider value={value}>

// 可以简化为：
<Context value={value}>
```

**文件**: `packages/runtime/src/routes.tsx`
- 检查 `forwardRef` 使用
- 检查 `React.FC` 类型使用

**文件**: `packages/runtime/src/index.ts`
- 导出新的 React 19 hooks（可选）
- **移除所有 Rax 相关导出**

#### 2.2 React 19 新特性集成（可选增强）

**利用 Document Metadata API**:
```typescript
// 当前实现：通过自定义组件注入 meta/title
export const Meta: MetaType = (props) => {
  // ... 复杂实现
};

// React 19 后可以直接：
export const Meta = () => {
  return (
    <>
      <meta name="description" content="..." />
      <title>Page Title</title>
    </>
  );
};
```

**AI 任务**:
```
请重构以下 React 组件，移除 forwardRef 的使用，
改用 React 19 的 ref-as-prop 特性：

{component_code}

要求：
1. 保持 TypeScript 类型正确
2. 保持向后兼容（如果可能）
3. 添加必要的类型断言
```

---

### 阶段 3: 移除 Rax 兼容层 (Week 3)
**目标**: 彻底清理 Rax 相关代码

#### 3.1 删除 Packages

```bash
# 删除目录
rm -rf packages/rax-compat
rm -rf packages/plugin-rax-compat

# 更新 workspace
# 从 pnpm-workspace.yaml 中移除
```

#### 3.2 清理关联代码

**检查清单**:
- [ ] `packages/jsx-runtime` - 移除 Rax 分支逻辑
- [ ] `packages/bundles` - 移除 rax 相关依赖
- [ ] `packages/app` - 移除 rax 配置选项
- [ ] `examples/` - 删除所有 rax 示例
- [ ] `website/` - 移除 rax 文档

**AI 任务**:
```
请扫描以下文件，找出所有与 Rax 相关的代码：
- 条件分支：if (isRax) / if (framework === 'rax')
- 导入语句：import {...} from 'rax'
- 类型引用：Rax.Component, Rax.Element
- 配置项：rax: true, compat: 'rax'

输出格式：
{
  "file": "path/to/file",
  "lines": [10, 25, 30],
  "type": "import|condition|config|comment",
  "suggestion": "删除|替换为..."
}
```

---

### 阶段 4: 小程序运行时升级 (Week 4-5)
**目标**: 升级 @ice/miniapp-react-dom

**关键依赖**: react-reconciler@0.27.0 → 0.31.0

**Reconciler 升级检查清单**:
- [ ] hostConfig 配置项变化
- [ ] 新的 reconciler 标志
- [ ] 更新调度器配置

**AI 任务**:
```
请比较 react-reconciler 0.27.0 和 0.31.0 的 hostConfig 差异，
并生成迁移指南。

当前 hostConfig:
{current_config}

目标版本: 0.31.0
```

---

### 阶段 5: Plugin 生态升级 (Week 5-6)
**目标**: 升级所有 plugin 包

**高优先级 Plugins**:
1. ~~plugin-rax-compat~~ - **已删除**
2. plugin-request (使用 hooks)
3. plugin-store (可能使用 Context)
4. plugin-auth
5. plugin-i18n

**批量处理脚本**:
```bash
# AI 辅助批量升级
for pkg in packages/plugin-*; do
  echo "Processing $pkg..."
  # 运行类型检查
  # 运行 AI 分析
  # 应用自动修复
done
```

---

### 阶段 6: 测试与验证 (Week 6-8)
**目标**: 全面测试，确保稳定性

**测试矩阵**:

| 场景 | 优先级 | 测试方式 |
|------|--------|----------|
| CSR 应用 | P0 | 自动化 + 人工 |
| SSR 应用 | P0 | 自动化 + 人工 |
| SSG 应用 | P0 | 自动化 |
| 小程序 | P0 | 人工 |
| ~~Rax 兼容模式~~ | - | **已移除** |
| 微前端 (icestark) | P1 | 人工 |

**AI 辅助测试**:
```
请为以下组件生成单元测试，验证 React 19 兼容性：

{component_code}

测试要求：
1. 测试 ref 传递
2. 测试 Context 使用
3. 测试 Suspense 行为
4. 测试 render 模式
```

---

## AI 编程工作流设计

### 1. 代码分析阶段

```
扫描代码库 → 识别 React API → 分类风险等级 → 生成修改建议 → 人工审核 → 应用修改
```

### 2. 自动化脚本

**依赖分析脚本** (`scripts/analyze-react-deps.ts`):
```typescript
import { glob } from 'glob';
import * as fs from 'fs';

const reactApis = [
  'forwardRef',
  'useImperativeHandle',
  'ReactDOM.render',
  'renderToString',
  'useFormState', // 重命名为 useActionState
];

async function analyze() {
  const files = await glob('packages/**/*.ts{,x}');
  const results = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const api of reactApis) {
      if (content.includes(api)) {
        results.push({ file, api, line: findLine(content, api) });
      }
    }
  }
  
  console.table(results);
}
```

**Rax 代码扫描脚本** (`scripts/scan-rax-code.ts`):
```typescript
import { glob } from 'glob';
import * as fs from 'fs';

const raxPatterns = [
  /from\s+['"]rax['"]/,
  /from\s+['"]rax-compat['"]/,
  /isRax\s*[=:]/,
  /framework\s*===?\s*['"]rax['"]/,
  /rax:\s*true/,
  /compat:\s*['"]rax['"]/,
];

async function scanRax() {
  const files = await glob('packages/**/*.ts{,x}');
  const results = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
      for (const pattern of raxPatterns) {
        if (pattern.test(line)) {
          results.push({ file, line: idx + 1, code: line.trim() });
        }
      }
    });
  }
  
  console.table(results);
}
```

**类型检查脚本** (`scripts/type-check.ts`):
```typescript
import { execSync } from 'child_process';

const packages = [
  '@ice/runtime',
  '@ice/app',
  // 'rax-compat', // 已删除
  // ...
];

for (const pkg of packages) {
  console.log(`Checking ${pkg}...`);
  try {
    execSync(`pnpm --filter ${pkg} type-check`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`${pkg} failed type check`);
  }
}
```

### 3. AI Agent 配置

**Cursor / Windsurf 配置** (`.cursorrules`):
```
# React 19 升级专项配置

## 上下文
- 项目: ice.js 框架
- 目标: 从 React 18 升级到 React 19，同时移除 Rax 支持
- 类型: Monorepo (pnpm workspace)

## 代码规范
1. 优先使用 ref-as-prop 替代 forwardRef
2. 使用 useActionState 替代 useFormState
3. 保持 TypeScript 严格模式
4. 删除所有 Rax 相关代码
5. 不要保留向后兼容的 Rax 代码

## 检查清单
修改代码后必须检查：
- [ ] TypeScript 类型正确
- [ ] 没有使用废弃 API
- [ ] 没有 Rax 相关代码残留
- [ ] 单元测试通过

## 常见模式

### forwardRef 迁移
Before:
```tsx
import { forwardRef } from 'react';
const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});
```

After:
```tsx
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
const Component = ({ ref, ...props }: Props) => {
  return <div ref={ref}>{props.children}</div>;
};
```

### Rax 代码清理
Before:
```tsx
import { createElement } from 'rax';
import { isRax } from '@ice/shared';

if (isRax) {
  return createElement('div', props);
}
```

After:
```tsx
// 直接删除 Rax 分支，只保留 React 实现
return React.createElement('div', props);
```
```

---

## 风险与应对策略

### 高风险项

1. **react-router-dom v6 → v7**
   - 影响: 路由 API 可能重大变化
   - 应对: 单独升级，充分测试

2. **react-reconciler 升级**
   - 影响: 小程序渲染可能异常
   - 应对: 分阶段灰度，保留回滚方案

3. **Rax 用户迁移**
   - 影响: 存量 Rax 项目无法升级 ice v4
   - 应对: 
     - 明确文档说明
     - ice v3 维护到 2026-12
     - 提供 Rax-to-React 迁移指南

4. **第三方 Plugin 生态**
   - 影响: 社区插件可能依赖 Rax
   - 应对: 提前通知社区，提供迁移指南

### 低风险项

1. **TypeScript 类型**
   - 自动化工具可以解决大部分

2. **JSX 转换**
   - 新 JSX 运行时向后兼容

---

## 发布策略

### 版本规划

```
ice.js v4.0.0 (React 19 支持，移除 Rax)
├── @ice/app@4.0.0
├── @ice/runtime@2.0.0
├── ~~rax-compat~~ ❌ 删除
├── ~~@ice/plugin-rax-compat~~ ❌ 删除
└── ...
```

### 兼容性策略
- peerDependencies: `react: ^18.0.0 || ^19.0.0`
- 保留 v3 分支用于 React 18 + Rax 维护
- v4 主分支面向 React 19，无 Rax

### 迁移指南（面向用户）

```markdown
## 从 ice.js v3 升级到 v4

### 重要提醒
v4 不再支持 Rax，如果你的项目使用 Rax，请：
1. 继续使用 ice v3.x（维护到 2026-12）
2. 或迁移到 React 后再升级

### 升级步骤

1. 升级依赖
   npm install @ice/app@4 react@19 react-dom@19

2. 检查废弃 API
   npx ice migrate --check

3. 自动修复
   npx ice migrate --fix

4. 手动处理
   - forwardRef → ref prop
   - useFormState → useActionState
   - 删除 Rax 相关代码
```

---

## 工具链集成

### ESLint 规则

`.eslintrc.react19.js`:
```javascript
module.exports = {
  plugins: ['react19-upgrade'],
  rules: {
    'react19-upgrade/no-forward-ref': 'error',
    'react19-upgrade/no-use-form-state': 'error',
    'react19-upgrade/prefer-ref-prop': 'warn',
    'react19-upgrade/no-rax-imports': 'error', // 新增
  },
};
```

### Codemod 脚本

```bash
# 自动转换 forwardRef
npx @ice/codemod forward-ref-to-ref-prop

# 自动转换 useFormState
npx @ice/codemod use-form-state-to-action-state

# 删除 Rax 代码
npx @ice/codemod remove-rax-compat
```

---

## 总结

### 时间线

| 阶段 | 周期 | 产出 |
|------|------|------|
| 0 | 1 week | 基础设施 |
| 1 | 1 week | 依赖升级 |
| 2 | 2 weeks | 核心改造 |
| 3 | 1 week | **移除 Rax** |
| 4 | 1 week | 小程序升级 |
| 5 | 1 week | Plugin 升级 |
| 6 | 2 weeks | 测试验证 |
| **总计** | **9 weeks** | v4.0.0 |

### AI 介入点

1. **代码分析**: 自动识别需要修改的代码
2. **Rax 扫描**: 自动找出所有 Rax 相关代码
3. **类型修复**: 自动修复 TypeScript 错误
4. **测试生成**: 自动生成边界测试用例
5. **文档生成**: 自动生成迁移文档

### 成功标准

- [ ] 所有 packages 通过类型检查
- [ ] 零 Rax 代码残留
- [ ] 测试覆盖率 > 90%
- [ ] 示例项目全部运行正常
- [ ] 性能不下降（或提升）
- [ ] 社区反馈良好

---

*文档版本: v1.1*
*更新日期: 2026-03-06*
*更新内容: 移除 Rax 兼容层*
*负责人: AI 辅助升级小组*
