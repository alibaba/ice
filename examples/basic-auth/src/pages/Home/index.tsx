/* eslint jsx-a11y/aria-role: 0 */
import React from 'react';
import { Link, useAuth, withAuth } from 'ice';
import Auth from '@/components/Auth';

const Demo1 = withAuth(({ auth }) => {
  return (
    <div>
      <h3>Class 组件演示：</h3>
      <div>
        <span>权限列表：</span>
        <code>{JSON.stringify(auth)}</code>
      </div>
    </div>
  );
});

const Demo2 = () => {
  const [auth, setAuth]= useAuth();
  function addAuth() {
    setAuth({
      deleteRepo: true
    });
  }

  function resetAuth() {
    setAuth({
      followRepo: true,
      starRepo: true,
    });
  }

  function deleteAuth() {
    setAuth({
      starRepo: false,
      followRepo: false
    });
  }

  return (
    <div>
      <div style={{marginBottom: '10px'}}>
        <h3>函数组件演示：</h3>
        <div>
          <span>权限列表：</span>
          <code>{JSON.stringify(auth)}</code>
        </div>
      </div>
      <Auth hasAuth={auth.starRepo}>
        <button type="button">Star</button>
      </Auth>
      <Auth hasAuth={auth.followRepo}>
        <button type="button">Follow</button>
      </Auth>
      <Auth hasAuth={auth.deleteRepo}>
        <button type="button">Delete</button>
      </Auth>
      <hr />
      <button type="button" onClick={resetAuth}>重置权限</button>
      <button type="button" onClick={addAuth}>添加权限</button>
      <button type="button" onClick={deleteAuth}>删除权限</button>
    </div>
  );
};

const HomePage = (props) => {
  console.log('home page props', props);
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/about">Go To About</Link><br />
      <Demo1 />
      <Demo2 />
    </div>
  );
};

HomePage.pageConfig = {
  title: 'test',
  auth: ['guest'],
};

export default HomePage;
