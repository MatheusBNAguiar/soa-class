
const { success, fail } = global.brRobotics.get('utils.request')
const OrderService = global.brRobotics.get('service.order')

module.exports = {
  create: (req, res) => {
    const order = req.body
    console.log('oi')
    return OrderService.save(order)
      .then(order => {
        success(res, order, 'Order Created')
      })
      .catch(() => { fail(res, 'Order creation failed', 500) })
  }
}
