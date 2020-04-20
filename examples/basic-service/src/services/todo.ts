import { createService } from 'ice';

export interface GetOneParams {
  id: string;
}

export interface AddParams {
  title: string;
  done?: boolean;
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

export type Todos = OriginTodo[];

function transformTodo(todo: OriginTodo): Todo {
  return {
    ...todo,
    label: todo.done ? '已完成' : '未完成',
  };
}

interface Types {
  getOne(params: GetOneParams): Todo;
  getAll(): Todos;
  add(params: AddParams): Todo;
}

const getAll = {
  options: {
    url: '/todo_getAll',
  },
};

const getOne = {
  options: {
    url: '/todo_getOne',
  },
  dataHandle: transformTodo,
};

const add = {
  options: {
    url: '/todo_add',
    method: 'post',
  },
  dataHandle: transformTodo,
};

export default createService<Types>(
  {
    getOne,
    getAll,
    add,
  },
  {
    dataHandler(response) {
      return response.data;
    }
  }
);
