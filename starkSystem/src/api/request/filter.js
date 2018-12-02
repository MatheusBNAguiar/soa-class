module.exports = (items) => {
  const baseDiscount = 6

  const filterRobotics = {
    'Reator Solar': {
      qtyFilter: 3,
      discount: 15
    },
    'Reator Ark': {
      qtyFilter: 3,
      discount: 9
    }
  }

  const discountsApplied = items.reduce((accumulator, { description, price, qty }) => {
    const selectedDiscount = filterRobotics[description]
    if (selectedDiscount) {
      const { discount, qtyFilter } = selectedDiscount
      const finalValue = (qty >= qtyFilter) ? qty * price * (100 - discount) / 100 : price
      accumulator.push(finalValue)
    }
    return accumulator
  }, [])

  const summedValues = discountsApplied.reduce((a, b) => (a + b), 0) * ((100 - baseDiscount) / 100)

  return summedValues
}
