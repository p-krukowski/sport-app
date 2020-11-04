export function getDomainFromLink(link) {
  if (link != null) {
    return link.replace('http://','')
    .replace('https://','')
    .replace('www.', '')
    .split(/[/?#]/)[0];
  } else {
    return ''
  }
}