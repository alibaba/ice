import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';

<% if(reduxModule){ %>
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
<% } else { %>
import { HashRouter } from 'react-router-dom';
<% } %>


// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import router from './router';

<% if (reduxModule) { %>
import configureStore from './configureStore';
<% } %>

const history = createHashHistory();
<% if (reduxModule) { %>
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
<% } %>
const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <% if(reduxModule){ %>
    <Provider store={store}>
      <ConnectedRouter history={history}>{router()}</ConnectedRouter>
    </Provider>,
  <% } else { %>
    <HashRouter>{router()}</HashRouter>,
  <% } %>
  ICE_CONTAINER
);
