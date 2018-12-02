const middlewares = require('../middlewares')
class ApiService {
  constructor (resources, app, port, router, handle, validator, request) {
    this.resources = resources
    this.app = app
    this.port = port || 3000
    this.baseEndpoint = '/api/'
    this.router = router
    this.handle = handle
    this.validator = validator
    this.request = request
    this.apiRouter = this.router()
  }

  listen () {
    this.resources.forEach(({ route, router }) =>
      this.createResource(route, require.main.require(router)))
    this.handle((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*')
      response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )
      if (!['PUT', 'POST', 'DELETE', 'GET'].includes(request.method)) {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        return response.status(200).json({})
      }
      return next()
    })
    this.handle(this.baseEndpoint, this.apiRouter)
    this.handle((req, res, next) => {
      const error = new Error('Not found')
      error.status = 404
      next(error)
    })
    this.handle((error, req, res, next) => {
      res.status(error.status || 500)
      res.json({ error: { message: error.message } })
      next()
    })
    this.app.listen(this.port)
    global.log('info', `Listening at port ${this.port}`, 'api')
  }

  sanitizeData () {
    return (req, res, next) => {
      const errors = this.validator.validationResult(req)
      if (!errors.isEmpty()) {
        return this.request.fail(res, 422, errors.mapped())
      }
      req.matchedData = this.validator.matchedData(req)
      return next()
    }
  }

  addInfo (extraInfo) {
    return (req, res, next) => {
      req.routeExtraInfo = extraInfo
      return next()
    }
  }

  createResource (route, resources = []) {
    const router = this.router()
    resources.forEach(({
      method,
      endpoint,
      callback,
      validators = [],
      extraInfo = {}
    }) => {
      if (!endpoint || endpoint === '') {
        throw TypeError('Endpoint not found')
      }
      const methodName = typeof method === 'string' && method.toLowerCase()
      if (typeof router[methodName] === 'function' && ['get', 'post', 'put', 'patch', 'delete'].includes(methodName)) {
        router[methodName](
          endpoint,
          this.sanitizeData(),
          this.addInfo(extraInfo),
          validators,
          middlewares,
          callback
        )
        global.log('info', `Registered ${method.toUpperCase()} "${route}${endpoint}"`, 'api')
      } else {
        throw TypeError('Only GET, POST, PUT or DELETE methods are allowed')
      }
    })

    this.apiRouter.use(route, router)
  }
}

module.exports = ApiService
