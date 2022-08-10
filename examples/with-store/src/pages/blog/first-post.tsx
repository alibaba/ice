import { Link } from 'ice';
import pageStore from './store';

function FirstPost() {
  const [infoState] = pageStore.useModel('info');

  return (
    <>
      <article>
        <h2>{infoState.posts[0].title}</h2>
      </article>
      <div><Link to="/blog">Back</Link></div>
    </>
  );
}

export default FirstPost;
