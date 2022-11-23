import * as Comments from '@/components/Comments';
import * as Footer from '@/components/Footer';
import { IceSuspense } from '@/components/IceSuspense';

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <IceSuspense module={Comments} />
      <IceSuspense module={Footer} />
    </div>
  );
}