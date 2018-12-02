module.exports = (items) => {
  const baseDiscount = 4

  const filterRobotics = {
    'Robô Doméstico': {
      qtyFilter: 3,
      discount: 7
    },
    'Robô de Segurança': {
      qtyFilter: 4,
      discount: 14
    },
    'Robô de Serviço': {
      qtyFilter: 5,
      discount: 24
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
