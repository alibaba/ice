async function Comments() {
  const comments = import.meta.renderer === 'server' ? await getServerData() : await getClientData();

  console.log('Render comments by: ', import.meta.renderer);

  return (
    <div>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </div>
  );
}

export default Comments;

const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

async function getServerData() {
  console.log('load server data');

  throw new Error('server error');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 3000);
  });

  return fakeData;
}


async function getClientData() {
  console.log('load client data');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 3000);
  });

  return fakeData;
}