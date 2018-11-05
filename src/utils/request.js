module.exports = {
  success: (response, result, message, status = 200) =>
    response.status(status)
      .json({ message, result }),

  fail: (response, status, errors) =>
    response.status(status)
      .json({ status, errors })
}
