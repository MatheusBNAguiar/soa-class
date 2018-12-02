
const { success, fail } = global.brRobotics.get('utils.request')
// const UserService = global.brRobotics.get('service.user')
const processFilter = require('./filter')

module.exports = {
  calculateRequest: (req, res) => {
    const { items } = req.body
    const totalPrice = processFilter(items)
    success(res, { totalPrice, items }, 'Total price for request obtained')
    // return UserService.save(name, email, password)
    //   .then(user => {
    //     if (user.error) {
    //       fail(res, 'User already exists', 500)
    //     } else {
    //       const jwtToken = returnJwt(user)
    //       success(res, { jwtToken }, 'User Created')
    //     }
    //   })
    //   .catch(() => { fail(res, 'Failed to ', 500) })
  }
}
