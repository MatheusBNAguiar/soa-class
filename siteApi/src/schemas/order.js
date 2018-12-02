module.exports = driver => driver.createSchema({
  items: [{
    type: driver.ObjectId,
    ref: 'Item'
  }],
  card: {
    type: driver.ObjectId,
    ref: 'Card'
  },
  user: {
    type: driver.ObjectId,
    ref: 'User'
  }
})
