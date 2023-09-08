'use server';

import EditButton from '@/components/EditButton';
import Counter from '@/components/Counter';
import InnerServer from '@/components/Content';

export default function Container() {
  return (
    <>
      <Counter>
        <InnerServer />
      </Counter>
      <EditButton noteId="editButton">
        hello world
      </EditButton>
      <div> {serverPrint('serverPrint call')} </div>
    </>
  );
}

export function serverPrint(sentence) {
  return sentence;
}