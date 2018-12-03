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

  save (order) {
    const OrderModel = this.model
    return new OrderModel(order).save()
      .then(order => {
        global.log('success', `Order  saved`, 'order')
        return order
      })
      .catch(err => {
        global.log('error', err, 'order')
        return { error: err }
      })
  }
}

module.exports = OrderService
