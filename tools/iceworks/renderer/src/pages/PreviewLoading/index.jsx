import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const render = (Component) => {
  ReactDOM.render(<Component />, container);
};

render(App);
