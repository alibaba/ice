export function renderHTML(requestContext, documentOnly) {
  const { req } = requestContext;
  return `<html><body>${req.url}${documentOnly ? '-document' : ''}</body></html>`;
}