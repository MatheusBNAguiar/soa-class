module.exports = {
  success: (response, result, message, status = 200) =>
    response.status(status)
      .json({ message, result }),

  fail: (response, errors, status) =>
    response.status(status)
      .json({ status, errors })
}
