/**
 * 通过 JavaScript 的形式模拟静态接口
 * 这样做的目的是可以直接打包出来部署在线上而不依赖后端或者 mock 接口
 */
export async function getUserProfile() {
  const data = await {
    name: '淘小宝',
    department: '技术部',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    userid: 10001,
  };
  return { data };
}

export async function login(params) {
  const { password, username } = params;
  let data = {};
  if (username === 'admin' && password === 'admin') {
    data = await {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'admin',
    };
  } else if (username === 'user' && password === 'user') {
    data = await {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'user',
    };
  } else {
    data = await {
      status: 401,
      statusText: 'unauthorized',
      currentAuthority: 'guest',
    };
  }

  return { data };
}

export async function postUserRegister() {
  const data = await {
    status: 200,
    statusText: 'ok',
    currentAuthority: 'user',
  };
  return { data };
}

export async function postUserLogout() {
  const data = await {
    status: 200,
    statusText: 'ok',
    currentAuthority: 'guest',
  };
  return { data };
}
