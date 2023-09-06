export default function Layout(props) {
  console.log('Render: Layout');

  return (
    <div>
      <h1>Suspense App</h1>
      {props.children}
    </div>
  );
}