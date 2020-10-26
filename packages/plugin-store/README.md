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
    │   └── model.ts     // single model
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

  actions: {
    getUserInfo: async () => {}
  }
};

```

### With Component

```ts
import { store } from 'ice/Home'

const View = () => {
  const [state, actions] =  store.useModel('user')
  // do something...
}
```

### Config

Set global `initialstates` to `src/app.ts`:

```ts
import { runApp } from 'ice'

const appConfig = {
  // Set global initialstates
  store: {
    initialStates: {}
  }
}
```

Set page `initialstates` to `src/pages/*/index.tsx`:

```ts
const HomePage = () => {
  return (
    <>
      <h2>HomePage</h2>
    </>
  )
}

HomePage.pageConfig = {
  // Set page initialstates
  initialstates: {}
}
```

[More](https://github.com/ice-lab/icestore)
