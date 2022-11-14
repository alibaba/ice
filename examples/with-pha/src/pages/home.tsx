import { definePageConfig } from 'ice';

export default function Home() {
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export const pageConfig = definePageConfig(() => {
  return {
    queryParamsPassKeys: [
      'questionId',
      'source',
      'disableNav',
    ],
    title: 'Home',
  };
});
