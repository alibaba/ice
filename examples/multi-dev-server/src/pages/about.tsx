export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        APP_NAME:{' '}
        {
          // @ts-expect-error
          APP_NAME
        }
      </p>
    </div>
  );
}
