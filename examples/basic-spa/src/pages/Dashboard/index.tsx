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
  return (
    <>
      <h2>Dashboard Page...</h2>
      <Foo />
      <Bar />
      <Link to="/about">About</Link>
    </>
  );
};

export default Dashboard;
