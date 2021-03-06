// Container Manager
const arthemis = require('arthemis')

// Utils
const env = require('./src/utils/env')
global.env = env
const request = require('./src/utils/request')
// Drivers
const { app, router, handle } = require('./external/express/app')
const validator = require('./external/express/validator')
const Mongoose = require('./external/mongoose/Mongoose')

// Services
const ApiService = require('./src/services/ApiService')
const RequestService = require('./src/services/resources/RequestService')

// Schemas
const requestSchema = require('./src/schemas/request')

// Validators
const dateValidator = require('./src/validators/date')
const stringValidator = require('./src/validators/string')
const integerValidator = require('./src/validators/integer')
const setValidator = require('./src/validators/set')

const brRobotics = arthemis()

// App
brRobotics.literal('app.app', app)
brRobotics.literal('app.router', router)
brRobotics.literal('app.jwtSecret', env.get('jwtSecret'))
brRobotics.literal('app.handle', handle)
brRobotics.literal('app.port', env.get('service').port)
brRobotics.literal('app.resources', env.get('service').resources)
brRobotics.literal('app.validator', validator)

// Database
brRobotics.literal('database.name', env.get('database').name)
brRobotics.literal('database.uri', env.get('database').uri)

// Validators
brRobotics.factory('validator.date', dateValidator, 'app.validator')
brRobotics.factory('validator.string', stringValidator, 'app.validator')
brRobotics.factory('validator.integer', integerValidator, 'app.validator')
brRobotics.factory('validator.set', setValidator, 'app.validator')

// Schemas
brRobotics.literal('schema.request', requestSchema)

// Drivers
brRobotics.singleton('driver.activeRecord', Mongoose, 'database.uri', 'database.name')

// Services
brRobotics.singleton('service.api', ApiService, 'app.resources', 'app.app', 'app.port', 'app.router', 'app.handle', 'app.validator', 'utils.request')
brRobotics.singleton('service.request', RequestService, 'driver.activeRecord', 'schema.request')

// Utils
brRobotics.literal('utils.request', request)

module.exports = brRobotics
