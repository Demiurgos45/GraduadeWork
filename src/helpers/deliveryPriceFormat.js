import numberFormat from '@/helpers/numberFormat'

export default function deliveryPriceFormat(price) {
  if (price === 0) {
    price = 'Бесплатно'
  }
  else {
    price = numberFormat(price) + ' ₽'
  }

  return price
}