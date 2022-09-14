function UserInfo({ name }) {
  return (
    <div>name: {name}</div>
  );
}

UserInfo.getInitialProps = () => {
  return {
    name: 'Jack'
  };
};

export default UserInfo;