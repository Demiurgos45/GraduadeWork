export default function choiceOfNoun(value, nouns) {
  if (typeof(value) !== 'number') {
    return ''
  }
  const cases = [2, 0, 1, 1, 1, 2]
  return nouns[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]]
}