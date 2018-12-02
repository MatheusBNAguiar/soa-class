const { check, validationResult, body, param, query } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

module.exports = {
  check,
  validationResult,
  body,
  param,
  query,
  matchedData,
  sanitize
}
