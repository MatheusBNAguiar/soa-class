const controller = require('./controller')

module.exports = [
  {
    method: 'post',
    endpoint: '/',
    callback: controller.create,
    validators: [
    ],
    extraInfo: { needAuth: false }
  }
]
