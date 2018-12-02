const jwt = require('jsonwebtoken')

const secret = global.env.get('jwtSecret')
const verifyToken = token => {
  if (!token) {
    throw {
      status: 403,
      message: 'No token provided.'
    }
  }
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw {
        status: 500,
        message: `Failed to authenticate token. Because ${err}`
      }
    }
    return decoded.data
  })
}

module.exports = {

  encryptJWT: (data, expiresIn = '24h') => jwt.sign({ data }, 'secret', { expiresIn }),

  mountBaseData (token, req, isCompanyNecessary = false) {
    const verifiedToken = verifyToken(token)
    return {
      name: verifiedToken.name,
      email: verifiedToken.email,
      id: verifiedToken._id
    }
  }
}
