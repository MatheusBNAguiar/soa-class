class RequestService {
  constructor (driver, schema) {
    this.driver = driver
    this.schemaName = 'StarkSystemRequest'
    this.schema = schema(driver)
    this.model = driver.createModel(this.schemaName, this.schema)
  }

  save (items, totalPrice) {
    const RequestModel = this.model
    const requestData = { items, totalPrice }
    return new RequestModel(requestData).save()
      .then(request => {
        global.log('success', `Request saved`, 'request-stark-system')
        return request
      })
      .catch(err => {
        global.log('error', err, 'request-stark-system')
        return { error: err }
      })
  }
}
module.exports = RequestService
