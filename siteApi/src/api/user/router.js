const controller = require('./controller')

const { existsAsString } = global.brRobotics.get('validator.string')

module.exports = [
  {
    method: 'post',
    endpoint: '/',
    callback: controller.signup,
    validators: [
      existsAsString(['name', 'email', 'password'], 'must exist and be a string')
    ],
    extraInfo: { needAuth: false }
  },
  {
    method: 'post',
    endpoint: '/login',
    callback: controller.login,
    validators: [
      existsAsString(['email', 'password'], 'must exist and be a string')
    ],
    extraInfo: { needAuth: false }
  }
]
