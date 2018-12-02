
const { success, fail } = global.brRobotics.get('utils.request')
const AlertService = global.brRobotics.get('service.alert')
const AlertTypeService = global.brRobotics.get('service.alert.type')

module.exports = {
  create: (req, res) => {
    const alert = req.body

    return AlertService
  },
}
