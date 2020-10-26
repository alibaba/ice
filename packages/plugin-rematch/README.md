# plugin-ice-rematch

Easy use `rematch` in icejs.

## Install

```bash
$ npm i --save build-plugin-ice-rematch
```

## Usage

Add plugin to `build.json`:

```json
{
  "plugins": [
    "build-plugin-rematch"
  ]
}
```

Set runtime options to `src/index.ts`:

```js
import { runApp } from 'ice';

const appConfig = {
  // ref: https://rematch.github.io/rematch/#/api-reference/api?id=init
  rematch: {
    plugins: [],
    redux: {
      middlewars: [],
      initialState: {}
   }
  }
};

runApp(appConfig);
```

### Develop

#### 1. Create stores

Directory:

```diff
src/
+  - stores/
+    - user.ts
+    - message.ts
  - pages/
```

`stores/user.ts`:

```js
export default {
  state: {
    name: ''
  },
  reducers: {
    updateName(state, name) {
      return {...state, name }
    },
  },
  effects: (dispatch) => ({
    async updateNameAysnc(name, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.user.updateName(name)
    },
  }),
};
```

#### 2. Connect store in view

```js
// src/pages/components/user.ts
import * as React from 'react'
import { connect } from 'ice'

const ExampleComponent = props => (
  <div>
    The username is {props.userState.name}
    <button onClick={props.userAction.updateName.bind(null, 'foo')}>updateName</button>
    <button onClick={props.incrementAsync.bind(null, 'bar')}>updateNameAsync</button>
  </div>
);

const mapState = state => ({
  userState: state.user,
});

const mapDispatch = action => ({
  userAction: action.user,
});

export default connect(
  mapState,
  mapDispatch
)(Count);
```

## License

MIT
