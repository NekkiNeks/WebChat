export function parseUsernameFromQuery(url: string | undefined) {
  if (!url) return null;
  // TODO: Если будет несколько параметров?
  return url.split("=")[1];
}
