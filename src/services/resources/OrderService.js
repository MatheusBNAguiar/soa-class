class OrderService {
    constructor (driver, schema) {
      this.driver = driver
      this.schemaName = 'order'
      this.schema = schema(driver)
      this.model = driver.createModel(this.schemaName, this.schema)
    }

    getAll (query = {}) {
      return this.model
        .find(query)
        .exec()
    }
  }
  
  module.exports = OrderService
  