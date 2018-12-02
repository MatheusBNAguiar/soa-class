module.exports = validator => ({
  isDate: (dates, message) => validator
    .query(dates)
    .isISO8601()
    .withMessage(message),

  isLowerThen: (lowerDate, greaterDate) => validator
    .query([lowerDate])
    .custom((value, { req }) => {
      if (!(new Date(value) <= new Date(req.query[greaterDate]))) {
        return Promise.reject(new Error(`${lowerDate} must be lower then ${greaterDate}`))
      }
      return Promise.resolve(value)
    })
})
