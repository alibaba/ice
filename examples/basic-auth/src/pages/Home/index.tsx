/* eslint jsx-a11y/aria-role: 0 */
import React from 'react';
import { useRole, withRole } from 'ice';
import Auth from '@/components/Auth';

@withRole
class Demo1 extends React.PureComponent {
  public render() {
    const { role } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>Class 组件演示：</h3>
        <div>
          <span>权限列表：</span>
          {role.map((r, i) => {
            return <span key={i} style={{marginRight: '5px'}}>{r}</span>
          })}
          <Auth role={['admin']}>
            <button type="button">Admin 权限</button>
          </Auth>
        </div>
      </div>
    )
  }
}

const Demo2 = () => {
  const [role, setRole]= useRole();

  function updateRole() {
    setRole(['guest']);
  }

  function deleteRole() {
    setRole([]);
  }

  return (
    <div>
      <div style={{marginBottom: '10px'}}>
        <h3>函数组件演示：</h3>
        <div>
          <span>权限列表：</span>
          {role.map((r, i) => {
            return <span key={i} style={{marginRight: '5px'}}>{r}</span>
          })}
          <Auth role={['guest']}>
            <button type="button">Guest 权限</button>
          </Auth>
        </div>
      </div>
      <button type="button" onClick={updateRole}>更新权限</button>
      <button type="button" onClick={deleteRole}>删除权限</button>
    </div>
  )
}

const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Demo1 />
      <Demo2 />
    </div>
  );
};

HomePage.pageConfig = {
  // role: ['admin']
  setRole: () => {
    return ['admin'];
  }
}

export default HomePage;
