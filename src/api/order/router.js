const controller = require('./controller')

const { existsAsString } = global.brRobotics.get('validator.string')
const { existsOptionallyAsInteger } = global.brRobotics.get('validator.integer')
const { existsOptionallyInsideSet } = global.brRobotics.get('validator.set')

module.exports = [
  {
    method: 'post',
    endpoint: '/',
    callback: controller.setOrder
  },
  {
    method: 'delete',
    endpoint: '/:id',
    callback: controller.delOrder
  }
]
