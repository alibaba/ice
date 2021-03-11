# plugin-hooks-store

builtin `ice/hooks-store` in icejs

## Usage

### Directory structure

```
src
├── hooks				  // global hooks
│   └── useUser.ts
│   └── useA.ts
├── pages
│   ├── Home
│   │   └── index.tsx
│   └── TodoList
│       ├── index.tsx
│       ├── hooksStore.ts // page hooksStore
│       └── hooks         // page hooks
│           ├── useTodoList.ts
│           └── useB.ts
└── hooksStore.ts		  // global hooksStore 
```

### Define a hook

```javascript
// src/hooks/useUser.ts
import { useState } from 'react';
import delay from '@/delay';

export default function useUser() {
  const [user, setUser] = useState({
    name: 'unknown',
  });

  async function login() {
    await delay(1000);
    setUser({ name: 'Alvin' });
  };

  return [
    user,
    login,
  ];
};
```

### Define a hooksStore

```javascript
// src/hooksStore.ts
import { createHooksStore } from 'ice';
import useUser from './hooks/useUser';

const hooksStore = createHooksStore({
  useUser
});

export default hooksStore;

// src/pages/TodoList/hooksStore.ts
import { createHooksStore } from 'ice';
import useTodoList from './hooks/useTodoList';

const hooksStore = createHooksStore({
  useTodoList
});

export default hooksStore;
```

### With Component

```javascript
// src/pages/TodoList/index.tsx
import React, { useEffect}  from 'react';
import hooksStore from '@/hooksStore';
import pageHooksStore from '@/pages/TodoList/hooksStore';

export default function () {
  const [user, login] = hooksStore.useHooks('useUser');
  const [todoList, refresh] = pageHooksStore.useHooks('useTodoList');
  const { name } = user;

  // do something...
};
```

### Config

Set global `initialstates` to `src/app.ts`:

```javascript
import { runApp } from 'ice'

const appConfig = {
  // Set global hooksStoreInitialStates
  hooksStore: {
    hooksStoreInitialStates: {}
  }
}
```

Set page `initialstates` to `src/pages/*/index.tsx`:

```javascript
const HomePage = () => {
  return (
    <>
      <h2>HomePage</h2>
    </>
  )
}

HomePage.pageConfig = {
  // Set page hooksStoreInitialStates
  hooksStoreInitialStates: {}
}
```

