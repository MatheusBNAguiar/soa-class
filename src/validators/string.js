module.exports = validator => ({
  existsAsString: (types, message) => validator
    .param(types)
    .exists()
    .isString()
    .withMessage(message)
})
