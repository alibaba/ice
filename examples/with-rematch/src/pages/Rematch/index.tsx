import React from 'react';
import { connect } from 'ice';
import Child from './Child';
// import Child2 from './Child2';

const Home = (props) => {
  const { userState } = props;
  return (
    <>
      <div>page stars: {userState.stars}</div>
      <Child />
      {/* <Child2 /> */}
    </>
  );
};

const mapState = state => ({
  userState: state.user,
});

export default connect(mapState)(Home);
