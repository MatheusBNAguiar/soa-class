module.exports = driver => driver.createSchema({
  order: {
    type: driver.ObjectId,
    ref: 'Order'
  },
  price: {
    required: true,
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
