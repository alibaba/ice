export default function home() {
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export function getConfig() {
  return {
    queryParamsPassKeys: [
      'questionId',
      'source',
      'disableNav',
    ],
    title: 'Home',
  };
}