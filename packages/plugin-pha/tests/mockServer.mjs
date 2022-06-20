export function renderToHTML(requestContext, documentOnly) {
  const { req } = requestContext;
  return {
    value: `<html><body>${req.url}${documentOnly ? '-document' : ''}</body></html>`,
    code: 200,
  };
}