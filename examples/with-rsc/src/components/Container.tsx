'use server';

import EditButton from '@/components/EditButton';
import Counter from '@/components/Counter';
import InnerServer from '@/components/Content';

export default async function Container() {
  const data = await getData('http://localhost:4000/getData');

  return (
    <>
      <Counter>
        <InnerServer />
      </Counter>
      <EditButton noteId="editButton">
        hello world
      </EditButton>
      <div> {serverPrint('serverPrint call')} </div>
      <div> data from api server: {JSON.stringify(data)} </div>
    </>
  );
}

export function serverPrint(sentence) {
  return sentence;
}

export async function getData(url: string) {
  const res = await fetch(url);
  return res.json();
}