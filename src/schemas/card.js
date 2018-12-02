module.exports = driver => driver.createSchema({
  number: {
    type: Number,
    required: true
  },
  cvv: {
    type: Number,
    required: true
  },
  cardName: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  }
})
