
const { success, fail } = global.brRobotics.get('utils.request')
const RequestService = global.brRobotics.get('service.request')
const processFilter = require('./filter')

module.exports = {
  calculateRequest: (req, res) => {
    const { items } = req.body
    const totalPrice = processFilter(items)
    return RequestService.save({ totalPrice, items })
      .then(request => {
        success(res, request, 'Total price for request obtained')
      })
      .catch(() => { fail(res, 'Failed to ', 500) })
  }
}
