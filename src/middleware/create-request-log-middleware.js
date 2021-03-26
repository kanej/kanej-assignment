const createRequestLogMiddleware = (requestLogService) => {
  return async (req, _res, next) => {
    try {
      const apiKey = parseInt(req.headers.authorization, 10)

      await requestLogService.log(apiKey, { url: req.url })

      return next()
    } catch (error) {
      console.error(error)
      // Logging should not interrupt request,
      // even if it fails
      return next()
    }
  }
}

module.exports = createRequestLogMiddleware
