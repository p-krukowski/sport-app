export const pageList = () => {
  let list = [];

  list.push(getPageObject("Panel", "/panel"));
  list.push(getPageObject("Newsy", "/newsy"));
  list.push(getPageObject("Wpisy", "/wpisy"));
  list.push(getPageObject("Wyniki", "/wyniki"));

  return list;
}

function getPageObject(name, address) {
  return ({name, address})
}