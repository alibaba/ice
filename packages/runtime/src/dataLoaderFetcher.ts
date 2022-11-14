/**
 * custom fetcher for load static data loader config
 * set globally to avoid passing this fetcher too deep
 */

let fetcher;

export function setFetcher(customFetcher) {
  fetcher = customFetcher;
}

export function loadDataByCustomFetcher(config) {
  return fetcher(config);
}