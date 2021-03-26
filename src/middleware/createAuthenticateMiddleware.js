const createAuthenticateMiddleware = (apiKeyService) => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.sendStatus(403)
    }

    const apiKey = req.headers.authorization

    try {
      const allow = await apiKeyService.allow(apiKey)

      if (!allow) {
        return res.sendStatus(403)
      }

      return next()
    } catch (error) {
      console.error(error)
      return res.sendStatus(403)
    }
  }
}

module.exports = createAuthenticateMiddleware
