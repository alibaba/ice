# plugin-service

use `createService` in icejs.

## Install

```bash
$ npm i --save build-plugin-ice-service
```

Add plugin to `build.json`:

```json
{
  "plugins": [
    "build-plugin-ice-service"
  ]
}
```

## Usage

create a service:

```ts
// src/services/todos
import { createService } from 'ice';

export interface GetOneParams {
 id: string;
}

export interface OriginTodo {
  id: string;
  title: string;
  done: boolean;
  label?: string;
}

export interface Todo extends OriginTodo {
  label: string;
}

function transformTodo(todo: OriginTodo): Todo {
  return {
    ...todo,
    label: todo.done ? '已完成' : '未完成',
  };
}

interface Types {
  getOne(params: GetOneParams): Todo;
}

const getOne = {
  options: {
    url: '/todo',
  },
  dataHandle: transformTodo,
};

export default createService<Types>(
  {
    getOne,
  }, 

  // default config
  {
    options: {
      method: 'get',
    },
  }
);
```

use service:

```js
import todosService from '@/services/todos';

export default {
  state: {
    todos: []
  },
  reducers: {
    addOne(prevState, todo) {
      prevState.todos.push(todo);
    }
  },
  effects: (dispatch) => {
    async add(id) {
      const todo = await todosService.getOne({ id });
      this.addOne(todo);
    }
  }
}
```
