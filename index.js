
const log = require('./src/utils/log')
const brRobotics = require('./setup')

global.log = log
global.brRobotics = brRobotics

process.on('SIGINT', () => {
  global.log('info', 'Shutting down Br Robotics Project after Ctrl+C', 'process')
  process.exit(1)
})

process.on('unhandledRejection', error => {
  global.log('error', '== Node detected an unhandled rejection! ==', 'process')
  global.log('error', error.stack, 'process')
})

brRobotics.get('service.api').listen()

module.exports = brRobotics
