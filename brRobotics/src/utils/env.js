const path = require('path')
const nconf = require('nconf')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

nconf.argv()
  .env()
  .file('../package', '../package.json')
  .file({
    file: path.join(__dirname, '../../', `envs/${process.env.NODE_ENV}.json`)
  })

nconf.defaults({})

module.exports = nconf
