module.exports = driver => driver.createSchema({
  card: {
    type: Object
  },
  cart: {
    type: Object
  },
  address: {
    type: Object
  },
  client: {
    type: Object
  },
  createdDate: {
    type: Date
  },
  priceStarkSystem: {
    type: Number
  },
  priceBrRobotics: {
    type: Number
  },
  sum: {
    type: String
  },
  authCode: {
    type: String
  },
  paymentValue: {
    type: String
  }
})
