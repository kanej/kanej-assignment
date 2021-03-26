const createAuthenticateMiddleware = (apiKeyService) => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.sendStatus(403)
    }

    const apiKey = req.headers.authorization

    if (!apiKeyService.allow(apiKey)) {
      return res.sendStatus(403)
    }

    next()
  }
}

module.exports = createAuthenticateMiddleware
