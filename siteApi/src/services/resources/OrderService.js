class OrderService {
  constructor (driver, schema) {
    this.driver = driver
    this.schemaName = 'Order'
    this.schema = schema(driver)
    this.model = driver.createModel(this.schemaName, this.schema)
  }

  getAll (query = {}) {
    return this.model
      .find(query)
      .exec()
  }

  save (alertType) {
    const AlertTypeModel = this.model
    return this.getByType(alertType.type)
      .then(type => {
        if (type) {
          type.set(alertType)
          return type.save()
        }
        return new AlertTypeModel(alertType).save()
      })
      .then(type => {
        global.log('success', `Alert type "${type.type}" saved`, 'alert-type')
        return type
      })
      .catch(err => {
        global.log('error', err, 'alert-type')
        return err
      })
  }
}

module.exports = OrderService
