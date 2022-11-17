import { Link } from 'ice';
import pageStore from './store';

function Blog() {
  const [infoState] = pageStore.useModel('info');

  return (
    <div>
      Blog Count: {infoState.posts.length}
      <ul>
        {infoState.posts.map(({ title, id }) => {
          return <Link to={id} key={id}><li>{title}</li></Link>;
        })}
      </ul>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Blog;
