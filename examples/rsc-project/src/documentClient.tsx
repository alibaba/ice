'use client';
import { Meta, Title, Links, Main, Scripts } from 'ice';

export function DocumentClientHead() {
  return (
    <>
      <Meta />
      <Title />
      <Links />
    </>
  );
}

export function DocumentClientBody() {
  return (
    <>
      <Main />
      <Scripts />
    </>
  );
}

