const controller = require('./controller')

module.exports = [
  {
    method: 'post',
    endpoint: '/',
    callback: controller.calculateRequest,
    extraInfo: { needAuth: false }
  }
]
