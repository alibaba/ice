'use server';

import EditButton from '@/components/EditButton.client';
import Counter from '@/components/Counter.client';
import InnerServer from '@/components/Content.server';

export default function ServerComp() {
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