
const { success, fail } = global.ftt.get('utils.request')
const AlertService = global.ftt.get('service.alert')
const AlertTypeService = global.ftt.get('service.alert.type')

module.exports = {
  create: (req, res) => {
    const alert = req.body

    return AlertService
      .parse(alert)
      .then(parsedAlert => AlertService.deduplicate(parsedAlert))
      .then(() => success(res, {}, 'Ack'))
      .catch(() => success(res, {}, 'Ack'))
  },

  getAll: (req, res) => {
    const query = req.matchedData

    return AlertService
      .getAll(query)
      .then(result => success(res, result, 'Alerts got successfully'))
      .catch(err => fail(res, err.status, err))
  },

  getByType: (req, res) => {
    const { type } = req.matchedData

    return AlertService
      .getByType(type, req.query)
      .then(result => success(res, result, 'Alerts got successfully'))
      .catch(err => fail(res, err.status, err))
  },

  getByApikey: (req, res) => {
    const { apikey } = req.matchedData

    return AlertService
      .getByApikey(apikey, req.query)
      .then(result => success(res, result, 'Alerts got successfully'))
      .catch(err => fail(res, err.status, err))
  },

  getByTypeAndApikey: (req, res) => {
    const { type, apikey } = req.matchedData

    return AlertService
      .getByTypeAndApikey(type, apikey, req.query)
      .then(result => success(res, result, 'Alerts got successfully'))
      .catch(err => fail(res, err.status, err))
  },

  getTypes: (req, res) => AlertTypeService
    .getAll()
    .then(result => success(res, result, 'Alert types got successfully'))
    .catch(err => fail(res, err.status, err))
}
