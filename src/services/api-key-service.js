class ApiKeyService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async allow(apiKey) {
    const keyId = parseInt(apiKey, 10)

    if (isNaN(keyId)) {
      return false
    }

    const result = await this.knexClient
      .select('id')
      .from('api_keys')
      .where('enabled', '=', true)
      .where('id', '=', keyId)

    return result.length === 1
  }
}

module.exports = ApiKeyService
