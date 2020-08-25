const storageKey = {
  openId: 'openId',
  todos: 'todos'
};

async function getOpenId () {
  let openId;
  try {
    // eslint-disable-next-line
    const res = await wx.getStorage({
      key: storageKey.openId
    });
    openId = res.data.openId;
  } catch (err) {
    console.error(err);
  }
  return openId;
}

async function setOpenId (openId) {
  // eslint-disable-next-line
  await wx.setStorage({
    key: storageKey.openId,
    data: {
      openId
    }
  });
}

async function getStoredTodos () {
  let todos;
  try {
    // eslint-disable-next-line
    const res = await wx.getStorage({
      key: storageKey.todos
    });
    todos = res.data.todos;
  } catch (err) {
    console.error(err);
  }
  return todos;
}

async function storeTodos (todos) {
  // eslint-disable-next-line
  await wx.setStorage({
    key: storageKey.todos,
    data: {
      todos
    }
  });
}

export default {
  openId: {
    get: getOpenId,
    set: setOpenId
  },
  todos: {
    get: getStoredTodos,
    set: storeTodos
  }
};
