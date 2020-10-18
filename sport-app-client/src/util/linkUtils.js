export function getDomainFromLink(link) {
  return link.replace('http://','')
  .replace('https://','')
  .replace('www.', '')
  .split(/[/?#]/)[0];
}