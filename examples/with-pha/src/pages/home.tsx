import { defineGetConfig } from 'ice';

export default function Home() {
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export const getConfig = defineGetConfig(() => {
  return {
    queryParamsPassKeys: [
      'questionId',
      'source',
      'disableNav',
    ],
    title: 'Home',
  };
});
