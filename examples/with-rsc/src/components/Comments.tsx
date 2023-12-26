async function Comments() {
  const comments = await getData();

  console.log('Render: Comments');

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

async function getData() {
  console.log('load comments');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 3000);
  });

  return fakeData;
}
