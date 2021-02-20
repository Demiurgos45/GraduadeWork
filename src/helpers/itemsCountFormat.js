export default function itemsCountFormat(value, withCount = false) {
  if (typeof(value) !== 'number') {
    return ''
  }

  const nouns = ['товар', 'товара', 'товаров']
  const cases = [2, 0, 1, 1, 1, 2]
  const num = withCount ? value + ' ' : ''

  return num + nouns[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]]
}
