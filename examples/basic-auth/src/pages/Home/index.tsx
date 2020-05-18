import React from 'react';
import { useRole, withRole } from 'ice';

@withRole
class Demo1 extends React.PureComponent {
  public render() {
    const { role } = this.props;
    console.log(this.props);
    return (
      <div>
        <span>Class 组件演示：</span>
        {role.map((r, i) => {
          return <span key={i} style={{marginRight: '5px'}}>{r}</span>
        })}
      </div>
    )
  }
}

const Demo2 = () => {
  const [role, setRole]= useRole();

  function updateRole() {
    setRole(['user']);
  }

  function deleteRole() {
    setRole([]);
  }

  return (
    <div>
      <div style={{marginBottom: '10px'}}>
        <span>函数组件演示：</span>
        {role.map((r, i) => {
          return <span key={i} style={{marginRight: '5px'}}>{r}</span>
        })}
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
  // roles: ['admin']
  setRole: () => {
    return ['admin'];
  }
}

export default HomePage;
