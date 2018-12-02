const mongoose = require('mongoose')

class Mongoose {
  constructor (uri, dbName) {
    this.mongoose = mongoose
    mongoose.connect(uri + dbName, { useNewUrlParser: true })
    mongoose.Promise = global.Promise
  }

  createSchema (schema, timestamp = true, options = {}) {
    const { Schema } = this.mongoose
    const schemaOptions = {
      timestamps: timestamp,
      ...options
    }
    return new Schema(schema, schemaOptions)
  }

  createModel (modelName, modelSchema) {
    return this.mongoose.model(modelName, modelSchema)
  }

  get ObjectId () {
    return new this.mongoose.Types.ObjectId()
  }

  get Types () {
    return this.mongoose.Schema.Types
  }
}

module.exports = Mongoose
