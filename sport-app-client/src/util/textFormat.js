export function formatText(text) {
  let textArray = text.split(' ');
  let newTextArray = "";
  for (let word of textArray) {
    if (word.match("[#]{1}[\\w]{3,}")) {
      word = word.bold();
    }
    newTextArray = newTextArray.concat(" ", word);
  }
  return {__html: newTextArray};
}