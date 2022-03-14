import { removeHtmlEntryScript } from '../src/index';

describe('vite-plugin-index-html', () => {
  test('remove-html-entry-script', () => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
        <meta name="viewport" content="width=device-width" />
        <title>icestark</title>
      </head>
      <body>
        <div id="ice-container"></div>
      </body>
    </html>
    `

    expect(removeHtmlEntryScript('/Users/ice', html, '/icestark-demo/ice-vite/child/src/app')).toBe(html)
  })

  test('remove-html-entry-script-vite/src-irregular', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
    `
    const result = html.replace('<script type="module" src="/src/main.tsx"></script>', '<!-- removed by vite-plugin-index-html <script type="module" src="/src/main.tsx"></script> -->');

    expect(removeHtmlEntryScript('/Users/ice', html, '/icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, '/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'src/main.tsx')).toBe(result)
  })

  test('remove-html-entry-script-vite/src-relative-A', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="./src/main.tsx"></script>
      </body>
    </html>
    `
    const result = html.replace('<script type="module" src="./src/main.tsx"></script>', '<!-- removed by vite-plugin-index-html <script type="module" src="./src/main.tsx"></script> -->');

    expect(removeHtmlEntryScript('/Users/ice', html, '/icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, '/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'src/main.tsx')).toBe(result)
  })

  test('remove-html-entry-script-vite/src-relative-B', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="src/main.tsx"></script>
      </body>
    </html>
    `
    const result = html.replace('<script type="module" src="src/main.tsx"></script>', '<!-- removed by vite-plugin-index-html <script type="module" src="src/main.tsx"></script> -->');

    expect(removeHtmlEntryScript('/Users/ice', html, '/icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './icestark-demo/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, '/src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, './src/main.tsx')).toBe(result)
    expect(removeHtmlEntryScript('/Users/ice', html, 'src/main.tsx')).toBe(result)
  })
});
