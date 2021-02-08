export default function numberFormat(val) {
  if (typeof(val) !== 'number') {
    return 0
  }
  return new Intl.NumberFormat().format(val)
}
