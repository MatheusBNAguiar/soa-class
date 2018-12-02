const { hashSync } = require('bcryptjs')

class UserService {
  constructor (driver, schema) {
    this.driver = driver
    this.schemaName = 'User'
    this.schema = schema(driver)
    this.model = driver.createModel(this.schemaName, this.schema)
  }

  checkMailAndPassword (email, password) {
    const userData = { email }
    console.log(userData)
    return this.model
      .find(userData).exec()
      .then(user => {
        if (!user) {
          console.log(user)
          global.log('warning', 'Could not find user type', 'user')
        } else {
          global.log('success', `User type "${user.email}" got`, 'user-type')
        }
        return user
      }).catch(err => {
        global.log('error', err, 'user-type')
        return err
      })
  }

  save (name, email, password) {
    const UserModel = this.model
    const userData = { name, email, password: hashSync(password, 8) }
    return new UserModel(userData).save()
      .then(user => {
        global.log('success', `User "${user.email}" saved`, 'user')
        return user
      })
      .catch(err => {
        global.log('error', err, 'user')
        return { error: err }
      })
  }
}
module.exports = UserService
