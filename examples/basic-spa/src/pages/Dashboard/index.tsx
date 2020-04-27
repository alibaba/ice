import React from 'react';
import { Link, useSearchParams, withSearchParams } from 'ice';

@withSearchParams
class Foo extends React.PureComponent {
  public render() {
    console.log('Foo:', this.props.searchParams);
    return (
      <>Foo</>
    );
  }
}

const Bar = () => {
  const searchParams = useSearchParams();
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
