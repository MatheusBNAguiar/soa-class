module.exports = validator => ({
  existsOptionallyInsideSet: (params, set, message) => validator
    .query(params)
    .optional()
    .not()
    .isEmpty()
    .isString()
    .custom(value => set.includes(value))
    .withMessage(message)
})
