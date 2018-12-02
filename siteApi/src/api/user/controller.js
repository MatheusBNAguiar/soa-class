
const { success, fail } = global.brRobotics.get('utils.request')
const UserService = global.brRobotics.get('service.user')
const authUtils = require('../../utils/authentication')

const returnJwt = data => authUtils.encryptJWT(data)

module.exports = {
  signup: (req, res) => {
    const { name, email, password } = req.body
    return UserService.save(name, email, password)
      .then(user => {
        if (user.error) {
          fail(res, 'User already exists', 500)
        } else {
          const jwtToken = returnJwt(user)
          success(res, { jwtToken }, 'User Created')
        }
      })
      .catch(() => { fail(res, 'User already exists', 500) })
  },
  login: (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    return UserService.checkMailAndPassword(email, password)
      .then(user => {
        if (!user) {
          fail(res, 'Email or password wrong', 403)
        } else {
          const jwtToken = returnJwt(user)
          success(res, { jwtToken }, 'User Logged In')
        }
      })
      .catch(() => { fail(res, 'User already exists', 500) })
  }
}
