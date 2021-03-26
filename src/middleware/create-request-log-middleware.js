const { JWT } = require('jose')
const { SECRET } = require('../constants')

const createRequestLogMiddleware = (requestLogService) => {
  return async (req, _res, next) => {
    try {
      const apiKeyToken = req.headers.authorization.replace('bearer ', '')

      const { apiKeyId } = JWT.verify(apiKeyToken, SECRET)

      await requestLogService.log(apiKeyId, { url: req.url })

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
