# plugin-store

builtin `icestore` in icejs

## Usage

### Directory structure

```markdown
src
├── models                // global models
│   └── user.ts
└── pages
    ├── About
    │   ├── index.tsx
    │   └── models.ts     // single models
    ├── Dashboard
    │   ├── analysis.tsx
    │   ├── index.tsx
    │   └── models         // multi models
    │       ├── modelA.ts
    │       └── modelB.ts
    └── index.tsx
```

### Define a model

```ts
// src/models/user.ts
export default {
  state: {
    user: {}
  },

  reducers: {
    setUserInfo: () => {}
  },

  effects: {
    getUserInfo: async () => {}
  }
};

```

### With Component

```ts
import { useApp } from 'ice'

const View = () => {
  const { store } = useApp()
  const [state, actions] =  store.useModel('user')
  // do something...
}
```

[More](https://github.com/ice-lab/icestore)
