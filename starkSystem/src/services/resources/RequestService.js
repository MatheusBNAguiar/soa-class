class RequestService {
  constructor (driver, schema) {
    this.driver = driver
    this.schemaName = 'BrRoboticsRequest'
    this.schema = schema(driver)
    this.model = driver.createModel(this.schemaName, this.schema)
  }

  save (items, totalPrice) {
    const RequestModel = this.model
    const requestData = { items, totalPrice }
    return new RequestModel(requestData).save()
      .then(re => {
        global.log('success', `Request saved`, 'request-br-robotics')
        return user
      })
      .catch(err => {
        global.log('error', err, 'user')
        return { error: err }
      })
  }
}
module.exports = UserService
