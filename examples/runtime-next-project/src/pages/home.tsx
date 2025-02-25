import {
  createFileRoute,
} from '@tanstack/react-router';

export default function Home() {
  return <div>Home</div>;
}

export const Route = createFileRoute('/home')({
  component: Home,
});

