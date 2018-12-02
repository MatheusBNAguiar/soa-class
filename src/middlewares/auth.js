const authenticateUtils = require('../utils/authentication')
const { fail } = require('../utils/request')

module.exports = (req, res, next) => {
  console.log(req.routeExtraInfo)
  let { needAuth } = req.routeExtraInfo
  if (typeof needAuth === 'undefined') {
    needAuth = true
  }
  if (needAuth) {
    const token = req.headers.authorization
    try {
      const userData = authenticateUtils.mountBaseData(token, req)
      req.userData = userData
      return next()
    } catch ({ status, message }) {
      fail(res, status, message)
    }
  } else {
    return next()
  }
}
