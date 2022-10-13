export default function Downgrade() {
  const isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);

  if (isNode) {
    throw new Error('Downgrade to CSR.');
  }

  return (
    <>
      <h2>Page Downgrade to CSR.</h2>
    </>
  );
}

export function getConfig() {
  return {
    title: 'hello',
  };
}