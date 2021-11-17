import store from './store';

function Home() {
  const [state] = store.useModel('counter');
  return (
    <div>
      Home Page
      <div>count: {state.count}</div>
    </div>
  );
}

export default Home;
