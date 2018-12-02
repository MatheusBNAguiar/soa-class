module.exports = validator => ({
  existsAsString: (types, message) => validator
    .body(types)
    .exists()
    .isString()
    .withMessage(message)
})
