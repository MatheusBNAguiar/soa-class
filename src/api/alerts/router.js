const controller = require('./controller')

const { existsAsString } = global.ftt.get('validator.string')
const { existsAsClient } = global.ftt.get('validator.client')
const { existsOptionallyAsInteger } = global.ftt.get('validator.integer')
const { existsOptionallyInsideSet } = global.ftt.get('validator.set')

module.exports = [
  {
    method: 'get',
    endpoint: '/',
    callback: controller.getAll,
    validators: [
      existsOptionallyAsInteger(['limit'], 'must exist and be an integer'),
      existsOptionallyInsideSet(['status'], ['open', 'closed'], 'must exist as "open" or "closed"')
    ]
  },
  {
    method: 'get',
    endpoint: '/types',
    callback: controller.getTypes
  },
  {
    method: 'get',
    endpoint: '/type/:type',
    callback: controller.getByType,
    validators: [
      existsAsString(['type'], 'must exist and be a string'),
      existsOptionallyAsInteger(['limit'], 'must exist and be an integer'),
      existsOptionallyInsideSet(['status'], ['open', 'closed'], 'must exist as "open" or "closed"')
    ]
  },
  {
    method: 'get',
    endpoint: '/apikey/:apikey',
    callback: controller.getByApikey,
    validators: [
      existsAsClient(['apikey']),
      existsOptionallyAsInteger(['limit'], 'must exist and be an integer'),
      existsOptionallyInsideSet(['status'], ['open', 'closed'], 'must exist as "open" or "closed"')
    ]
  },
  {
    method: 'get',
    endpoint: '/type/:type/apikey/:apikey',
    callback: controller.getByTypeAndApikey,
    validators: [
      existsAsString(['type'], 'must exist and be a string'),
      existsAsClient(['apikey']),
      existsOptionallyAsInteger(['limit'], 'must exist and be an integer'),
      existsOptionallyInsideSet(['status'], ['open', 'closed'], 'must exist as "open" or "closed"')
    ]
  },
  {
    method: 'post',
    endpoint: '/',
    callback: controller.create,
    authenticated: false
  }
]
