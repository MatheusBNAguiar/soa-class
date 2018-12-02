module.exports = validator => ({
  existsOptionallyAsInteger: (integerParams, message) => validator
    .query(integerParams)
    .optional()
    .not()
    .isEmpty()
    .toInt()
    .withMessage(message)
})
