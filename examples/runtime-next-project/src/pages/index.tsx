import {
  createFileRoute,
} from '@tanstack/react-router';

export default function Index() {
  return <div>Index</div>;
}

export const Route = createFileRoute('/')({
  component: Index,
});
