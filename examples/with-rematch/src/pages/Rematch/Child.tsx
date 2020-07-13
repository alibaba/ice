import * as React from 'react';
import { connect } from 'ice';

const Home = (props) => {
  const { userState, userAction } = props;
  return (
    <>
      <div>
        <div>stars: {userState.stars}</div>
        <span onClick={() => {
          userAction.updateStars(1);
        }}>新增一个 star</span>
      </div>
    </>
  );
};

const mapState = models => ({
  userState: models.user,
});

const mapDispatch = actions => ({
  userAction: actions.user,
});

export default connect(
  mapState,
  mapDispatch,
)(Home);
