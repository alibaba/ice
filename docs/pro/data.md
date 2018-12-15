---
title: 数据方案
order: 7
category: ICE Design Pro
---

在模板中，我们集成了 Redux 作为应用的状态管理，但这不是唯一的，你可以选择你熟悉的其他状态管理类的库。

## 使用

在模板中，我们提供了基础的 redux 示例，避免使用起来过于繁琐和要删除大量不必要的代码。模板中完成了从 `注册 => 登录 => 获取用户信息 =》权限判断 =》 主页` 的完整示例。下面以登录模块为例来了解我们是如何使用 redux 的。

### 分型结构

我们推荐按照功能模块来组织我们的 redux 代码，如下结构，而不是把所有的 action 或者 reducer 集中化管理，避免项目在发展过程中一个 actions 目录下面出现几十甚至是上百个 action 文件，修改或者是删除一个文件需要在不同的目录下查找。这是我们按照功能模块来组织的最简单的原因之一。

```
.
├── UserLogin.jsx
├── actions.js
├── constants.js
├── index.js
└── reducer.js
```

### 状态容器

Redux 可以方便的管理你的应用状态，提供可预测的状态管理，下面是模板中的一个完整示例：

Constants

```
/*
 * LoginConstants
 *
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const USER_LOGIN_REQUEST = 'PRO/USER_LOGIN_REQUEST';
export const USER_LOGIN_FAILURE = 'PRO/USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'PRO/USER_LOGIN_SUCCESS';

**Action Creators**

/*
 * Login Actions
 */

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    isLoading: true,
  };
};

const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userLoginFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userLogin = (params) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const response = await login(params);
      dispatch(userLoginSuccess(response.data));
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};
```

**Reducer**

```
/*
 * LoginReducer
 *
 */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './constants';

// The initial state of the login
const initialState = {};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default loginReducer;
```

**Container**

```
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      ...
    );
  }
}

const mapDispatchToProps = {
  userLogin,
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(UserLogin);
```
