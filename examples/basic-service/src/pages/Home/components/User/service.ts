import { createService } from 'ice';

export interface GetUserParams {
  id: string;
}

export interface GetTodoParams {
  id: string;
}

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface User {
  id: string;
  name: string;
  age: number;
}

interface Types {
  getTodo(params: GetTodoParams): Todo;
  getUser(params: GetUserParams): User;
}

const getTodo = {
  options: {
    url: '/todo_getOne',
  },
};

const getUser = {
  isInit: true,
  options: {
    url: '/user_getOne',
  },
};

export default createService<Types>(
  {
    getTodo,
    getUser,
  },
  {
    options: {
      timeout: 3000,
    },
    dataHandler(response) {
      if (response.success) {
        return response.data;
      } else {
        console.error(response.errorMsg);
      }
    }
  },
  function(dataMap) {
    return dataMap.user;
  }
);
