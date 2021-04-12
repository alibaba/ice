# plugin-hooks-store

builtin `ice/hooks-store` in icejs

## Usage

### Config

Disable `plugin-store`  and use `plugin-hooks-store` in `build.json`:

```json
{
  "store": false,
  "plugins": ["build-plugin-hooks-store"]
}
```

### Directory structure

```
src
├── hooks                       // global hooks
│   └── useUser.ts
│   └── useA.ts
├── pages
│   ├── Home
│   │   └── index.tsx
│   └── TodoList
│       ├── index.tsx
│       ├── store.ts            // page store
│       └── hooks               // page hooks
│           ├── useTodoList.ts
│           └── useB.ts
└── store.ts                    // global store 
```

### Define a hook

```javascript
// src/hooks/useUser.ts
import { useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState({
    name: 'unknown',
  });

  async function login() {
    setUser({ name: 'Alvin' });
  };

  return [
    user,
    login,
  ];
};
```

### Define a store

```javascript
// src/store.ts
import { createHooksStore } from 'ice';
import useUser from './hooks/useUser';

const store = createHooksStore({
  useUser
});

export default store;

// src/pages/TodoList/store.ts
import { createHooksStore } from 'ice';
import useTodoList from './hooks/useTodoList';

const store = createHooksStore({
  useTodoList
});

export default store;
```

### With Component

```javascript
// src/pages/TodoList/index.tsx
import React, { useEffect}  from 'react';
import store from '@/store';
import pageStore from '@/pages/TodoList/store';

export default function () {
  const [user, login] = store.useHooks('useUser');
  const [todoList, refresh] = pageStore.useHooks('useTodoList');
  const { name } = user;

  // do something...
};
```
