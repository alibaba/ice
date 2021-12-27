import React from 'react';
import { Link, getSearchParams } from 'ice';

class Foo extends React.PureComponent {
  public render() {
    console.log('Foo:', getSearchParams());
    return (
      <>Foo</>
    );
  }
}

const Bar = () => {
  const searchParams = getSearchParams();
  console.log('Bar:', searchParams);
  return (
    <>Bar</>
  );
};

const Dashboard = (props) => {
  console.log('props:', props);
  const { pageConfig } = props;

  return (
    <>
      <h2>Dashboard Page...</h2>
      <span id="J_pageConfig-custom">{pageConfig.custom}</span>
      <Foo />
      <Bar />
      <Link to="/about">About</Link>
    </>
  );
};

export default Dashboard;
