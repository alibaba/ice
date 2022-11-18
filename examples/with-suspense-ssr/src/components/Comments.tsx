import { useDataContext } from './DataContext';


export default function Comments() {
  const data = useDataContext();
  const comments = data.read();

  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `
        window.__DATA_COMMENTS__ = ${JSON.stringify(comments)}
      ` }}
      />
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </div>
  );
}

