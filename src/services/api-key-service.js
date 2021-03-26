const { JWT } = require('jose')
const { SECRET } = require('../constants')

class ApiKeyService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async allow(apiKeyToken) {
    console.log(apiKeyToken)
    try {
      const { apiKeyId } = JWT.verify(apiKeyToken, SECRET)

      const result = await this.knexClient
        .select('id')
        .from('api_keys')
        .where('enabled', '=', true)
        .where('id', '=', apiKeyId)

      return result.length === 1
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

module.exports = ApiKeyService
